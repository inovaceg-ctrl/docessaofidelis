import { useState, useEffect, createContext, useContext } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true); // Inicia como true

  // Função para verificar o papel de administrador
  const checkAdminRole = async (userId: string) => {
    console.log("checkAdminRole: Starting check for user ID:", userId);
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .eq("role", "admin" as const) // Usar 'as const' para segurança de tipo com enums
        .maybeSingle();

      if (error) {
        console.error("checkAdminRole: Error checking admin role:", error);
        setIsAdmin(false);
      } else {
        const finalIsAdmin = !!data; // Captura o valor antes de definir o estado
        setIsAdmin(finalIsAdmin);
        console.log("checkAdminRole: Supabase query result for admin role:", data, "isAdmin set to:", finalIsAdmin);
      }
    } catch (error) {
      console.error("checkAdminRole: Caught exception checking admin role:", error);
      setIsAdmin(false);
    } finally {
      setLoading(false); // Define loading como false SOMENTE após a verificação de função
    }
  };

  useEffect(() => {
    let isMounted = true; // Flag para evitar atualizações de estado em componente desmontado

    const handleAuthChange = async (event: string, currentSession: Session | null) => {
      if (!isMounted) return;

      console.log("AuthProvider: Auth state change event:", event, "Session:", currentSession);
      setSession(currentSession);
      setUser(currentSession?.user ?? null);

      if (currentSession?.user) {
        await checkAdminRole(currentSession.user.id); // Aguarda a verificação de função
      } else {
        setIsAdmin(false); // Garante que isAdmin seja false se não houver usuário
        setLoading(false); // Conclui o carregamento se não houver usuário
      }
    };

    // Configura o listener para mudanças de estado de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthChange);

    // Verifica a sessão inicial ao carregar o componente
    supabase.auth.getSession().then(async ({ data: { session: initialSession } }) => {
      if (!isMounted) return;

      console.log("AuthProvider: Initial session check result:", initialSession);
      setSession(initialSession);
      setUser(initialSession?.user ?? null);

      if (initialSession?.user) {
        await checkAdminRole(initialSession.user.id); // Aguarda a verificação de função
      } else {
        setIsAdmin(false); // Garante que isAdmin seja false se não houver usuário inicial
        setLoading(false); // Conclui o carregamento se não houver usuário inicial
      }
    });

    return () => {
      isMounted = false; // Limpa a flag ao desmontar
      console.log("AuthProvider: Unsubscribing from auth state changes.");
      subscription.unsubscribe();
    };
  }, []); // Dependências vazias para rodar apenas uma vez na montagem

  const signIn = async (email: string, password: string) => {
    console.log("signIn: Attempting to sign in with email:", email);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error("signIn: Sign-in error:", error);
    } else {
      console.log("signIn: Sign-in successful (no error returned).");
    }
    return { error };
  };

  const signUp = async (email: string, password: string) => {
    console.log("signUp: Attempting to sign up with email:", email);
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl
      }
    });
    if (error) {
      console.error("signUp: Sign-up error:", error);
    } else {
      console.log("signUp: Sign-up successful (no error returned).");
    }
    return { error };
  };

  const signOut = async () => {
    console.log("signOut: Attempting to sign out.");
    await supabase.auth.signOut();
    setIsAdmin(false);
    setSession(null);
    setUser(null);
    console.log("signOut: Signed out, isAdmin set to false.");
  };

  console.log("AuthContext.Provider render: user:", user?.id, "session:", session?.user?.id, "isAdmin:", isAdmin, "loading:", loading);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isAdmin,
        loading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  console.log("ProtectedRoute render: isAdmin:", isAdmin, "loading:", loading);

  useEffect(() => {
    console.log("ProtectedRoute useEffect: isAdmin:", isAdmin, "loading:", loading);
    if (!loading && !isAdmin) {
      console.log("ProtectedRoute: Not admin and not loading, redirecting to /admin/login");
      navigate("/admin/login");
    } else if (!loading && isAdmin) {
      console.log("ProtectedRoute: Is admin and not loading, allowing access.");
    }
  }, [isAdmin, loading, navigate]);

  if (loading) {
    console.log("ProtectedRoute: Loading state, showing 'Carregando...'");
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">Carregando...</div>
      </div>
    );
  }

  console.log("ProtectedRoute: Not loading. Is admin?", isAdmin);
  return isAdmin ? <>{children}</> : null;
};