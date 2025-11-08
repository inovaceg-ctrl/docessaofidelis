import { useState, useEffect } from "react";
import { ProtectedRoute } from "@/hooks/useAuth";
import AdminHeader from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2, Plus, X } from "lucide-react";
import { Switch } from "@/components/ui/switch";

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

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    weight: "",
    image_url: "",
    active: true,
    sort_order: 0,
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingProduct) {
      const { error } = await supabase
        .from("products")
        .update(formData)
        .eq("id", editingProduct.id);

      if (error) {
        toast({
          title: "Erro ao atualizar produto",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({ title: "Produto atualizado com sucesso!" });
        resetForm();
        loadProducts();
      }
    } else {
      const { error } = await supabase
        .from("products")
        .insert([formData]);

      if (error) {
        toast({
          title: "Erro ao adicionar produto",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({ title: "Produto adicionado com sucesso!" });
        resetForm();
        loadProducts();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este produto?")) return;

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Erro ao excluir produto",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({ title: "Produto excluído com sucesso!" });
      loadProducts();
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      description: product.description || "",
      weight: product.weight || "",
      image_url: product.image_url || "",
      active: product.active,
      sort_order: product.sort_order,
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      description: "",
      weight: "",
      image_url: "",
      active: true,
      sort_order: 0,
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <AdminHeader />
        
        <main className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Gestão de Produtos</h1>
            <Button
              onClick={() => setShowForm(!showForm)}
              className="bg-primary hover:bg-primary/90"
            >
              {showForm ? (
                <>
                  <X className="mr-2 h-4 w-4" />
                  Cancelar
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Produto
                </>
              )}
            </Button>
          </div>

          {showForm && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>
                  {editingProduct ? "Editar Produto" : "Novo Produto"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nome *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Categoria *</Label>
                      <Input
                        id="category"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="weight">Peso/Quantidade</Label>
                      <Input
                        id="weight"
                        value={formData.weight}
                        onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                        placeholder="Ex: 500g"
                      />
                    </div>
                    <div>
                      <Label htmlFor="sort_order">Ordem</Label>
                      <Input
                        id="sort_order"
                        type="number"
                        value={formData.sort_order}
                        onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                    <div className="flex items-center space-x-2 pt-8">
                      <Switch
                        id="active"
                        checked={formData.active}
                        onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
                      />
                      <Label htmlFor="active">Ativo</Label>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="image_url">URL da Imagem</Label>
                    <Input
                      id="image_url"
                      type="url"
                      value={formData.image_url}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" className="bg-primary hover:bg-primary/90">
                      {editingProduct ? "Atualizar" : "Adicionar"}
                    </Button>
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Cancelar
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {loading ? (
            <p>Carregando...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id} className={!product.active ? "opacity-60" : ""}>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-start">
                      <span>{product.name}</span>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEdit(product)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(product.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      <strong>Categoria:</strong> {product.category}
                    </p>
                    {product.weight && (
                      <p className="text-sm text-muted-foreground mb-2">
                        <strong>Peso:</strong> {product.weight}
                      </p>
                    )}
                    {product.description && (
                      <p className="text-sm text-muted-foreground mb-2">
                        {product.description}
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground">
                      <strong>Status:</strong> {product.active ? "Ativo" : "Inativo"}
                    </p>
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

export default Products;
