import { useState } from "react";
import { type Abonnement } from "@/lib/parseAbonnements";
import { Button } from "@/components/ui/button";

interface Props {
  abonnement: Abonnement;
}

const AbonnementListItem = ({ abonnement }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const imageSrc = abonnement.image
    ? `/images/${abonnement.image}`
    : undefined;

  return (
    <div className="rounded-lg border bg-card p-3 hover:shadow-md transition-shadow" itemProp="item" itemScope itemType="https://schema.org/Product">
      {/* Mobile: stacked — Desktop: side by side */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        {/* Image + prix/bouton row on mobile */}
        <div className="flex items-start gap-4">
          <div className="w-20 h-20 flex-shrink-0 rounded-md bg-muted overflow-hidden flex items-center justify-center">
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={abonnement.nom}
                className="w-full h-full object-cover"
                loading="lazy"
                itemProp="image"
              />
            ) : (
              <span className="text-xs text-muted-foreground">—</span>
            )}
          </div>
          {/* On mobile: prix + bouton next to image */}
          <div className="flex sm:hidden flex-col items-end gap-2 ml-auto" itemProp="offers" itemScope itemType="https://schema.org/Offer">
            <meta itemProp="priceCurrency" content="EUR" />
            <meta itemProp="price" content={abonnement.prix.replace(/[^0-9.,]/g, "").replace(",", ".")} />
            <meta itemProp="availability" content="https://schema.org/InStock" />
            <span className="text-base font-extrabold text-primary whitespace-nowrap">
              {abonnement.prix}
            </span>
            <Button asChild size="sm">
              <a href={abonnement.cta} itemProp="url">{abonnement.ctaLabel}</a>
            </Button>
          </div>
        </div>

        {/* Text content */}
        <div className="flex-1 min-w-0">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <span itemProp="category">{abonnement.collection}</span>
          </h2>
          <h3 className="font-bold text-sm leading-tight text-card-foreground" itemProp="name">
            {abonnement.nom}
          </h3>
          <p
            className={`text-xs text-muted-foreground mt-1 whitespace-pre-line ${
              !expanded ? "line-clamp-2 sm:line-clamp-none" : ""
            }`}
            itemProp="description"
          >
            {abonnement.description}
          </p>
          {!expanded && (
            <button
              onClick={() => setExpanded(true)}
              className="sm:hidden text-xs text-primary font-semibold hover:underline mt-1"
            >
              Voir plus
            </button>
          )}
        </div>

        {/* Desktop: prix + bouton */}
        <div className="hidden sm:flex flex-col items-end gap-2 flex-shrink-0">
          <span className="text-base font-extrabold text-primary whitespace-nowrap">
            {abonnement.prix}
          </span>
          <Button asChild size="sm">
            <a href={abonnement.cta}>{abonnement.ctaLabel}</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AbonnementListItem;
