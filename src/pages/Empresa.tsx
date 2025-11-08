import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Award, Heart, Users, TrendingUp } from "lucide-react";
import factoryImage from "@/assets/factory-aerial.jpg";

const Empresa = () => {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-brand-green-dark text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Nossa História
          </h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Uma jornada de mais de duas décadas dedicada ao sabor autêntico brasileiro
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-primary mb-6">O Início</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                A Doces São Fidélis nasceu em 2000, do sonho de Roberto Porto em criar algo especial. 
                Começamos em uma pequena cozinha em São Fidélis/RJ, produzindo bananadas e gomas de amido 
                com receitas cuidadosamente desenvolvidas. O amor pela tradição e pelo sabor autêntico 
                sempre foi nossa marca registrada desde o primeiro dia.
              </p>
            </div>

            <div className="my-16">
              <img
                src={factoryImage}
                alt="Nossa fábrica - Vista aérea"
                className="w-full rounded-lg shadow-2xl"
              />
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-primary mb-6">Crescimento e Tradição</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Ao longo dos anos, crescemos mantendo nossa essência familiar e nosso compromisso inabalável 
                com a qualidade. Cada bananada e cada goma de amido são produzidas com o mesmo cuidado e 
                atenção aos detalhes que nossos fundadores estabeleceram desde o início. O processo artesanal 
                é preservado em cada etapa da produção, garantindo que o sabor autêntico chegue até você.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-primary mb-6">Hoje</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Hoje, mais de duas décadas depois, nossa fábrica atende diversos estados brasileiros, 
                levando momentos de felicidade através de produtos que preservam a tradição artesanal. 
                Continuamos sendo uma empresa familiar, onde cada membro da equipe compartilha do mesmo 
                compromisso com a excelência que Roberto Porto estabeleceu.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-primary mb-6">Nossa Missão</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Nossa missão permanece a mesma: produzir doces de alta qualidade que celebram o sabor 
                tradicional brasileiro, mantendo viva a arte de fazer bananadas e gomas de amido como 
                antigamente, mas com a estrutura e organização necessárias para atender nossos clientes 
                em todo o país.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-foreground">
            Nossos Pilares
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="bg-card p-8 rounded-lg shadow-lg text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-card-foreground">Tradição</h3>
              <p className="text-muted-foreground">
                Receitas e métodos preservados há mais de 20 anos
              </p>
            </div>
            <div className="bg-card p-8 rounded-lg shadow-lg text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-full mb-6">
                <Award className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-card-foreground">Qualidade</h3>
              <p className="text-muted-foreground">
                Compromisso com a excelência em cada produto
              </p>
            </div>
            <div className="bg-card p-8 rounded-lg shadow-lg text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-6">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-card-foreground">Amor</h3>
              <p className="text-muted-foreground">
                Cada doce é feito com carinho e dedicação
              </p>
            </div>
            <div className="bg-card p-8 rounded-lg shadow-lg text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-card-foreground">Crescimento</h3>
              <p className="text-muted-foreground">
                Evoluindo sem perder nossa essência
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Empresa;
