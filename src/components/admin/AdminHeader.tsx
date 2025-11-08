import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { LogOut, LayoutDashboard, Package, Mail, Users } from "lucide-react";
import logo from "@/assets/logo.png";

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
              <Button variant="outline" size="sm">
                Ver site
              </Button>
            </Link>
            <Button
              onClick={() => signOut()}
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
