export interface Abonnement {
  nom: string;
  collection: string;
  prix: string;
  image: string;
  cta: string;
  description: string;
}

export function parseAbonnements(markdown: string): Abonnement[] {
  const sections = markdown.split(/^## /m).slice(1);

  return sections.map((section) => {
    const lines = section.trim().split("\n");
    const nom = lines[0].trim();

    const getMeta = (key: string): string => {
      const line = lines.find((l) => l.startsWith(`- ${key}:`));
      return line ? line.replace(`- ${key}:`, "").trim() : "";
    };

    const metaKeys = ["collection", "prix", "image", "cta"];
    const firstNonMetaIndex = lines.findIndex(
      (l, i) => i > 0 && l.trim() !== "" && !metaKeys.some((k) => l.startsWith(`- ${k}:`))
    );

    const descriptionLines = firstNonMetaIndex > 0 ? lines.slice(firstNonMetaIndex) : [];
    const description = descriptionLines.join("\n").trim();

    return {
      nom,
      collection: getMeta("collection"),
      prix: getMeta("prix"),
      image: getMeta("image"),
      cta: getMeta("cta"),
      description,
    };
  });
}
