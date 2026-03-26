import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  BODYLINK_PUBLIC_KEY,
  BODYLINK_WIDGET_KEY,
  BODYLINK_SCRIPT_URL,
} from "@/config/widget";
import Header from "@/components/Header";

const Inscription = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    // Check if script already loaded
    if (document.querySelector(`script[src="${BODYLINK_SCRIPT_URL}"]`)) return;

    const script = document.createElement("script");
    script.src = BODYLINK_SCRIPT_URL;
    script.setAttribute("data-public-key", BODYLINK_PUBLIC_KEY);
    script.setAttribute("data-widget-key", BODYLINK_WIDGET_KEY);
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup on unmount if needed
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight mb-6 text-foreground">
          Inscription
        </h1>
        {token && (
          <p className="text-sm text-muted-foreground mb-4">
            Référence : <span className="font-mono font-semibold">{token}</span>
          </p>
        )}
        <div
          id="bodylink-widget"
          className="bodylink-widget min-h-[400px] rounded-lg border bg-card p-4"
        />
      </main>
    </div>
  );
};

export default Inscription;
