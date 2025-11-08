import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Heart, Leaf } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-bananas.jpg";
import bananadaImage from "@/assets/bananada-product.jpg"; // Fallback image
import gomaImage from "@/assets/goma-product.jpg"; // Fallback image
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  category: string;
  description: string | null;
  weight: string | null;
  image_url: string | null;
  active: boolean;
  sort_order: number;
}

const Home = () => {
  const { toast } = useToast();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [loadingNewsletter, setLoadingNewsletter] = useState(false);
  const [highlightProducts, setHighlightProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    const loadHighlightProducts = async () => {
      setLoadingProducts(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("active", true)
        .order("sort_order", { ascending: true })
        .limit(2); // Limit to 2 products for the highlight section

      if (error) {
        toast({
          title: "Erro ao carregar produtos em destaque",
          description: error.message,
          variant: "destructive",
        });
      } else {
        setHighlightProducts(data || []);
      }
      setLoadingProducts(false);
    };

    loadHighlightProducts();
  }, []); // Dependência alterada de [toast] para []

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingNewsletter(true);

    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert([{ email: newsletterEmail }]);

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
      setNewsletterEmail("");
    }

    setLoadingNewsletter(false);
  };

  const getProductFallbackImage = (category: string) => {
    return category.toLowerCase().includes("banana") ? bananadaImage : gomaImage;
  };

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/60"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center text-primary-foreground">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Sabor Autêntico que Atravessa Gerações
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Desde 2000, produzindo bananadas e gomas de amido com a tradição e o carinho de uma empresa familiar
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/produtos">
              <Button size="lg" variant="secondary" className="group">
                Veja nosso catálogo
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/contato">
              <Button size="lg" variant="outline" className="border-2 border-brand-yellow text-brand-yellow hover:bg-brand-yellow hover:text-brand-brown">
                Entre em contato
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-foreground">
            Nossos Valores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-card-foreground">Tradição</h3>
              <p className="text-muted-foreground">
                Mais de duas décadas preservando receitas e métodos artesanais que garantem o sabor autêntico
              </p>
            </div>
            <div className="bg-card p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-full mb-6">
                <Award className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-card-foreground">Qualidade</h3>
              <p className="text-muted-foreground">
                Ingredientes selecionados e rigoroso controle em todas as etapas de produção
              </p>
            </div>
            <div className="bg-card p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-6">
                <Leaf className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-card-foreground">Família</h3>
              <p className="text-muted-foreground">
                Uma empresa familiar que trata cada cliente como parte da nossa história
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Highlight */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-foreground">
            Nossos Produtos
          </h2>
          {loadingProducts ? (
            <p className="text-center text-muted-foreground">Carregando produtos...</p>
          ) : highlightProducts.length === 0 ? (
            <p className="text-center text-muted-foreground">Nenhum produto em destaque disponível no momento.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {highlightProducts.map((product) => (
                <div key={product.id} className="group overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={product.image_url || getProductFallbackImage(product.category)}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-3xl font-bold mb-2">{product.name}</h3>
                      <p className="text-sm opacity-90 mb-4">
                        {product.description || `Nosso produto de ${product.category}, feito com ingredientes selecionados.`}
                      </p>
                      <Link to="/produtos">
                        <Button variant="secondary" size="sm" className="group/btn">
                          Saiba mais
                          <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Cadastre-se para receber novidades
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Fique por dentro de lançamentos, promoções e conteúdos exclusivos
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Seu melhor e-mail"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg text-foreground"
              required
            />
            <Button
              type="submit"
              variant="secondary"
              size="lg"
              disabled={loadingNewsletter}
            >
              {loadingNewsletter ? "Cadastrando..." : "Cadastrar"}
            </Button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;