import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export default function Screen1Welcome() {
  const { setStep } = useOnboarding();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"idle" | "signup" | "login">("idle");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    if (!email || !password) {
      toast({ title: "Please enter email and password", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        toast({ title: "Check your email to confirm your account!" });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        // Check if onboarding is complete
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: profile } = await supabase.from("profiles").select("onboarding_complete").eq("id", user.id).single();
          if (profile?.onboarding_complete) {
            navigate("/");
            return;
          }
        }
        setStep(2);
      }
    } catch (err: any) {
      toast({ title: err.message || "Auth error", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  // Listen for email confirmation
  supabase.auth.onAuthStateChange((event) => {
    if (event === "SIGNED_IN" && mode === "signup") {
      setStep(2);
    }
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8">
      {/* Animated logo */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="relative"
      >
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
            <Heart className="w-12 h-12 text-primary" fill="hsl(var(--primary))" />
          </div>
        </motion.div>
      </motion.div>

      <div>
        <h1 className="text-3xl font-bold text-foreground">Healix</h1>
        <p className="text-muted-foreground mt-2">Your AI-powered health companion</p>
      </div>

      {mode === "idle" ? (
        <div className="w-full space-y-3">
          <Button onClick={() => setMode("signup")} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            Sign Up
          </Button>
          <Button onClick={() => setMode("login")} variant="outline" className="w-full border-primary text-primary hover:bg-primary/5">
            Log In
          </Button>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full space-y-4">
          <h2 className="text-lg font-semibold text-foreground">
            {mode === "signup" ? "Create your account" : "Welcome back"}
          </h2>
          <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          <Button onClick={handleAuth} disabled={loading} className="w-full bg-primary text-primary-foreground">
            {loading ? "Please wait..." : mode === "signup" ? "Sign Up" : "Log In"}
          </Button>
          <button onClick={() => setMode("idle")} className="text-sm text-muted-foreground hover:text-foreground">
            ← Back
          </button>
        </motion.div>
      )}

      {/* Subtle pattern */}
      <div className="fixed inset-0 -z-10 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)`,
        backgroundSize: "20px 20px",
      }} />
    </div>
  );
}
