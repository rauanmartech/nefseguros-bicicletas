import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const Configuracoes = () => {
  return (
    <div className="space-y-6 max-w-lg">
      <h1 className="text-lg font-semibold">Configurações</h1>

      <div className="border border-border rounded-lg p-6 space-y-5">
        <h2 className="text-sm font-medium text-muted-foreground">Perfil</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome</Label>
            <Input id="nome" placeholder="Seu nome" defaultValue="Administrador" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" placeholder="seu@email.com" defaultValue="admin@empresa.com" />
          </div>
        </div>
        <div className="flex justify-end">
          <Button size="sm">Salvar</Button>
        </div>
      </div>

      <div className="border border-border rounded-lg p-6 space-y-4">
        <h2 className="text-sm font-medium text-muted-foreground">Sistema</h2>
        <p className="text-sm text-muted-foreground">
          Integrações e configurações avançadas estarão disponíveis em breve.
        </p>
      </div>
    </div>
  );
};

export default Configuracoes;
