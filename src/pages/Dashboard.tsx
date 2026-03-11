import { useState, useEffect } from "react";
import { Users, Loader2, Calendar, LayoutGrid, Activity } from "lucide-react";
import { type Lead } from "@/data/mockData";
import { supabase } from "@/lib/supabase";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { toast } from "sonner";

const Dashboard = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [tipoGrafico, setTipoGrafico] = useState<'origem' | 'estado'>('estado');

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      let todosLeads: Lead[] = [];
      let inicio = 0;
      const tamanhoBloco = 1000;

      while (true) {
        const { data, error } = await supabase
          .from('leads')
          .select('*')
          .range(inicio, inicio + tamanhoBloco - 1);

        if (error) throw error;
        if (!data || data.length === 0) break;

        todosLeads = [...todosLeads, ...data];
        if (data.length < tamanhoBloco) break;
        inicio += tamanhoBloco;
      }

      setLeads(todosLeads);
    } catch (error) {
      toast.error("Erro ao sincronizar dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const totalLeads = leads.length;
  // Since the new schema lacks 'status', we'll pivot metrics to other insights
  const leadsRecentes = leads.filter(l => {
    if (!l.created_at) return false;
    const d = new Date(l.created_at);
    const today = new Date();
    return d.toDateString() === today.toDateString();
  }).length;

  const metrics = [
    { label: "Total Nexus", value: totalLeads, icon: Users, desc: "Volume total de registros" },
    { label: "Entradas Hoje", value: leadsRecentes, icon: Activity, desc: "Novos leads sincronizados hoje" },
    { label: "Fontes Ativas", value: new Set(leads.map(l => l.eventos)).size, icon: LayoutGrid, desc: "Diferentes origens de dados" },
    { label: "Último Sinc.", value: "Agora", icon: Calendar, desc: "Base de dados 100% atualizada" },
  ];

  if (loading) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center gap-3 text-muted-foreground animate-pulse">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="font-bold text-foreground">Sincronizando com Nexus Center</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-fade-in pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase italic text-primary">NEF Nexus</h1>
          <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest">Monitoramento Global de Leads</p>
        </div>
        <div className="flex items-center gap-2 bg-secondary/50 p-2 rounded-lg border">
          <Activity className="h-4 w-4 text-green-500 animate-pulse" />
          <span className="text-[10px] font-black uppercase">Sistema Online</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <div key={m.label} className="bg-background border border-border rounded-2xl p-6 space-y-4 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all group overflow-hidden relative">
            <div className="flex items-center justify-between relative z-10">
              <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary transition-colors">
                <m.icon className="h-5 w-5 text-primary group-hover:text-primary-foreground" />
              </div>
              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-tighter">{m.desc}</span>
            </div>
            <div className="space-y-1 relative z-10">
              <p className="text-4xl font-black tracking-tighter">{m.value}</p>
              <h2 className="text-xs font-bold text-muted-foreground uppercase opacity-70">{m.label}</h2>
            </div>
            <div className="absolute -bottom-4 -right-4 h-24 w-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-background border border-border rounded-3xl p-8 space-y-8 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-sm font-black uppercase tracking-widest text-primary">Volume de Prospecção</h2>
              <p className="text-xs text-muted-foreground">
                {tipoGrafico === 'origem' ? 'Distribuição por canal de origem' : 'Distribuição geográfica por estado'}
              </p>
            </div>
            <div className="flex bg-secondary/50 p-1 rounded-xl border">
              <button
                onClick={() => setTipoGrafico('origem')}
                className={`px-4 py-1.5 text-[10px] font-black uppercase rounded-lg transition-all ${tipoGrafico === 'origem' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Origem
              </button>
              <button
                onClick={() => setTipoGrafico('estado')}
                className={`px-4 py-1.5 text-[10px] font-black uppercase rounded-lg transition-all ${tipoGrafico === 'estado' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Estado
              </button>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tipoGrafico === 'origem'
                ? Array.from(new Set(leads.map(l => l.eventos))).map(ev => ({
                  name: ev || 'OUTROS',
                  total: leads.filter(l => l.eventos === ev).length
                }))
                : Array.from(new Set(leads.map(l => l.uf))).filter(Boolean).map(uf => ({
                  name: uf?.toUpperCase() || 'N/A',
                  total: leads.filter(l => l.uf === uf).length
                }))
              }>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(97 8% 90%)" />
                <XAxis dataKey="name" tick={{ fontSize: 10, fontWeight: 700, fill: "hsl(97 10% 45%)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "hsl(97 10% 45%)" }} axisLine={false} tickLine={false} />
                <Tooltip
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{
                    border: "none",
                    borderRadius: 12,
                    fontSize: 12,
                    fontWeight: 700,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                    textTransform: 'uppercase'
                  }}
                />
                <Bar dataKey="total" fill="hsl(var(--primary))" radius={[10, 10, 0, 0]} name="Leads" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-background border border-border rounded-3xl p-8 space-y-6 shadow-sm">
          <div className="space-y-1">
            <h2 className="text-sm font-black uppercase tracking-widest text-primary">Feed em Tempo Real</h2>
            <p className="text-xs text-muted-foreground">Últimas interações registradas</p>
          </div>
          <div className="space-y-4">
            {leads.slice(0, 6).map((lead) => (
              <div key={lead.id} className="flex items-start gap-4 p-4 hover:bg-secondary/40 rounded-2xl transition-all border border-transparent hover:border-border">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center font-black text-primary text-xs shrink-0">
                  {lead.nome?.substring(0, 2).toUpperCase()}
                </div>
                <div className="space-y-1 overflow-hidden">
                  <p className="text-sm font-black truncate">{lead.nome}</p>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold px-2 py-0.5 bg-secondary rounded w-fit">
                    {lead.eventos || 'Manual'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
