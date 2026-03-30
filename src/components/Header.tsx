import { NavLink } from "@/components/NavLink";

const Header = () => {
  return (
    <header className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <a href="https://www.prohiit.fr" className="flex items-center gap-3">
          <img
            src="/images/prohiit-logo.png"
            alt="PROHIIT"
            className="h-10 w-auto"
          />
        </a>
        <nav className="flex items-center gap-1">
          <a
            href="https://www.prohiit.fr/tarifs.html"
            className="px-4 py-2 text-sm font-semibold uppercase tracking-wide rounded-md transition-colors hover:bg-sidebar-accent"
          >
            Abonnements
          </a>
          <NavLink
            to="/inscription"
            className="px-4 py-2 text-sm font-semibold uppercase tracking-wide rounded-md transition-colors hover:bg-sidebar-accent"
            activeClassName="bg-primary text-primary-foreground"
          >
            Inscription
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
