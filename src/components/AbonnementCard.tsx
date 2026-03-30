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
      <Card className="overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow" itemProp="item" itemScope itemType="https://schema.org/Product">
        <div className="aspect-square bg-muted flex items-center justify-center overflow-hidden">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={abonnement.nom}
              className="w-full h-full object-cover"
              loading="lazy"
              itemProp="image"
            />
          ) : (
            <div className="text-muted-foreground text-sm">Image à venir</div>
          )}
        </div>
        <CardContent className="p-4 flex flex-col flex-1 gap-2">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <span itemProp="category">{abonnement.collection}</span>
          </h2>
          <h3 className="font-bold text-base leading-tight text-card-foreground" itemProp="name">
            {abonnement.nom}
          </h3>
          <p className="text-sm text-muted-foreground sm:line-clamp-3 flex-1 whitespace-pre-line" itemProp="description">
            {abonnement.description}
          </p>
          <button
            onClick={() => setOpen(true)}
            className="hidden sm:inline text-xs text-primary font-semibold hover:underline self-start"
          >
            Voir le détail
          </button>
          <div className="flex items-center justify-between mt-auto pt-2" itemProp="offers" itemScope itemType="https://schema.org/Offer">
            <meta itemProp="priceCurrency" content="EUR" />
            <meta itemProp="price" content={abonnement.prix.replace(/[^0-9.,]/g, "").replace(",", ".")} />
            <meta itemProp="availability" content="https://schema.org/InStock" />
            <span className="text-lg font-extrabold text-primary">
              {abonnement.prix}
            </span>
            <Button asChild size="sm">
              <a href={abonnement.cta} itemProp="url">{abonnement.ctaLabel}</a>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
            {imageSrc && (
              <img
                src={imageSrc}
                alt={abonnement.nom}
                className="w-full sm:w-48 sm:min-w-[12rem] rounded-lg object-contain"
              />
            )}
            <div className="flex flex-col gap-2 flex-1">
              <DialogHeader>
                <DialogTitle className="text-lg font-bold">{abonnement.nom}</DialogTitle>
                <DialogDescription className="text-xs uppercase tracking-wide">
                  {abonnement.collection}
                </DialogDescription>
              </DialogHeader>
              <div className="text-sm text-foreground whitespace-pre-line leading-relaxed">
                {abonnement.description}
              </div>
              <div className="flex items-center justify-between pt-4 border-t mt-auto">
                <span className="text-xl font-extrabold text-primary">
                  {abonnement.prix}
                </span>
                <Button asChild>
                  <a href={abonnement.cta}>{abonnement.ctaLabel}</a>
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AbonnementCard;
