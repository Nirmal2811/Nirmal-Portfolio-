"""
Turns a zip (or folder) of video frames into web-sized WebP image sequences
for the scroll-driven videos on the home page.

    python scripts/make-sequence.py <name> <preset> path/to/frames.zip

  name    folder/key the site loads it by: "showreel" (the 3D card) or "backdrop" (page background)
  preset  "card"        portrait video shown in a card
          "background"  landscape video filling the screen (phones get a centre-cropped portrait version)

Writes public/sequence/<name>/{desktop,mobile}/001.webp ... and updates src/data/sequences.json.
Needs Pillow:  pip install pillow
"""

import io
import json
import sys
import zipfile
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
MANIFEST = ROOT / "src" / "data" / "sequences.json"
IMAGE_EXTS = {".jpg", ".jpeg", ".png", ".webp"}

# Per variant: keep every `step`-th frame, output `width` px wide, WebP `quality`,
# and optionally centre-crop to an aspect ratio (w, h) first.
PRESETS = {
    "card": {
        "desktop": {"step": 2, "width": 720, "quality": 65},
        "mobile": {"step": 3, "width": 540, "quality": 62},
    },
    "background": {
        "desktop": {"step": 2, "width": 960, "quality": 55},
        "mobile": {"step": 2, "width": 400, "quality": 50, "crop": (9, 16)},
    },
}


def load_frames(source: Path):
    """Returns [(name, bytes)] for each frame, sorted by file name."""
    if source.suffix.lower() == ".zip":
        with zipfile.ZipFile(source) as zf:
            names = sorted(n for n in zf.namelist() if Path(n).suffix.lower() in IMAGE_EXTS)
            return [(n, zf.read(n)) for n in names]
    return [(p.name, p.read_bytes()) for p in sorted(source.iterdir()) if p.suffix.lower() in IMAGE_EXTS]


def centre_crop(image: Image.Image, aspect):
    w, h = image.size
    target = aspect[0] / aspect[1]
    if w / h > target:  # too wide: trim the sides
        new_w = round(h * target)
        x = (w - new_w) // 2
        return image.crop((x, 0, x + new_w, h))
    new_h = round(w / target)  # too tall: trim top and bottom
    y = (h - new_h) // 2
    return image.crop((0, y, w, y + new_h))


def main():
    if len(sys.argv) != 4 or sys.argv[2] not in PRESETS:
        sys.exit(__doc__)
    name, preset, source = sys.argv[1], sys.argv[2], Path(sys.argv[3])
    frames = load_frames(source)
    if not frames:
        sys.exit(f"No image frames found in {source}")

    entry = {"source": source.name, "preset": preset}
    for variant, opts in PRESETS[preset].items():
        out_dir = ROOT / "public" / "sequence" / name / variant
        out_dir.mkdir(parents=True, exist_ok=True)
        for old in out_dir.glob("*.webp"):
            old.unlink()

        picked = frames[:: opts["step"]]
        total = 0
        size = None
        for i, (_, data) in enumerate(picked, start=1):
            image = Image.open(io.BytesIO(data)).convert("RGB")
            if "crop" in opts:
                image = centre_crop(image, opts["crop"])
            height = round(opts["width"] * image.height / image.width)
            image = image.resize((opts["width"], height), Image.LANCZOS)
            size = image.size
            target = out_dir / f"{i:03d}.webp"
            image.save(target, "WEBP", quality=opts["quality"], method=6)
            total += target.stat().st_size

        entry[variant] = {"count": len(picked), "width": size[0], "height": size[1]}
        print(f"{name}/{variant}: {len(picked)} frames at {size[0]}x{size[1]}, {total / 1024 / 1024:.1f} MB")

    manifest = json.loads(MANIFEST.read_text()) if MANIFEST.exists() else {}
    manifest[name] = entry
    MANIFEST.write_text(json.dumps(manifest, indent=2) + "\n")
    print(f"updated {MANIFEST.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
