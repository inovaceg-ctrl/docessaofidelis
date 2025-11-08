import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Contato = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    email: "",
    cep: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    // Save to database
    const { error } = await supabase
      .from("contacts")
      .insert([formData]);

    if (error) {
      toast({
        title: "Erro ao enviar mensagem",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Mensagem enviada!",
      description: "Entraremos em contato em breve.",
    });

    // Reset form
    setFormData({
      name: "",
      whatsapp: "",
      email: "",
      cep: "",
      message: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-brand-green-dark text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Fale Conosco
          </h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Estamos prontos para atender você da melhor forma
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-foreground">
                Envie sua mensagem
              </h2>
              <p className="text-muted-foreground mb-8">
                Preencha o formulário abaixo e entraremos em contato o mais breve possível.
              </p>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Nome *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Seu nome completo"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="whatsapp">WhatsApp</Label>
                  <Input
                    id="whatsapp"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    placeholder="(00) 00000-0000"
                  />
                </div>
                <div>
                  <Label htmlFor="email">E-mail *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="cep">CEP</Label>
                  <Input
                    id="cep"
                    name="cep"
                    value={formData.cep}
                    onChange={handleChange}
                    placeholder="00000-000"
                  />
                </div>
                <div>
                  <Label htmlFor="message">Mensagem *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Digite sua mensagem aqui..."
                    rows={6}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                  Enviar mensagem
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-foreground">
                Informações de Contato
              </h2>
              <div className="space-y-8">
                <div className="bg-card p-6 rounded-lg shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2 text-card-foreground">Endereço</h3>
                      <p className="text-muted-foreground">
                        Rua Alexandre Atie, 4 Pg Alvorada<br />
                        Campos dos Goytacazes - RJ<br />
                        CEP: 28083-160
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-6 rounded-lg shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="bg-secondary/10 p-3 rounded-lg">
                      <Phone className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2 text-card-foreground">Telefone</h3>
                      <p className="text-muted-foreground">
                        22-999408875
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-6 rounded-lg shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="bg-accent/10 p-3 rounded-lg">
                      <Mail className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2 text-card-foreground">E-mail</h3>
                      <p className="text-muted-foreground">
                        bananadacampista@hotmail.com
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-6 rounded-lg shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2 text-card-foreground">Horário de Atendimento</h3>
                      <p className="text-muted-foreground">
                        Seg. a quinta das 8 às 18h<br />
                        Sexta-feira até às 17h
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-muted py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-4xl font-bold mb-6 text-foreground">
            Cadastre-se na Nossa Newsletter
          </h2>
          <p className="text-xl mb-8 text-muted-foreground">
            Receba novidades, promoções e conteúdos exclusivos diretamente no seu e-mail
          </p>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const email = (e.target as any).email.value;
              
              const { error } = await supabase
                .from("newsletter_subscribers")
                .insert([{ email }]);

              if (error) {
                if (error.code === "23505") {
                  toast({
                    title: "Este e-mail já está cadastrado",
                    description: "Você já está inscrito na nossa newsletter!",
                  });
                } else {
                  toast({
                    title: "Erro ao cadastrar",
                    description: error.message,
                    variant: "destructive",
                  });
                }
              } else {
                toast({
                  title: "Cadastro realizado!",
                  description: "Você receberá nossas novidades em breve.",
                });
                (e.target as any).reset();
              }
            }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Input
              type="email"
              name="email"
              placeholder="Seu melhor e-mail"
              className="flex-1"
              required
            />
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              Cadastrar
            </Button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contato;
