import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle2, Leaf, Award, Users, ShieldCheck, Factory } from "lucide-react";

const Qualidade = () => {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-brand-green-dark text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Qualidade
          </h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Nosso compromisso com a excelência em cada etapa da produção
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-foreground">
              Compromisso com a Excelência
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              A qualidade não é apenas uma palavra para nós, é um compromisso que assumimos com cada cliente. 
              Desde a fundação da Doces São Fidélis em 2000, mantemos os mais altos padrões de produção, 
              combinando métodos tradicionais com as melhores práticas de segurança alimentar.
            </p>
          </div>

          {/* Quality Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-card p-8 rounded-lg shadow-lg">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Leaf className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-card-foreground">Ingredientes Selecionados</h3>
                  <p className="text-muted-foreground">
                    Utilizamos apenas bananas de primeira qualidade, açúcar refinado e ingredientes naturais 
                    cuidadosamente selecionados. Cada lote é inspecionado para garantir a melhor matéria-prima.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card p-8 rounded-lg shadow-lg">
              <div className="flex items-start gap-4">
                <div className="bg-secondary/10 p-3 rounded-lg">
                  <Factory className="h-8 w-8 text-secondary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-card-foreground">Processo Artesanal</h3>
                  <p className="text-muted-foreground">
                    Mantemos o processo tradicional de produção, garantindo o sabor autêntico e a textura perfeita 
                    em cada doce. A experiência de décadas se reflete em cada produto.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card p-8 rounded-lg shadow-lg">
              <div className="flex items-start gap-4">
                <div className="bg-accent/10 p-3 rounded-lg">
                  <Users className="h-8 w-8 text-accent" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-card-foreground">Equipe Dedicada</h3>
                  <p className="text-muted-foreground">
                    Nossa equipe familiar trabalha com paixão e dedicação, tratando cada lote como se fosse 
                    para a própria família. O cuidado manual em etapas críticas faz toda a diferença.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card p-8 rounded-lg shadow-lg">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <ShieldCheck className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-card-foreground">Controle de Qualidade</h3>
                  <p className="text-muted-foreground">
                    Rigoroso controle em todas as etapas, desde a seleção dos ingredientes até o produto final 
                    embalado. Seguimos todas as normas sanitárias e de segurança alimentar.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Process Steps */}
          <div className="bg-muted p-12 rounded-lg">
            <h3 className="text-3xl font-bold mb-8 text-center text-foreground">
              Nosso Processo de Qualidade
            </h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg mb-2 text-foreground">Seleção Rigorosa</h4>
                  <p className="text-muted-foreground">
                    Cada banana é cuidadosamente selecionada no ponto ideal de maturação para garantir 
                    o melhor sabor e textura.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg mb-2 text-foreground">Higienização Completa</h4>
                  <p className="text-muted-foreground">
                    Todos os ingredientes passam por rigoroso processo de higienização antes de entrar 
                    na linha de produção.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg mb-2 text-foreground">Produção Controlada</h4>
                  <p className="text-muted-foreground">
                    Temperatura, tempo de cozimento e consistência são monitorados constantemente 
                    para garantir a qualidade uniforme.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg mb-2 text-foreground">Embalagem Segura</h4>
                  <p className="text-muted-foreground">
                    Produtos são embalados em ambiente controlado, preservando frescor e qualidade 
                    até chegar à sua casa.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg mb-2 text-foreground">Inspeção Final</h4>
                  <p className="text-muted-foreground">
                    Cada lote passa por inspeção final antes da distribuição, garantindo que apenas 
                    produtos perfeitos cheguem aos nossos clientes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Certification Section */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
              <Award className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-3xl font-bold mb-4 text-foreground">
              Certificações e Conformidade
            </h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Nossa produção atende a todas as exigências da vigilância sanitária e segue rigorosamente 
              as boas práticas de fabricação (BPF) estabelecidas pela ANVISA.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Qualidade;
