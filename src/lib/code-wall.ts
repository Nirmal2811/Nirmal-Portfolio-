/** Source snippets that scroll behind the hero. Purely decorative — edit freely. */

const fetchHook = `// hooks/useFetch.js
export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}`;

const card = `export function ServiceCard({ title, icon, children }) {
  return (
    <article className="rounded-2xl border p-6 shadow-sm
      transition hover:-translate-y-1 md:p-8">
      <img src={icon} alt="" className="size-10" />
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-slate-600">{children}</p>
    </article>
  );
}`;

const flask = `# routes/tickets.py
@app.route("/api/tickets", methods=["GET"])
def list_tickets():
    status = request.args.get("status", "open")
    rows = db.execute(
        "SELECT * FROM tickets WHERE status = %s", (status,)
    )
    return jsonify([dict(r) for r in rows])`;

const sql = `-- open tickets breaching SLA
SELECT t.id, c.name, t.priority
FROM   tickets t
JOIN   customers c ON c.id = t.customer_id
WHERE  t.status = 'open'
AND    t.created_at < now() - interval '48 hours'
ORDER  BY t.priority DESC;`;

const acf = `<?php if ( have_rows('services') ) : ?>
  <?php while ( have_rows('services') ) : the_row(); ?>
    <h3><?php the_sub_field('title'); ?></h3>
    <p><?php the_sub_field('summary'); ?></p>
  <?php endwhile; ?>
<?php endif; ?>`;

const shell = `$ git checkout -b feat/attendance-report
$ npm run build
  ✓ built in 2.41s
$ git commit -m "feat: export attendance as CSV"
$ git push origin feat/attendance-report`;

const vite = `// vite.config.js
export default defineConfig({
  plugins: [react()],
  server: { proxy: { "/api": "http://localhost:5000" } },
  build: { sourcemap: true },
});`;

const motionSection = `<motion.section
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  className="grid gap-6 md:grid-cols-3"
>
  {treatments.map((t) => <ServiceCard key={t.id} {...t} />)}
</motion.section>`;

export const codeWallColumns: string[] = [
  [fetchHook, sql, shell].join("\n\n"),
  [flask, card, vite].join("\n\n"),
  [acf, motionSection, fetchHook].join("\n\n"),
];
