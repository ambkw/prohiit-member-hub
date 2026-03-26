import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search, LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";

const COLLECTIONS = [
  "Tous",
  "Abonnement avec engagement 12 mois",
  "Abonnement sans engagement",
  "Forfait à la carte",
  "Offres spéciales",
];

interface Props {
  search: string;
  onSearchChange: (v: string) => void;
  activeFilter: string;
  onFilterChange: (v: string) => void;
  viewMode: "grid" | "list";
  onViewModeChange: (v: "grid" | "list") => void;
}

const SearchAndFilters = ({
  search,
  onSearchChange,
  activeFilter,
  onFilterChange,
  viewMode,
  onViewModeChange,
}: Props) => {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Rechercher un abonnement…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {COLLECTIONS.map((col) => (
          <button
            key={col}
            onClick={() => onFilterChange(col)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide border transition-colors",
              activeFilter === col
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card text-card-foreground border-border hover:bg-accent"
            )}
          >
            {col === "Tous" ? "Tous" : col.replace("Abonnement ", "").replace("Forfait ", "")}
          </button>
        ))}
        <div className="ml-auto flex gap-1">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => onViewModeChange("grid")}
            aria-label="Vue grille"
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="icon"
            onClick={() => onViewModeChange("list")}
            aria-label="Vue liste"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilters;
