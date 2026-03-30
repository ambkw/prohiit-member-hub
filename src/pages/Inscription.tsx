import { useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  BODYLINK_PUBLIC_KEY,
  BODYLINK_WIDGET_KEY,
  BODYLINK_SCRIPT_URL,
} from "@/config/widget";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";

const Inscription = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) return;
    if (document.querySelector(`script[src="${BODYLINK_SCRIPT_URL}"]`)) return;

    const script = document.createElement("script");
    script.src = BODYLINK_SCRIPT_URL;
    script.setAttribute("data-public-key", BODYLINK_PUBLIC_KEY);
    script.setAttribute("data-widget-key", BODYLINK_WIDGET_KEY);
    script.async = true;
    document.head.appendChild(script);

    return () => {};
  }, [token]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight mb-6 text-foreground">
          Inscription
        </h1>
        {token ? (
          <div
            id="bodylink-widget"
            className="bodylink-widget min-h-[400px] rounded-lg border bg-card p-4"
          />
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center gap-6">
            <p className="text-lg text-muted-foreground max-w-md">
              Pour vous inscrire, commencez par choisir la formule qui vous convient parmi nos abonnements.
            </p>
            <Button asChild size="lg">
              <Link to="/">Découvrir nos abonnements</Link>
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Inscription;
