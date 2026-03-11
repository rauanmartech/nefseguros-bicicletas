import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/layout/Logo";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !senha) {
      setErro("Preencha todos os campos.");
      return;
    }
    // Mock — aceita qualquer credencial
    localStorage.setItem("isAuthenticated", "true");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 p-4">
      <div className="w-full max-w-5xl h-[600px] bg-background rounded-2xl shadow-2xl flex overflow-hidden border border-border">
        {/* Left side with watermark */}
        <div className="hidden lg:flex flex-1 bg-primary/5 items-center justify-center relative overflow-hidden">
          <img
            src="/src/assets/logo-cropado.webp"
            alt="Watermark"
            className="absolute -left-20 top-1/2 -translate-y-1/2 w-[120%] h-auto opacity-50 pointer-events-none grayscale brightness-150 mix-blend-multiply"
          />
          <div className="relative z-10 p-12 text-left">
            <h2 className="text-4xl font-bold text-primary mb-4">NEF Nexus</h2>
            <p className="text-lg text-muted-foreground max-w-xs">
              Gerencie seus leads e otimize seu processo de vendas com a melhor ferramenta de CRM.
            </p>
          </div>
        </div>

        {/* Right side with login form */}
        <div className="w-full lg:w-[450px] flex flex-col justify-center p-8 md:p-12">
          <div className="space-y-6">
            <div className="text-center lg:text-left space-y-4">
              <div className="flex justify-center lg:justify-start">
                <Logo variant="full" className="h-12 w-auto" />
              </div>
              <div className="space-y-1">
                <h1 className="text-2xl font-semibold text-foreground">Bem-vindo de volta</h1>
                <p className="text-sm text-muted-foreground">Insira suas credenciais para acessar o painel</p>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {erro && (
                <p className="text-sm text-destructive bg-destructive/10 p-3 rounded-md border border-destructive/20">{erro}</p>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  className="h-11"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErro(""); }}
                  placeholder="seu@email.com"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="senha">Senha</Label>
                  <a href="#" className="text-xs text-primary hover:underline font-medium">Esqueceu a senha?</a>
                </div>
                <Input
                  id="senha"
                  type="password"
                  className="h-11"
                  value={senha}
                  onChange={(e) => { setSenha(e.target.value); setErro(""); }}
                  placeholder="••••••••"
                />
              </div>
              <Button type="submit" className="w-full h-11 text-base font-medium transition-all hover:scale-[1.01]">
                Entrar no Sistema
              </Button>
            </form>

            <p className="text-center text-xs text-muted-foreground mt-8">
              NEF Nexus © 2024. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
