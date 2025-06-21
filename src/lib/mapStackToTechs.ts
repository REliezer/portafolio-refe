import type { Props as TechProps } from "@/components/skill/TechTable.astro";
import { techIcons } from "@/data/icons";

type Stack = {
  frontend: string[];
  backend?: string[];
  baseDatos?: string[];
  almacenamiento?: string[];
  otros?: string[];
};

export function mapStackToTechs(stack: Stack): TechProps["techs"] {
  const groupMap: Record<keyof Stack, string> = {
    frontend: "Frontend",
    backend: "Backend",
    baseDatos: "Base de datos",
    almacenamiento: "Almacenamiento",
    otros: "Otros",
  };

  const entries = Object.entries(stack) as [keyof Stack, string[]][];

  return entries.flatMap(([key, list]) =>
    list.map((tech) => ({
      label: tech,
      img: techIcons[tech] ?? "/icons/default.svg",
      group: groupMap[key],
    }))
  );
}
