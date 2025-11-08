import { useEffect, useState } from "react";
import { ProtectedRoute } from "@/hooks/useAuth";
import AdminHeader from "@/components/admin/AdminHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Package, Mail, Users, TrendingUp } from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    contacts: 0,
    newsletter: 0,
    unreadContacts: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const [productsRes, contactsRes, newsletterRes, unreadRes] = await Promise.all([
      supabase.from("products").select("*", { count: "exact", head: true }),
      supabase.from("contacts").select("*", { count: "exact", head: true }),
      supabase.from("newsletter_subscribers").select("*", { count: "exact", head: true }),
      supabase.from("contacts").select("*", { count: "exact", head: true }).eq("read", false),
    ]);

    setStats({
      products: productsRes.count || 0,
      contacts: contactsRes.count || 0,
      newsletter: newsletterRes.count || 0,
      unreadContacts: unreadRes.count || 0,
    });
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <AdminHeader />
        
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Produtos</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.products}</div>
                <p className="text-xs text-muted-foreground">
                  Total de produtos cadastrados
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Contatos</CardTitle>
                <Mail className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.contacts}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.unreadContacts} não lidos
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Newsletter</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.newsletter}</div>
                <p className="text-xs text-muted-foreground">
                  Inscritos ativos
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Engajamento</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Ativo</div>
                <p className="text-xs text-muted-foreground">
                  Sistema funcionando
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Bem-vindo ao Painel Administrativo</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Use o menu acima para navegar entre as diferentes seções:
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
                <li><strong>Produtos:</strong> Gerencie o catálogo de produtos (adicionar, editar, remover)</li>
                <li><strong>Contatos:</strong> Visualize e gerencie mensagens de contato</li>
                <li><strong>Newsletter:</strong> Gerencie inscritos e envie e-mails em massa</li>
              </ul>
            </CardContent>
          </Card>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
