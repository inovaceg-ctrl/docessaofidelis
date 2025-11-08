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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("AuthProvider: Setting up auth state listener.");
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("AuthProvider: Auth state change event:", event, "Session:", session);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          console.log("AuthProvider: User found in session, checking admin role for user ID:", session.user.id);
          // Using setTimeout to ensure state updates are processed before role check,
          // though direct call should also work. Let's keep it for now.
          setTimeout(() => {
            checkAdminRole(session.user.id);
          }, 0);
        } else {
          console.log("AuthProvider: No user in session, setting isAdmin to false.");
          setIsAdmin(false);
          setLoading(false);
        }
      }
    );

    console.log("AuthProvider: Checking for existing session.");
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("AuthProvider: Initial session check result:", session);
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        console.log("AuthProvider: Initial session has user, checking admin role for user ID:", session.user.id);
        checkAdminRole(session.user.id);
      } else {
        console.log("AuthProvider: No user in initial session, setting loading to false.");
        setLoading(false);
      }
    });

    return () => {
      console.log("AuthProvider: Unsubscribing from auth state changes.");
      subscription.unsubscribe();
    };
  }, []);

  const checkAdminRole = async (userId: string) => {
    console.log("checkAdminRole: Starting check for user ID:", userId);
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .eq("role", "admin")
        .maybeSingle();

      if (error) {
        console.error("checkAdminRole: Error checking admin role:", error);
        setIsAdmin(false);
      } else {
        console.log("checkAdminRole: Supabase query result for admin role:", data);
        setIsAdmin(!!data);
      }
    } catch (error) {
      console.error("checkAdminRole: Caught exception checking admin role:", error);
      setIsAdmin(false);
    } finally {
      console.log("checkAdminRole: Finished, isAdmin is now:", !!isAdmin); // Log current state
      setLoading(false);
    }
  };

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