import {
  ChartNoAxesCombined,
  CodeXml,
  Component,
  Dumbbell,
  Layers,
  Palette,
  Rocket,
  Server,
  ShoppingBag,
  SquareKanban,
  SquareTerminal,
  Wrench,
} from 'lucide-react'

// Icons referenced by name from src/data/portfolio.js.
// Register any new icon here after using it in the data file.
export const iconMap = {
  ChartNoAxesCombined,
  CodeXml,
  Component,
  Dumbbell,
  Layers,
  Palette,
  Rocket,
  Server,
  ShoppingBag,
  SquareKanban,
  SquareTerminal,
  Wrench,
}

export function getIcon(name) {
  return iconMap[name] ?? CodeXml
}
