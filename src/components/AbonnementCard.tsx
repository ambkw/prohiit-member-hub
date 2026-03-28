import { useState } from "react";
import { type Abonnement } from "@/lib/parseAbonnements";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface Props {
  abonnement: Abonnement;
}

const AbonnementCard = ({ abonnement }: Props) => {
  const [open, setOpen] = useState(false);
  const imageSrc = abonnement.image
    ? `/images/${abonnement.image}`
    : undefined;

  return (
    <>
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
          <p className="text-sm text-muted-foreground line-clamp-3 flex-1 whitespace-pre-line">
            {abonnement.description}
          </p>
          <button
            onClick={() => setOpen(true)}
            className="text-xs text-primary font-semibold hover:underline self-start"
          >
            Voir le détail
          </button>
          <div className="flex items-center justify-between mt-auto pt-2">
            <span className="text-lg font-extrabold text-primary">
              {abonnement.prix}
            </span>
            <Button asChild size="sm">
              <a href={abonnement.cta}>{abonnement.ctaLabel}</a>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">{abonnement.nom}</DialogTitle>
            <DialogDescription className="text-xs uppercase tracking-wide">
              {abonnement.collection}
            </DialogDescription>
          </DialogHeader>
          {imageSrc && (
            <img
              src={imageSrc}
              alt={abonnement.nom}
              className="w-full rounded-md object-cover max-h-60"
            />
          )}
          <div className="text-sm text-foreground whitespace-pre-line leading-relaxed">
            {abonnement.description}
          </div>
          <div className="flex items-center justify-between pt-4 border-t">
            <span className="text-xl font-extrabold text-primary">
              {abonnement.prix}
            </span>
            <Button asChild>
              <a href={abonnement.cta}>{abonnement.ctaLabel}</a>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AbonnementCard;
