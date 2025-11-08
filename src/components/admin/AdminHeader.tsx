import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { LogOut, LayoutDashboard, Package, Mail, Users, Menu } from "lucide-react";
import logo from "@/assets/logo.png";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"; // Importar Sheet components

const AdminHeader = () => {
  const { signOut } = useAuth();
  const location = useLocation();

  const navItems = [
    { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/admin/products", label: "Produtos", icon: Package },
    { to: "/admin/contacts", label: "Contatos", icon: Mail },
    { to: "/admin/newsletter", label: "Newsletter", icon: Users },
  ];

  return (
    <header className="bg-card border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/admin/dashboard" className="flex items-center gap-3">
            <img src={logo} alt="Doces São Fidélis" className="h-12 w-auto" />
            <span className="font-bold text-lg">Admin</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-2 transition-colors ${
                    location.pathname === item.to
                      ? "text-primary font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="outline" size="sm" className="hidden md:inline-flex"> {/* Hide on mobile */}
                Ver site
              </Button>
            </Link>
            <Button
              onClick={() => signOut()}
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive hover:bg-destructive/10 hidden md:inline-flex" // Hide on mobile
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>

            {/* Mobile Menu Trigger */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Abrir menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] sm:w-[300px]">
                <div className="flex flex-col gap-6 pt-8">
                  <Link to="/admin/dashboard" className="flex items-center gap-3 pb-4 border-b border-border">
                    <img src={logo} alt="Doces São Fidélis" className="h-12 w-auto" />
                    <span className="font-bold text-lg">Admin</span>
                  </Link>
                  <nav className="flex flex-col gap-4">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.to}
                          to={item.to}
                          className={`flex items-center gap-3 text-lg transition-colors ${
                            location.pathname === item.to
                              ? "text-primary font-semibold"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                          {item.label}
                        </Link>
                      );
                    })}
                  </nav>
                  <div className="flex flex-col gap-4 mt-auto pt-4 border-t border-border">
                    <Link to="/">
                      <Button variant="outline" className="w-full">
                        Ver site
                      </Button>
                    </Link>
                    <Button
                      onClick={() => signOut()}
                      variant="destructive"
                      className="w-full"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sair
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;