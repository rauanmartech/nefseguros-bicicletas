import { useState, useMemo, useEffect } from "react";
import { Search, Eye, ArrowUpDown, Loader2, RefreshCcw, ChevronLeft, ChevronRight, User, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LeadBikeModal, type LeadBike } from "@/components/LeadBikeModal";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const LeadsBike = () => {
    const [filtroNome, setFiltroNome] = useState("");
    const [filtroCidade, setFiltroCidade] = useState("");
    const [sortField, setSortField] = useState<keyof LeadBike>("created_at");
    const [sortAsc, setSortAsc] = useState(false);
    const [leads, setLeads] = useState<LeadBike[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalLead, setModalLead] = useState<LeadBike | null>(null);

    // Paginação
    const [paginaAtual, setPaginaAtual] = useState(1);
    const totalPorPagina = 50;
    const [pularPara, setPularPara] = useState("");

    const fetchLeads = async () => {
        try {
            setLoading(true);
            let todosLeads: LeadBike[] = [];
            let deuErro = false;
            let inicio = 0;
            const tamanhoBloco = 1000;

            while (true) {
                const { data, error } = await supabase
                    .from('leads_bike_seguro')
                    .select('*')
                    .range(inicio, inicio + tamanhoBloco - 1)
                    .order('created_at', { ascending: false });

                if (error) {
                    deuErro = true;
                    break;
                }

                if (!data || data.length === 0) break;

                todosLeads = [...todosLeads, ...data];

                if (data.length < tamanhoBloco) break;
                inicio += tamanhoBloco;
            }

            if (deuErro) throw new Error("Falha na sincronização");

            setLeads(todosLeads);
        } catch (error) {
            console.error("Erro ao carregar leads do site:", (error as Error).message);
            toast.error("Erro ao conectar com a base de leads do site.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeads();
    }, []);

    useEffect(() => {
        setPaginaAtual(1);
    }, [filtroNome, filtroCidade]);

    const filtered = useMemo(() => {
        let result = [...leads];

        if (filtroNome) {
            const q = filtroNome.toLowerCase();
            result = result.filter((l) =>
                l.nome_completo?.toLowerCase().includes(q) ||
                l.whatsapp?.toLowerCase().includes(q)
            );
        }

        if (filtroCidade) {
            const q = filtroCidade.toLowerCase();
            result = result.filter((l) =>
                l.cidade?.toLowerCase().includes(q) ||
                l.estado_uf?.toLowerCase().includes(q)
            );
        }

        result.sort((a: LeadBike, b: LeadBike) => {
            let valA = a[sortField];
            let valB = b[sortField];

            // Handle raw strings for sorting
            if (typeof valA === 'string') valA = valA.toLowerCase();
            if (typeof valB === 'string') valB = valB.toLowerCase();

            // Fallback for nulls
            valA = valA || "";
            valB = valB || "";

            if (valA < valB) return sortAsc ? -1 : 1;
            if (valA > valB) return sortAsc ? 1 : -1;
            return 0;
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

    const toggleSort = (field: keyof LeadBike) => {
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
                    <h1 className="text-2xl font-bold tracking-tight">Leads do Site <span className="text-muted-foreground text-sm font-normal ml-2 tracking-normal">(Seguro Bike)</span></h1>
                    <p className="text-sm text-primary uppercase tracking-wider font-bold opacity-80 mt-1">Captação via Landing Page</p>
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
                        placeholder="Pesquisar por Nome ou WhatsApp..."
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
                                <th className="p-4 font-semibold cursor-pointer select-none hover:text-foreground transition-colors group" onClick={() => toggleSort('created_at')}>
                                    <div className="flex items-center gap-2">
                                        Data Registro
                                        <ArrowUpDown className={`h-3 w-3 ${sortField === 'created_at' ? 'text-primary' : 'opacity-20'}`} />
                                    </div>
                                </th>
                                <th className="p-4 font-semibold cursor-pointer select-none hover:text-foreground transition-colors group" onClick={() => toggleSort('nome_completo')}>
                                    <div className="flex items-center gap-2">
                                        Nome / Contato
                                        <ArrowUpDown className={`h-3 w-3 ${sortField === 'nome_completo' ? 'text-primary' : 'opacity-20'}`} />
                                    </div>
                                </th>
                                <th className="p-4 font-semibold cursor-pointer select-none hover:text-foreground transition-colors group" onClick={() => toggleSort('cidade')}>
                                    <div className="flex items-center gap-2">
                                        Localização
                                        <ArrowUpDown className={`h-3 w-3 ${sortField === 'cidade' ? 'text-primary' : 'opacity-20'}`} />
                                    </div>
                                </th>
                                <th className="p-4 font-semibold hidden md:table-cell">Bicicleta</th>
                                <th className="p-4 font-semibold text-center w-20">Ficha</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="p-20 text-center text-muted-foreground">
                                        <div className="flex flex-col items-center gap-2">
                                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                            <p className="text-sm font-bold uppercase tracking-widest mt-2">Carregando Novas Captações...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : leadsPaginados.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-20 text-center text-muted-foreground">
                                        <p className="text-sm font-medium">Nenhum registro encontrado.</p>
                                    </td>
                                </tr>
                            ) : (
                                leadsPaginados.map((lead) => (
                                    <tr key={lead.id} className="border-b border-border last:border-0 hover:bg-secondary/20 transition-all group">
                                        <td className="p-4">
                                            <span className="font-semibold text-foreground">
                                                {format(new Date(lead.created_at), "dd/MM/yyyy", { locale: ptBR })}
                                            </span>
                                            <div className="text-xs text-muted-foreground font-medium mt-0.5">
                                                {format(new Date(lead.created_at), "HH:mm", { locale: ptBR })}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-foreground truncate max-w-[200px]">{lead.nome_completo}</span>
                                                <span className="text-xs text-primary font-medium mt-0.5 opacity-90">{lead.whatsapp}</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className="font-medium">{lead.cidade}</span>
                                            <span className="ml-2 text-xs font-bold px-1.5 py-0.5 rounded border border-border bg-secondary/50 text-muted-foreground uppercase">{lead.estado_uf}</span>
                                        </td>
                                        <td className="p-4 hidden md:table-cell">
                                            <div className="flex flex-col items-start">
                                                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded mb-1 ${lead.possui_bicicleta === 'Sim' ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-secondary text-muted-foreground'}`}>{lead.possui_bicicleta === 'Sim' ? 'Tem Bike' : lead.possui_bicicleta}</span>
                                                {lead.tipo_pedal && (
                                                    <span className="text-xs text-muted-foreground font-medium truncate max-w-[150px]">{lead.tipo_pedal}</span>
                                                )}
                                            </div>
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

            <LeadBikeModal
                lead={modalLead}
                open={!!modalLead}
                onOpenChange={(o) => !o && setModalLead(null)}
            />
        </div>
    );
};

export default LeadsBike;
