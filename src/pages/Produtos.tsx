import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import bananadaImage from "@/assets/bananada-product.jpg";
import gomaImage from "@/assets/goma-product.jpg";
import { Package } from "lucide-react";

const Produtos = () => {
  const products = [
    {
      id: 1,
      name: "Bananada Tradicional",
      category: "Bananadas",
      description: "Nossa bananada clássica, feita com bananas selecionadas e açúcar refinado. Sabor autêntico que atravessa gerações.",
      weight: "500g",
      image: bananadaImage,
    },
    {
      id: 2,
      name: "Bananada Premium",
      category: "Bananadas",
      description: "Versão especial com bananas de primeira qualidade, textura mais macia e sabor intenso.",
      weight: "500g",
      image: bananadaImage,
    },
    {
      id: 3,
      name: "Bananada em Barras",
      category: "Bananadas",
      description: "Formato prático em barras individuais, perfeito para levar onde quiser.",
      weight: "Pack com 10 unidades",
      image: bananadaImage,
    },
    {
      id: 4,
      name: "Goma de Amido Sortida",
      category: "Gomas",
      description: "Deliciosas gomas de amido em diversos sabores e cores. Perfeitas para festas e presentes.",
      weight: "1kg",
      image: gomaImage,
    },
    {
      id: 5,
      name: "Goma de Amido Sabor Frutas",
      category: "Gomas",
      description: "Gomas com sabores naturais de frutas tropicais. Sem corantes artificiais.",
      weight: "500g",
      image: gomaImage,
    },
    {
      id: 6,
      name: "Goma de Amido Premium",
      category: "Gomas",
      description: "Nossa linha premium de gomas, com texturas especiais e sabores únicos.",
      weight: "750g",
      image: gomaImage,
    },
  ];

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                    {product.category}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl">{product.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2 text-base">
                    <Package className="h-4 w-4" />
                    {product.weight}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">{product.description}</p>
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Solicitar orçamento
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
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
