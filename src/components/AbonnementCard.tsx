import { type Abonnement } from "@/lib/parseAbonnements";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  abonnement: Abonnement;
}

const AbonnementCard = ({ abonnement }: Props) => {
  const imageSrc = abonnement.image
    ? `/images/${abonnement.image}`
    : undefined;

  return (
    <Card className="overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow">
      <div className="aspect-square bg-muted flex items-center justify-center overflow-hidden">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={abonnement.nom}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="text-muted-foreground text-sm">Image à venir</div>
        )}
      </div>
      <CardContent className="p-4 flex flex-col flex-1 gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {abonnement.collection}
        </span>
        <h3 className="font-bold text-base leading-tight text-card-foreground">
          {abonnement.nom}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-3 flex-1">
          {abonnement.description.replace(/[*#\[\]()]/g, "").slice(0, 150)}
          {abonnement.description.length > 150 ? "…" : ""}
        </p>
        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="text-lg font-extrabold text-primary">
            {abonnement.prix}
          </span>
          <Button asChild size="sm">
            <a href={abonnement.cta}>Commander</a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AbonnementCard;
