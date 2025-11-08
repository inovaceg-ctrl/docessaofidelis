import { useState, useEffect } from "react";
import { ProtectedRoute } from "@/hooks/useAuth";
import AdminHeader from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Download, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Subscriber {
  id: string;
  email: string;
  subscribed: boolean;
  created_at: string;
}

const Newsletter = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadSubscribers();
  }, []);

  const loadSubscribers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("newsletter_subscribers")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Erro ao carregar inscritos",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setSubscribers(data || []);
    }
    setLoading(false);
  };

  const handleToggleSubscription = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from("newsletter_subscribers")
      .update({ subscribed: !currentStatus })
      .eq("id", id);

    if (error) {
      toast({
        title: "Erro ao atualizar status",
        description: error.message,
        variant: "destructive",
      });
    } else {
      loadSubscribers();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja remover este inscrito?")) return;

    const { error } = await supabase
      .from("newsletter_subscribers")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Erro ao remover inscrito",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({ title: "Inscrito removido com sucesso!" });
      loadSubscribers();
    }
  };

  const exportToCSV = () => {
    const activeSubscribers = subscribers.filter(s => s.subscribed);
    const csv = [
      ["E-mail", "Status", "Data de Inscrição"],
      ...activeSubscribers.map((s) => [
        s.email,
        s.subscribed ? "Ativo" : "Inativo",
        new Date(s.created_at).toLocaleDateString("pt-BR"),
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `newsletter-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();

    toast({ title: "CSV exportado com sucesso!" });
  };

  const copyEmails = () => {
    const activeEmails = subscribers
      .filter(s => s.subscribed)
      .map(s => s.email)
      .join(", ");

    navigator.clipboard.writeText(activeEmails);
    toast({ title: "E-mails copiados para a área de transferência!" });
  };

  const activeCount = subscribers.filter(s => s.subscribed).length;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <AdminHeader />
        
        <main className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold">Gestão de Newsletter</h1>
              <p className="text-muted-foreground mt-2">
                {activeCount} inscritos ativos de {subscribers.length} total
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={copyEmails}
                variant="outline"
                disabled={activeCount === 0}
              >
                <Mail className="mr-2 h-4 w-4" />
                Copiar E-mails
              </Button>
              <Button
                onClick={exportToCSV}
                variant="outline"
                disabled={activeCount === 0}
              >
                <Download className="mr-2 h-4 w-4" />
                Exportar CSV
              </Button>
            </div>
          </div>

          {loading ? (
            <p>Carregando...</p>
          ) : subscribers.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                Nenhum inscrito na newsletter ainda.
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Lista de Inscritos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {subscribers.map((subscriber) => (
                    <div
                      key={subscriber.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{subscriber.email}</p>
                          <p className="text-sm text-muted-foreground">
                            Inscrito em {new Date(subscriber.created_at).toLocaleDateString("pt-BR")}
                          </p>
                        </div>
                        {subscriber.subscribed ? (
                          <Badge variant="default">Ativo</Badge>
                        ) : (
                          <Badge variant="secondary">Inativo</Badge>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleToggleSubscription(subscriber.id, subscriber.subscribed)}
                        >
                          {subscriber.subscribed ? "Desativar" : "Ativar"}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(subscriber.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Como enviar e-mails em massa</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Para enviar e-mails para todos os inscritos:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                <li>Clique em "Copiar E-mails" para copiar todos os e-mails ativos</li>
                <li>Abra seu cliente de e-mail preferido (Gmail, Outlook, etc.)</li>
                <li>Cole os e-mails no campo BCC (Cópia Oculta) para manter a privacidade</li>
                <li>Escreva sua mensagem e envie</li>
              </ol>
            </CardContent>
          </Card>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default Newsletter;
