import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { User, Phone, Mail, MapPin, Calendar, CheckCircle2, Bike, HelpCircle, AlertCircle, Bookmark } from "lucide-react";
import logoCropado from "../assets/logo-cropado.webp";

export interface LeadBike {
    id: string;
    created_at: string;
    nome_completo: string;
    whatsapp: string;
    email: string | null;
    cidade: string;
    estado_uf: string;
    possui_bicicleta: string;
    valor_bicicleta: string | null;
    tipo_pedal: string | null;
    possui_seguro: string | null;
    interesse_simulacao: string | null;
    marca_modelo_bicicleta: string | null;
}

interface LeadBikeModalProps {
    lead: LeadBike | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function LeadBikeModal({ lead, open, onOpenChange }: LeadBikeModalProps) {
    if (!lead) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden bg-background border-border shadow-2xl rounded-xl">
                <DialogHeader className="px-6 py-6 border-b border-border bg-secondary/30 relative overflow-hidden">
                    <div className="absolute top-0 right-0 h-full w-1/2 overflow-hidden rounded-tr-xl pointer-events-none flex items-center justify-end">
                        <img src={logoCropado} alt="" className="w-64 h-64 object-contain opacity-[0.04] -rotate-12 translate-x-12 mix-blend-multiply" />
                    </div>

                    <div className="flex items-center gap-5 relative z-10 w-full">
                        <div className="h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 shrink-0">
                            <User className="h-7 w-7 text-primary" />
                        </div>
                        <div className="flex flex-col justify-center">
                            <DialogTitle className="text-2xl font-bold flex items-center gap-2 leading-none">
                                Ficha do Lead (Site)
                            </DialogTitle>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                                <Calendar className="h-4 w-4" />
                                Capturado em: {format(new Date(lead.created_at), "dd 'de' MMM, yyyy 'às' HH:mm", { locale: ptBR })}
                            </div>
                        </div>
                    </div>
                </DialogHeader>

                <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Identificação */}
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground uppercase opacity-70 tracking-wider">Nome</p>
                                    <p className="font-bold text-foreground text-lg">{lead.nome_completo}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground uppercase opacity-70 tracking-wider">WhatsApp</p>
                                    <p className="font-semibold text-foreground">{lead.whatsapp}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground uppercase opacity-70 tracking-wider">Email</p>
                                    <p className="font-medium text-foreground">{lead.email || 'Não informado'}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground uppercase opacity-70 tracking-wider">Localização</p>
                                    <p className="font-medium text-foreground">{lead.cidade} - {lead.estado_uf}</p>
                                </div>
                            </div>
                        </div>

                        {/* Bicicleta */}
                        <div className="space-y-4 bg-secondary/20 p-4 rounded-xl border border-border">
                            <h3 className="font-bold text-sm uppercase text-primary tracking-widest border-b border-border/50 pb-2 mb-3">Informações da Bicicleta</h3>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Possui Bicicleta?</p>
                                    <span className="inline-block px-2 py-0.5 bg-background border border-border rounded text-xs font-semibold shadow-sm">
                                        {lead.possui_bicicleta}
                                    </span>
                                </div>

                                <div>
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Valor</p>
                                    <span className="font-medium text-sm text-foreground">
                                        {lead.valor_bicicleta || '—'}
                                    </span>
                                </div>

                                <div className="col-span-2">
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Tipo de Pedal</p>
                                    <span className="font-medium text-sm text-foreground">
                                        {lead.tipo_pedal || '—'}
                                    </span>
                                </div>

                                <div className="col-span-2">
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Marca / Modelo</p>
                                    <span className="font-medium text-sm text-foreground bg-background px-2 py-1 rounded inline-block border border-border/50">
                                        {lead.marca_modelo_bicicleta || 'Não informado'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-primary/5 p-4 rounded-xl border border-primary/20 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center shadow-sm shrink-0">
                                <Bookmark className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-0.5">Status de Seguro</p>
                                <p className="font-bold text-sm">{lead.possui_seguro || 'Não informado'}</p>
                            </div>
                        </div>

                        <div className="h-10 w-px bg-border hidden md:block"></div>

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center shadow-sm shrink-0">
                                <HelpCircle className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-0.5">Interesse em Simulação</p>
                                <p className="font-bold text-sm">{lead.interesse_simulacao || 'Não informado'}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </DialogContent>
        </Dialog>
    );
}
