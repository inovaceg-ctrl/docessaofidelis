import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo.png";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/empresa", label: "Empresa" },
    { to: "/produtos", label: "Produtos" },
    { to: "/qualidade", label: "Qualidade" },
    { to: "/contato", label: "Contato" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Doces São Fidélis" className="h-16 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Link to="/admin/login">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Área Admin
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="block text-foreground hover:text-primary transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link to="/admin/login" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Área Admin
              </Button>
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
