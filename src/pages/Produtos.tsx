import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import bananadaImage from "@/assets/bananada-product.jpg";
import gomaImage from "@/assets/goma-product.jpg";
import { Package } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  category: string;
  description: string | null;
  weight: string | null;
  image_url: string | null;
}

const Produtos = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("active", true)
      .order("sort_order", { ascending: true });

    if (error) {
      toast({
        title: "Erro ao carregar produtos",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  };

  const getProductImage = (category: string) => {
    return category.toLowerCase().includes("banana") ? bananadaImage : gomaImage;
  };

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-brand-green-dark text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Nossos Produtos
          </h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Tradição e sabor em cada doce que produzimos
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center">Carregando produtos...</div>
          ) : products.length === 0 ? (
            <div className="text-center text-muted-foreground">
              Nenhum produto disponível no momento.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={product.image_url || getProductImage(product.category)}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                      {product.category}
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-2xl">{product.name}</CardTitle>
                    {product.weight && (
                      <CardDescription className="flex items-center gap-2 text-base">
                        <Package className="h-4 w-4" />
                        {product.weight}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    {product.description && (
                      <p className="text-muted-foreground mb-6">{product.description}</p>
                    )}
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      Solicitar orçamento
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-foreground">
            Não encontrou o que procurava?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-muted-foreground">
            Entre em contato conosco. Podemos desenvolver produtos personalizados para atender suas necessidades.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Fale conosco
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Produtos;
