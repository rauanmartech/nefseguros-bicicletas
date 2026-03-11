import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Lead } from "@/data/mockData";
import { Mail, Phone, MapPin, Calendar, Fingerprint, Map, CheckCircle2, XCircle, Copy, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface LeadModalProps {
  lead: Lead | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LeadModal({ lead, open, onOpenChange }: LeadModalProps) {
  if (!lead) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl overflow-hidden p-0 border-none shadow-2xl">
        {/* Header Principal */}
        <div className="bg-primary p-8 text-primary-foreground relative">
          <div className="space-y-3">
            <div className="space-y-1">
              <h2 className="text-3xl font-black tracking-tighter uppercase leading-none">{lead.nome || 'SEM NOME'}</h2>
              <div className="flex items-center gap-2 text-xs font-bold opacity-70">
                <Fingerprint className="h-4 w-4" />
                <span className="tracking-widest">{lead.docto_identificacao || 'DOCUMENTO NÃO INFORMADO'}</span>
              </div>
            </div>
            <div className="flex gap-4 text-[10px] font-black uppercase tracking-wider opacity-80">
              <span className="flex items-center gap-1.5 bg-background/20 px-2 py-0.5 rounded">
                <Calendar className="h-3 w-3" />
                CADASTRADO EM: {lead.created_at ? new Date(lead.created_at).toLocaleDateString('pt-BR') : '—'}
              </span>
              <span className="flex items-center gap-1.5 opacity-60">
                <Globe className="h-3 w-3" />
                ORIGEM: {lead.eventos || 'SISTEMA'}
              </span>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8 bg-background">
          {/* Grid de Informações Primárias e Secundárias agrupadas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Coluna 1: Contato e Pessoal */}
            <div className="space-y-6">
              <section className="space-y-4">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground border-b pb-2">Canais de Contato</h3>
                <div className="space-y-3 font-medium">
                  <div className="flex items-center gap-3 group">
                    <Phone className="h-4 w-4 text-primary shrink-0" />
                    <div className="flex items-center justify-between flex-1 min-w-0">
                      <span className="text-sm font-bold">{(lead.celular || lead.telefone) || '—'}</span>
                      {(lead.celular || lead.telefone) && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity bg-secondary/50 rounded-lg shrink-0"
                          onClick={() => {
                            navigator.clipboard.writeText(lead.celular || lead.telefone || "");
                            toast.success("Número copiado!");
                          }}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 group">
                    <Mail className="h-4 w-4 text-primary shrink-0" />
                    <div className="flex items-center justify-between flex-1 min-w-0">
                      <span className="text-sm truncate mr-2" title={lead.email}>{lead.email || '—'}</span>
                      {lead.email && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity bg-secondary/50 rounded-lg shrink-0"
                          onClick={() => {
                            navigator.clipboard.writeText(lead.email!);
                            toast.success("E-mail copiado!");
                          }}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground border-b pb-2">Dados Pessoais</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Documento</span>
                    <span className="font-bold font-mono text-xs">{lead.docto_identificacao || '—'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Nascimento</span>
                    <span className="font-bold">{lead.data_nascimento || '—'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Gênero</span>
                    <span className="font-bold">{lead.genero || '—'}</span>
                  </div>
                </div>
              </section>
            </div>

            {/* Coluna 2: Localização */}
            <div className="space-y-6">
              <section className="space-y-4">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground border-b pb-2">Localização Detalhada</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-bold leading-tight">{lead.endereco || 'Endereço não informado'}</p>
                      <p className="text-muted-foreground text-xs">Nº {lead.numero || 'S/N'} — {lead.bairro || 'Sem bairro'}</p>
                      {lead.complemento && <p className="text-primary italic text-[11px] font-medium">{lead.complemento}</p>}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 pt-2">
                    <Map className="h-4 w-4 text-primary" />
                    <p className="font-bold uppercase text-xs">{lead.cidade} / {lead.uf} — {lead.pais || 'BRASIL'}</p>
                  </div>
                </div>
              </section>
            </div>

            {/* Coluna 3: Preferências e Sistema */}
            <div className="space-y-6">
              <section className="space-y-4">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground border-b pb-2">Preferências Nexus</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                    <span className="text-[10px] font-bold uppercase">Receber Calendário</span>
                    {lead.receber_calendario === 'Sim' ? <CheckCircle2 className="h-4 w-4 text-green-600" /> : <XCircle className="h-4 w-4 text-red-300" />}
                  </div>
                  <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                    <span className="text-[10px] font-bold uppercase">Produtos Parceiros</span>
                    {lead.receber_products_parceiros === 'Sim' || lead.receber_produtos_parceiros === 'Sim' ? <CheckCircle2 className="h-4 w-4 text-green-600" /> : <XCircle className="h-4 w-4 text-red-300" />}
                  </div>
                </div>
              </section>

              <section className="space-y-3">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground border-b pb-2">Identificador</h3>
                <div className="p-3 border-2 border-dashed rounded-lg text-center">
                  <p className="text-[10px] font-mono break-all opacity-40">{lead.id}</p>
                </div>
              </section>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-secondary/10 flex justify-end">
          <Button onClick={() => onOpenChange(false)} className="px-10 font-black uppercase tracking-widest text-[10px]">
            Fechar Ficha Nexus
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
