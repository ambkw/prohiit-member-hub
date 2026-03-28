import { useState, useMemo } from "react";
import { parseAbonnements } from "@/lib/parseAbonnements";
import abonnementsRaw from "@/data/abonnements.md?raw";
import { useIsMobile } from "@/hooks/use-mobile";
import Header from "@/components/Header";
import SearchAndFilters from "@/components/SearchAndFilters";
import AbonnementCard from "@/components/AbonnementCard";
import AbonnementListItem from "@/components/AbonnementListItem";

const abonnements = parseAbonnements(abonnementsRaw);

const Index = () => {
  const isMobile = useIsMobile();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Tous");
  const [viewMode, setViewMode] = useState<"grid" | "list">(
    isMobile ? "list" : "grid"
  );

  const filtered = useMemo(() => {
    return abonnements.filter((a) => {
      const matchFilter = filter === "Tous" || a.collection === filter;
      const matchSearch =
        !search ||
        a.nom.toLowerCase().includes(search.toLowerCase()) ||
        a.description.toLowerCase().includes(search.toLowerCase());
      return matchFilter && matchSearch;
    });
  }, [search, filter]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight mb-6 text-foreground">
          Nos Abonnements
        </h1>
        <SearchAndFilters
          search={search}
          onSearchChange={setSearch}
          activeFilter={filter}
          onFilterChange={setFilter}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />
        <div className="mt-6">
          {filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">
              Aucun abonnement trouvé.
            </p>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((a, index) => (
                <AbonnementCard key={index} abonnement={a} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {filtered.map((a, index) => (
                <AbonnementListItem key={index} abonnement={a} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
