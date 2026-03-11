import { useState, useEffect } from "react";
import { type Lead } from "@/data/mockData";
import { supabase } from "@/lib/supabase";
import { Loader2, Kanban, Globe } from "lucide-react";
import { toast } from "sonner";

const Funil = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('leads')
        .select('*');

      if (error) throw error;
      setLeads(data || []);
    } catch (error) {
      toast.error("Erro ao carregar fontes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const sources = Array.from(new Set(leads.map(l => l.eventos || 'Outros')));

  if (loading) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="font-bold text-foreground">Sincronizando Nexus Hub...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-fade-in pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase italic text-primary">Map de Fontes</h1>
          <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest">Distribuição Geográfica e de Origem</p>
        </div>
        <div className="p-3 bg-secondary/50 rounded-2xl border flex items-center gap-3">
          <Globe className="h-5 w-5 text-primary" />
          <div className="text-[10px] font-black uppercase leading-tight">
            Filtro Temporal<br /><span className="text-primary italic">Tempo Real</span>
          </div>
        </div>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide">
        {sources.map((source) => {
          const leadsFromSource = leads.filter(l => (l.eventos || 'Outros') === source);
          return (
            <div
              key={source}
              className="min-w-[320px] max-w-[320px] bg-secondary/20 rounded-3xl border border-border flex flex-col shadow-sm hover:shadow-xl transition-all h-[70vh] group overflow-hidden"
            >
              <div className="p-6 border-b border-border bg-background/50 group-hover:bg-primary transition-colors">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-60 group-hover:text-primary-foreground">Origem Nexus</span>
                    <h3 className="text-lg font-black uppercase group-hover:text-primary-foreground">{source}</h3>
                  </div>
                  <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center font-black text-primary group-hover:bg-primary-foreground/20 group-hover:text-secondary">
                    {leadsFromSource.length}
                  </div>
                </div>
              </div>
              <div className="p-4 space-y-4 flex-1 overflow-y-auto custom-scrollbar">
                {leadsFromSource.map((lead) => (
                  <div
                    key={lead.id}
                    className="bg-background border border-border rounded-2xl p-4 space-y-3 cursor-pointer hover:border-primary hover:shadow-lg hover:-translate-y-1 transition-all group/card shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center font-black text-[10px] group-hover/card:bg-primary group-hover/card:text-primary-foreground">
                        {lead.nome?.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-sm font-black truncate">{lead.nome}</p>
                        <p className="text-[10px] text-muted-foreground font-bold">{lead.cidade || 'Localização Oculta'}</p>
                      </div>
                    </div>
                    <div className="pt-2 border-t flex items-center justify-between text-[10px] font-black uppercase opacity-60">
                      <span className="flex items-center gap-1"><Kanban className="h-3 w-3" /> Ver Detalhes</span>
                      <span>{lead.created_at ? new Date(lead.created_at).toLocaleDateString('pt-BR') : ''}</span>
                    </div>
                  </div>
                ))}
                {leadsFromSource.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-full opacity-40 italic">
                    <p className="text-xs">Nenhum rastro detectado</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Funil;
