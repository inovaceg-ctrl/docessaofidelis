import { useState, useEffect } from "react";
import { ProtectedRoute } from "@/hooks/useAuth";
import AdminHeader from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Download, Mail, Phone, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Contact {
  id: string;
  name: string;
  whatsapp: string | null;
  email: string;
  cep: string | null;
  message: string;
  read: boolean;
  created_at: string;
}

const Contacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Erro ao carregar contatos",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setContacts(data || []);
    }
    setLoading(false);
  };

  const handleToggleRead = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from("contacts")
      .update({ read: !currentStatus })
      .eq("id", id);

    if (error) {
      toast({
        title: "Erro ao atualizar status",
        description: error.message,
        variant: "destructive",
      });
    } else {
      loadContacts();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este contato?")) return;

    const { error } = await supabase
      .from("contacts")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Erro ao excluir contato",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({ title: "Contato excluído com sucesso!" });
      loadContacts();
    }
  };

  const exportToCSV = () => {
    const csv = [
      ["Nome", "E-mail", "WhatsApp", "CEP", "Mensagem", "Lido", "Data"],
      ...contacts.map((c) => [
        c.name,
        c.email,
        c.whatsapp || "",
        c.cep || "",
        c.message,
        c.read ? "Sim" : "Não",
        new Date(c.created_at).toLocaleDateString("pt-BR"),
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `contatos-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();

    toast({ title: "CSV exportado com sucesso!" });
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <AdminHeader />
        
        <main className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Gestão de Contatos</h1>
            <Button
              onClick={exportToCSV}
              variant="outline"
              disabled={contacts.length === 0}
            >
              <Download className="mr-2 h-4 w-4" />
              Exportar CSV
            </Button>
          </div>

          {loading ? (
            <p>Carregando...</p>
          ) : contacts.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                Nenhum contato recebido ainda.
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {contacts.map((contact) => (
                <Card key={contact.id} className={contact.read ? "opacity-70" : ""}>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          {contact.name}
                          {!contact.read && (
                            <Badge variant="default">Novo</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground font-normal mt-1">
                          {new Date(contact.created_at).toLocaleString("pt-BR")}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant={contact.read ? "outline" : "default"}
                          onClick={() => handleToggleRead(contact.id, contact.read)}
                        >
                          {contact.read ? "Marcar não lido" : "Marcar como lido"}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(contact.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <a href={`mailto:${contact.email}`} className="text-primary hover:underline">
                        {contact.email}
                      </a>
                    </div>
                    {contact.whatsapp && (
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <a
                          href={`https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {contact.whatsapp}
                        </a>
                      </div>
                    )}
                    {contact.cep && (
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{contact.cep}</span>
                      </div>
                    )}
                    <div className="mt-4 p-4 bg-muted rounded-lg">
                      <p className="text-sm whitespace-pre-wrap">{contact.message}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default Contacts;
