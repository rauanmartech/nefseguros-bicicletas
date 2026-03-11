import { useState, useMemo, useEffect } from "react";
import { Search, Eye, ArrowUpDown, Loader2, RefreshCcw, ChevronLeft, ChevronRight, Fingerprint, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LeadModal } from "@/components/LeadModal";
import { type Lead } from "@/data/mockData";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const Leads = () => {
  const [filtroNome, setFiltroNome] = useState("");
  const [filtroCidade, setFiltroCidade] = useState("");
  const [sortField, setSortField] = useState<keyof Lead>("nome");
  const [sortAsc, setSortAsc] = useState(true);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalLead, setModalLead] = useState<Lead | null>(null);

  // Paginação
  const [paginaAtual, setPaginaAtual] = useState(1);
  const totalPorPagina = 100;
  const [pularPara, setPularPara] = useState("");

  const fetchLeads = async () => {
    try {
      setLoading(true);
      let todosLeads: Lead[] = [];
      let deuErro = false;
      let inicio = 0;
      const tamanhoBloco = 1000;

      while (true) {
        const { data, error } = await supabase
          .from('leads')
          .select('*')
          .range(inicio, inicio + tamanhoBloco - 1)
          .order('nome', { ascending: true });

        if (error) {
          deuErro = true;
          break;
        }

        if (!data || data.length === 0) break;

        todosLeads = [...todosLeads, ...data];

        if (data.length < tamanhoBloco) break;
        inicio += tamanhoBloco;
      }

      if (deuErro) throw new Error("Falha na sincronização parcial");

      setLeads(todosLeads);
    } catch (error) {
      console.error("Erro ao carregar leads:", (error as Error).message);
      toast.error("Erro ao conectar com a base do NEF Nexus.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // Resetar página ao filtrar para garantir pesquisa global
  useEffect(() => {
    setPaginaAtual(1);
  }, [filtroNome, filtroCidade]);

  const filtered = useMemo(() => {
    let result = [...leads];

    if (filtroNome) {
      const q = filtroNome.toLowerCase();
      result = result.filter((l) =>
        l.nome?.toLowerCase().includes(q) ||
        l.docto_identificacao?.includes(q)
      );
    }

    if (filtroCidade) {
      const q = filtroCidade.toLowerCase();
      result = result.filter((l) =>
        l.cidade?.toLowerCase().includes(q) ||
        l.uf?.toLowerCase().includes(q)
      );
    }

    result.sort((a: Lead, b: Lead) => {
      const valA = String(a[sortField] || "");
      const valB = String(b[sortField] || "");
      return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });

    return result;
  }, [leads, filtroNome, filtroCidade, sortField, sortAsc]);

  const totalPaginas = Math.ceil(filtered.length / totalPorPagina);

  const leadsPaginados = useMemo(() => {
    const inicio = (paginaAtual - 1) * totalPorPagina;
    return filtered.slice(inicio, inicio + totalPorPagina);
  }, [filtered, paginaAtual]);

  const handleIrParaPagina = (e: React.FormEvent) => {
    e.preventDefault();
    const pag = parseInt(pularPara);
    if (!isNaN(pag) && pag >= 1 && pag <= totalPaginas) {
      setPaginaAtual(pag);
      setPularPara("");
    } else {
      toast.error(`Página inválida. Escolha entre 1 e ${totalPaginas}`);
    }
  };

  const toggleSort = (field: keyof Lead) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gestão de Leads</h1>
          <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium opacity-70">Estrutura Nexus CRM</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold border border-primary/20">
            {leads.length} REGISTROS
          </span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Pesquisar por Nome ou Documento..."
            value={filtroNome}
            onChange={(e) => setFiltroNome(e.target.value)}
            className="pl-9 h-11 bg-background"
          />
        </div>
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Filtrar por Cidade ou UF..."
            value={filtroCidade}
            onChange={(e) => setFiltroCidade(e.target.value)}
            className="pl-9 h-11 bg-background"
          />
        </div>
        <Button onClick={fetchLeads} variant="outline" className="h-11 gap-2 shrink-0">
          <RefreshCcw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Sincronizar
        </Button>
      </div>

      <div className="border border-border rounded-xl overflow-hidden bg-background shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/30 text-left text-muted-foreground">
                <th className="p-4 font-semibold cursor-pointer select-none hover:text-foreground transition-colors group" onClick={() => toggleSort('nome')}>
                  <div className="flex items-center gap-2">
                    Nome
                    <ArrowUpDown className={`h-3 w-3 ${sortField === 'nome' ? 'text-primary' : 'opacity-20'}`} />
                  </div>
                </th>
                <th className="p-4 font-semibold">Celular</th>
                <th className="p-4 font-semibold">Email</th>
                <th className="p-4 font-semibold cursor-pointer select-none hover:text-foreground transition-colors group" onClick={() => toggleSort('cidade')}>
                  <div className="flex items-center gap-2">
                    Cidade
                    <ArrowUpDown className={`h-3 w-3 ${sortField === 'cidade' ? 'text-primary' : 'opacity-20'}`} />
                  </div>
                </th>
                <th className="p-4 font-semibold text-center w-16">UF</th>
                <th className="p-4 font-semibold">Eventos</th>
                <th className="p-4 font-semibold text-center w-20">Ações</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="p-20 text-center text-muted-foreground">
                    <div className="flex flex-col items-center gap-2">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      <p className="text-sm font-bold uppercase tracking-widest mt-2">Acessando Base de Dados...</p>
                    </div>
                  </td>
                </tr>
              ) : leadsPaginados.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-20 text-center text-muted-foreground">
                    <p className="text-sm font-medium">Nenhum registro encontrado para esta busca.</p>
                  </td>
                </tr>
              ) : (
                leadsPaginados.map((lead) => (
                  <tr key={lead.id} className="border-b border-border last:border-0 hover:bg-secondary/20 transition-all group">
                    <td className="p-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-foreground leading-tight">{lead.nome || '—'}</span>
                        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground mt-1 uppercase font-bold tracking-tighter">
                          <Fingerprint className="h-2.5 w-2.5 opacity-50" />
                          {lead.docto_identificacao || 'SEM DOCUMENTO'}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-medium text-primary/80">
                      {lead.celular || lead.telefone || '—'}
                    </td>
                    <td className="p-4 text-muted-foreground">
                      {lead.email || '—'}
                    </td>
                    <td className="p-4">
                      {lead.cidade || '—'}
                    </td>
                    <td className="p-4 text-center font-bold text-xs">
                      <span className="bg-secondary px-2 py-0.5 rounded border border-border">
                        {lead.uf || '—'}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="inline-block px-2 py-0.5 text-[10px] font-black uppercase rounded bg-primary text-primary-foreground">
                        {lead.eventos || 'SISTEMA'}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-primary hover:text-primary-foreground rounded-full"
                        onClick={() => setModalLead(lead)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Paginação */}
      {totalPaginas > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-secondary/10 p-4 rounded-xl border border-border">
          <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
            Página {paginaAtual} de {totalPaginas}
            <span className="ml-2 opacity-50">({filtered.length} leads filtrados)</span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9"
              onClick={() => setPaginaAtual(p => Math.max(1, p - 1))}
              disabled={paginaAtual === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <form onSubmit={handleIrParaPagina} className="flex items-center gap-2">
              <Input
                type="number"
                placeholder="Ir p/..."
                value={pularPara}
                onChange={(e) => setPularPara(e.target.value)}
                className="w-20 h-9 text-center text-xs font-bold"
              />
              <Button type="submit" variant="secondary" size="sm" className="h-9 font-bold text-[10px] uppercase">
                IR
              </Button>
            </form>

            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9"
              onClick={() => setPaginaAtual(p => Math.min(totalPaginas, p + 1))}
              disabled={paginaAtual === totalPaginas}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      <LeadModal
        lead={modalLead}
        open={!!modalLead}
        onOpenChange={(o) => !o && setModalLead(null)}
      />
    </div>
  );
};

export default Leads;
