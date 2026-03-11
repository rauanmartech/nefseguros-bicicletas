import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import {
    Loader2,
    MessageSquare,
    Clock,
    Users,
    ArrowRight,
    GitBranch,
    CheckCircle2,
    XCircle,
    Hash
} from "lucide-react";
import { toast } from "sonner";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface CRMStage {
    id: string;
    name: string;
    description: string;
    stage_order: number;
}

interface CRMMessage {
    id: string;
    stage_id: string;
    message_text: string;
    delay_hours: number;
}

interface StageWithDetails extends CRMStage {
    lead_count: number;
    message?: CRMMessage;
}

const FluxoCRM = () => {
    const [stages, setStages] = useState<StageWithDetails[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            setLoading(true);

            const [
                { data: stagesData, error: stagesError },
                { data: messagesData, error: messagesError },
                { data: leadCounts, error: leadCountsError }
            ] = await Promise.all([
                supabase.from('crm_stages').select('*').order('stage_order', { ascending: true }),
                supabase.from('crm_messages').select('*'),
                supabase.from('lead_pipeline').select('stage_id')
            ]);

            if (stagesError) throw stagesError;
            if (messagesError) throw messagesError;
            if (leadCountsError) throw leadCountsError;

            const counts: Record<string, number> = {};
            leadCounts?.forEach(item => {
                counts[item.stage_id] = (counts[item.stage_id] || 0) + 1;
            });

            const combinedStages: StageWithDetails[] = (stagesData as CRMStage[]).map(stage => ({
                ...stage,
                lead_count: counts[stage.id] || 0,
                message: (messagesData as CRMMessage[]).find(m => m.stage_id === stage.id)
            }));

            setStages(combinedStages);
        } catch (error: any) {
            console.error("Erro ao carregar dados do CRM:", error.message);
            toast.error("Erro ao carregar estrutura do CRM.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Categorização das etapas para o layout horizontal
    const categorizacao = useMemo(() => {
        const inicial = stages.filter(s =>
            ['Lead Importado', 'Contato Iniciado', 'Follow-up 1', 'Último Contato'].includes(s.name)
        ).sort((a, b) => a.stage_order - b.stage_order);

        const qualificacao = stages.filter(s =>
            ['Lead Engajado', 'Qualificação', 'Segmentação', 'Valor da Bike', 'Simulação Solicitada', 'Proposta Enviada'].includes(s.name)
        ).sort((a, b) => a.stage_order - b.stage_order);

        const fechado = stages.find(s => s.name === 'Fechado');
        const perdido = stages.find(s => s.name === 'Perdido');

        return { inicial, qualificacao, fechado, perdido };
    }, [stages]);

    if (loading) {
        return (
            <div className="h-[80vh] flex flex-col items-center justify-center gap-3">
                <Loader2 className="h-10 w-10 animate-spin text-[#62BF04]" />
                <p className="font-bold text-[#3F5925] uppercase tracking-widest">Sincronizando Fluxograma Nexus...</p>
            </div>
        );
    }

    const StageNode = ({ stage, color = "#437314" }: { stage: StageWithDetails, color?: string }) => (
        <Tooltip key={stage.id}>
            <TooltipTrigger asChild>
                <div className="relative group">
                    <Card className="w-56 border-2 border-border hover:border-[#62BF04] transition-all cursor-pointer bg-white shadow-md rounded-xl overflow-hidden">
                        <div className="h-1" style={{ backgroundColor: color }} />
                        <CardHeader className="p-4 pb-2">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">
                                    #{stage.stage_order}
                                </span>
                                <div className="flex items-center gap-1 text-[#62BF04] font-black italic">
                                    <Users className="h-3 w-3" />
                                    <span className="text-[10px]">{stage.lead_count}</span>
                                </div>
                            </div>
                            <CardTitle className="text-xs font-black uppercase text-[#050703] leading-tight">
                                {stage.name}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                            <p className="text-[10px] text-muted-foreground line-clamp-2 font-medium">
                                {stage.description}
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-[300px] p-6 bg-[#050703] text-white border-none shadow-2xl rounded-2xl z-[100]">
                <div className="space-y-4">
                    <div className="space-y-1">
                        <p className="text-[9px] font-black uppercase text-[#62BF04] tracking-[0.2em]">Objetivo da Etapa</p>
                        <p className="text-[11px] leading-relaxed opacity-80 font-medium">{stage.description}</p>
                    </div>
                    {stage.message ? (
                        <div className="pt-4 border-t border-white/10 space-y-4">
                            <div className="space-y-2">
                                <p className="text-[9px] font-black uppercase text-[#62BF04] tracking-[0.2em]">Mensagem Automática</p>
                                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                                    <p className="text-[11px] italic opacity-90 leading-relaxed">"{stage.message.message_text}"</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-[9px] font-black uppercase text-[#62BF04] bg-[#62BF04]/10 w-fit px-3 py-1 rounded-full">
                                <Clock className="h-3 w-3" />
                                Trigger: {stage.message.delay_hours}h
                            </div>
                        </div>
                    ) : (
                        <div className="pt-2 border-t border-white/10">
                            <p className="text-[9px] font-black uppercase text-white/40 italic">Sem automação configurada</p>
                        </div>
                    )}
                </div>
            </TooltipContent>
        </Tooltip>
    );

    return (
        <TooltipProvider delayDuration={0}>
            <div className="min-h-screen bg-[#FDFDFD] p-8 space-y-12 animate-fade-in">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-1">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-[#62BF04] rounded-xl flex items-center justify-center shadow-lg shadow-[#62BF04]/20">
                                <GitBranch className="h-6 w-6 text-white" />
                            </div>
                            <h1 className="text-4xl font-black tracking-tighter uppercase italic text-[#050703]">
                                Nexus <span className="text-[#62BF04]">Flow</span>
                            </h1>
                        </div>
                        <p className="text-sm text-[#3F5925] font-bold uppercase tracking-[0.3em] opacity-60">Visualização Estratégica do Funil Comercial</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="px-5 py-2.5 bg-white border-2 border-[#62BF04]/20 rounded-2xl flex items-center gap-4 shadow-sm">
                            <div className="flex -space-x-1">
                                <div className="h-2 w-2 rounded-full bg-[#62BF04] animate-pulse" />
                            </div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-[#437314]">
                                Status: <span className="italic">Sincronizado</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CONTÊINER DO FLUXOGRAMA */}
                <div className="relative overflow-x-auto pb-20 custom-scrollbar">
                    <div className="inline-flex items-start gap-24 py-10 px-4 min-w-full">

                        {/* COLUNA 1: FLUXO INICIAL LINEAR */}
                        <div className="flex flex-col items-center gap-10 relative">
                            <div className="absolute -top-6 text-[10px] font-black uppercase tracking-[0.4em] text-[#3F5925] opacity-40">1. Contato Inicial</div>
                            {categorizacao.inicial.map((stage, idx) => (
                                <div key={stage.id} className="relative flex flex-col items-center">
                                    <StageNode stage={stage} />
                                    {idx < categorizacao.inicial.length - 1 && (
                                        <div className="h-10 w-0.5 bg-gradient-to-b from-[#62BF04] to-[#437314] opacity-30 mt-2 mb-2" />
                                    )}
                                </div>
                            ))}

                            {/* BIFURCAÇÃO APÓS ÚLTIMO CONTATO */}
                            <div className="relative w-full h-24">
                                {/* Linha vertical principal */}
                                <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-[#437314] opacity-20" />

                                {/* Conector para Lead Engajado (Direita - Centro) */}
                                <div className="absolute top-1/2 left-1/2 w-24 h-0.5 bg-[#62BF04] opacity-60" />
                                <div className="absolute top-1/2 left-[calc(50%+90px)] -translate-y-1/2">
                                    <div className="bg-[#62BF04] text-white text-[8px] font-black uppercase px-2 py-0.5 rounded shadow-sm whitespace-nowrap">
                                        SE RESPONDEU
                                    </div>
                                </div>

                                {/* Conector para Lead Perdido (Direita - Longe) */}
                                <svg className="absolute top-1/2 left-1/2 w-[800px] h-32 pointer-events-none opacity-20" style={{ transform: 'translateY(-1px)' }}>
                                    <path
                                        d="M 0 0 L 750 0 L 750 40"
                                        fill="none"
                                        stroke="#050703"
                                        strokeWidth="2"
                                        strokeDasharray="4 4"
                                    />
                                </svg>
                                <div className="absolute top-1/2 left-[calc(50%+400px)] -translate-y-[22px]">
                                    <div className="bg-[#050703] text-white text-[8px] font-black uppercase px-2 py-0.5 rounded shadow-sm whitespace-nowrap opacity-60">
                                        NÃO RESPONDEU
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* COLUNA 2: FLUXO DE QUALIFICAÇÃO */}
                        <div className="flex flex-col items-center gap-10 relative pt-32">
                            <div className="absolute top-24 text-[10px] font-black uppercase tracking-[0.4em] text-[#3F5925] opacity-40">2. Estratégia & Qualificação</div>
                            {categorizacao.qualificacao.map((stage, idx) => (
                                <div key={stage.id} className="relative flex flex-col items-center">
                                    <StageNode stage={stage} color="#62BF04" />

                                    {/* Seta para o próximo na qualificação */}
                                    {idx < categorizacao.qualificacao.length - 1 && (
                                        <div className="h-10 w-0.5 bg-[#62BF04] opacity-30 mt-2 mb-2" />
                                    )}

                                    {/* Seta para Lead Perdido (Saída de segurança) */}
                                    {['Qualificação', 'Proposta Enviada'].includes(stage.name) && (
                                        <div className="absolute -right-12 top-1/2 w-12 h-0.5 border-t-2 border-dashed border-[#050703] opacity-10" />
                                    )}
                                </div>
                            ))}

                            {/* Conector para Fechado */}
                            <div className="h-16 w-0.5 bg-gradient-to-b from-[#62BF04] to-[#437314] relative">
                                <ArrowRight className="absolute -bottom-6 -right-8 h-8 w-8 text-[#62BF04] rotate-45 opacity-20" />
                            </div>
                        </div>

                        {/* COLUNA 3: ESTÁGIOS FINAIS */}
                        <div className="flex flex-col gap-64 relative pt-64">
                            <div className="absolute top-56 text-[10px] font-black uppercase tracking-[0.4em] text-[#3F5925] opacity-40">3. Resultado Final</div>

                            {/* FECHADO (SUCESSO) */}
                            {categorizacao.fechado && (
                                <div className="relative group">
                                    <div className="absolute -inset-2 bg-[#62BF04]/10 rounded-2xl blur-xl group-hover:bg-[#62BF04]/20 transition-all" />
                                    <Card className="w-64 border-2 border-[#62BF04] bg-white shadow-xl relative z-10 overflow-hidden transform hover:scale-105 transition-all">
                                        <div className="h-1.5 bg-[#62BF04]" />
                                        <CardHeader className="p-6">
                                            <div className="flex justify-between items-center mb-4">
                                                <div className="h-10 w-10 rounded-full bg-[#62BF04]/10 flex items-center justify-center">
                                                    <CheckCircle2 className="h-6 w-6 text-[#62BF04]" />
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-[9px] font-black text-muted-foreground uppercase">Leads Convertidos</p>
                                                    <p className="text-2xl font-black text-[#050703]">{categorizacao.fechado.lead_count}</p>
                                                </div>
                                            </div>
                                            <CardTitle className="text-xl font-black uppercase text-[#050703] tracking-tighter">
                                                {categorizacao.fechado.name}
                                            </CardTitle>
                                            <p className="text-xs text-muted-foreground font-medium mt-2 leading-relaxed">
                                                {categorizacao.fechado.description}
                                            </p>
                                        </CardHeader>
                                    </Card>
                                </div>
                            )}

                            {/* PERDIDO (DESCARTE) */}
                            {categorizacao.perdido && (
                                <div className="relative group mt-auto">
                                    <Card className="w-64 border-2 border-[#050703]/10 bg-white/50 shadow-sm relative z-10 overflow-hidden grayscale hover:grayscale-0 transition-all">
                                        <div className="h-1.5 bg-[#050703]/20" />
                                        <CardHeader className="p-6">
                                            <div className="flex justify-between items-center mb-4">
                                                <div className="h-10 w-10 rounded-full bg-[#050703]/5 flex items-center justify-center">
                                                    <XCircle className="h-6 w-6 text-[#050703]/40" />
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-[9px] font-black text-muted-foreground uppercase">Leads Perdidos</p>
                                                    <p className="text-2xl font-black text-[#050703]/40">{categorizacao.perdido.lead_count}</p>
                                                </div>
                                            </div>
                                            <CardTitle className="text-xl font-black uppercase text-[#050703]/40 tracking-tighter">
                                                {categorizacao.perdido.name}
                                            </CardTitle>
                                            <p className="text-xs text-muted-foreground font-medium mt-2 leading-relaxed italic">
                                                {categorizacao.perdido.description}
                                            </p>
                                        </CardHeader>
                                    </Card>
                                </div>
                            )}
                        </div>

                    </div>
                </div>

                {/* LEGENDA / INFO */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 border-t border-[#050703]/5">
                    <div className="flex items-start gap-4 p-6 bg-white border rounded-3xl">
                        <div className="p-3 bg-[#62BF04]/10 rounded-2xl">
                            <Hash className="h-5 w-5 text-[#62BF04]" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-black uppercase tracking-widest text-[#3F5925]">Consultas Agregadas</p>
                            <p className="text-[11px] text-muted-foreground font-medium">Os volumes exibidos em cada nó são sincronizados em tempo real via Nexus Core Pipeline.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 p-6 bg-white border rounded-3xl">
                        <div className="p-3 bg-[#437314]/10 rounded-2xl">
                            <MessageSquare className="h-5 w-5 text-[#437314]" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-black uppercase tracking-widest text-[#3F5925]">Automação de Mensagens</p>
                            <p className="text-[11px] text-muted-foreground font-medium">Etapas com ícone de mensagem possuem réguas automáticas disparadas no WhatsApp/E-mail.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 p-6 bg-white border rounded-3xl">
                        <div className="p-3 bg-[#050703]/10 rounded-2xl">
                            <GitBranch className="h-5 w-5 text-[#050703]" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-black uppercase tracking-widest text-[#3F5925]">Modo Informativo</p>
                            <p className="text-[11px] text-muted-foreground font-medium">Esta interface é apenas para monitoramento do fluxo comercial. Alterações de dados são bloqueadas.</p>
                        </div>
                    </div>
                </div>
            </div>
        </TooltipProvider>
    );
};

export default FluxoCRM;
