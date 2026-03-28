import { type Abonnement } from "@/lib/parseAbonnements";
import { Button } from "@/components/ui/button";

interface Props {
  abonnement: Abonnement;
}

const AbonnementListItem = ({ abonnement }: Props) => {
  const imageSrc = abonnement.image
    ? `/images/${abonnement.image}`
    : undefined;

  return (
    <div className="flex items-start gap-4 rounded-lg border bg-card p-3 hover:shadow-md transition-shadow">
      <div className="w-20 h-20 flex-shrink-0 rounded-md bg-muted overflow-hidden flex items-center justify-center">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={abonnement.nom}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <span className="text-xs text-muted-foreground">—</span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {abonnement.collection}
        </span>
        <h3 className="font-bold text-sm leading-tight text-card-foreground">
          {abonnement.nom}
        </h3>
        <p className="text-xs text-muted-foreground mt-1 whitespace-pre-line">
          {abonnement.description}
        </p>
      </div>
      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        <span className="text-base font-extrabold text-primary whitespace-nowrap">
          {abonnement.prix}
        </span>
        <Button asChild size="sm">
          <a href={abonnement.cta}>{abonnement.ctaLabel}</a>
        </Button>
      </div>
    </div>
  );
};

export default AbonnementListItem;
