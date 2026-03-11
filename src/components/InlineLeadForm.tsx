import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { ChevronRight, ChevronLeft, CheckCircle2, ArrowRight } from 'lucide-react';

const UFs = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

export const InlineLeadForm: React.FC = () => {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        nome_completo: '',
        whatsapp: '',
        email: '',
        aniversario: '',
        cidade: '',
        estado_uf: '',
        possui_bicicleta: '',
        valor_bicicleta: '',
        tipo_pedal: '',
        marca_modelo_bicicleta: '',
        possui_seguro: '',
        interesse_simulacao: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(null);
    };

    const handleRadioChange = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value });
        setError(null);
    };

    const validateStep1 = () => {
        if (!formData.nome_completo.trim() || !formData.whatsapp.trim() || !formData.cidade.trim() || !formData.estado_uf) {
            setError('Por favor, preencha todos os campos obrigatórios (*).');
            return false;
        }
        return true;
    };

    const validateStep2 = () => {
        if (!formData.possui_bicicleta) {
            setError('Por favor, informe se você possui bicicleta.');
            return false;
        }
        return true;
    };

    const handleNext = () => {
        if (step === 1 && !validateStep1()) return;
        if (step === 2 && !validateStep2()) return;
        setStep(prev => prev + 1);
    };

    const handlePrev = () => {
        setStep(prev => prev - 1);
        setError(null);
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        try {
            const { error: dbError } = await supabase
                .from('leads_bike_seguro')
                .insert([{
                    nome_completo: formData.nome_completo,
                    whatsapp: formData.whatsapp,
                    email: formData.email || null,
                    cidade: formData.cidade,
                    estado_uf: formData.estado_uf,
                    possui_bicicleta: formData.possui_bicicleta,
                    valor_bicicleta: formData.valor_bicicleta || null,
                    tipo_pedal: formData.tipo_pedal || null,
                    marca_modelo_bicicleta: formData.marca_modelo_bicicleta || null,
                    possui_seguro: formData.possui_seguro || null,
                    interesse_simulacao: formData.interesse_simulacao || null,
                    aniversario: formData.aniversario || null,
                }]);

            if (dbError) throw dbError;

            setIsSuccess(true);
            setTimeout(() => {
                setIsSuccess(false);
                setStep(1);
                setFormData({
                    nome_completo: '', whatsapp: '', email: '', cidade: '', estado_uf: '',
                    possui_bicicleta: '', valor_bicicleta: '', tipo_pedal: '', marca_modelo_bicicleta: '',
                    possui_seguro: '', interesse_simulacao: '', aniversario: ''
                });
            }, 6000);

        } catch (err) {
            console.error(err);
            setError('Ocorreu um erro ao enviar suas informações. Tente novamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl w-full flex flex-col items-center justify-center text-center py-20 animate-in fade-in duration-500">
                <div className="w-20 h-20 bg-[#62BF04]/20 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-[#62BF04]" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4 drop-shadow-md">Tudo Certo!</h3>
                <p className="text-white/90 text-lg font-medium tracking-wide">
                    Nossos especialistas vão analisar seu perfil e entrarão em contato em breve via WhatsApp.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-6 md:p-8 rounded-[2rem] shadow-2xl w-full relative overflow-hidden flex flex-col font-sans">
            {/* Efeito de brilho de fundo */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[80px] rounded-full pointer-events-none"></div>

            <div className="mb-4 relative z-10 text-center">
                <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-md">Solicite a sua simulação</h3>
                <p className="text-white/80 text-sm font-medium">Leva menos de 1 minuto em 3 passos simples.</p>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-white/10 rounded-full mb-6 relative z-10 overflow-hidden">
                <div
                    className="h-full bg-primary transition-all duration-500 ease-out shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                    style={{ width: `${(step / 3) * 100}%` }}
                ></div>
            </div>

            <div className="relative z-10 flex flex-col gap-5 min-h-[320px]">
                {step === 1 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="flex items-center gap-2 mb-2 border-b border-white/10 pb-2">
                            <span className="bg-primary/20 text-primary px-2 py-0.5 rounded text-xs font-bold ring-1 ring-primary/30">1</span>
                            <h3 className="font-semibold text-white text-sm uppercase tracking-wider">Identificação</h3>
                        </div>

                        <div>
                            <input type="text" name="nome_completo" value={formData.nome_completo} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-white/80 border-none focus:bg-white focus:ring-2 focus:ring-primary outline-none text-slate-900 font-medium placeholder:text-slate-500 transition-all shadow-inner" placeholder="Nome completo *" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-white/80 border-none focus:bg-white focus:ring-2 focus:ring-primary outline-none text-slate-900 font-medium placeholder:text-slate-500 transition-all shadow-inner" placeholder="WhatsApp *" />
                            </div>
                            <div className="relative">
                                <label className="absolute -top-2 left-3 bg-primary text-slate-900 px-2 text-[10px] font-bold rounded-sm z-10">Data Nasc.</label>
                                <input type="date" name="aniversario" value={formData.aniversario} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-white/80 border-none focus:bg-white focus:ring-2 focus:ring-primary outline-none text-slate-900 font-medium transition-all shadow-inner text-sm text-slate-500 placeholder:text-slate-500 relative" />
                            </div>
                        </div>

                        <div>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-white/80 border-none focus:bg-white focus:ring-2 focus:ring-primary outline-none text-slate-900 font-medium placeholder:text-slate-500 transition-all shadow-inner" placeholder="Email (opcional)" />
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-2">
                                <input type="text" name="cidade" value={formData.cidade} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-white/80 border-none focus:bg-white focus:ring-2 focus:ring-primary outline-none text-slate-900 font-medium placeholder:text-slate-500 transition-all shadow-inner" placeholder="Sua Cidade *" />
                            </div>
                            <div className="col-span-1">
                                <select name="estado_uf" value={formData.estado_uf} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-white/80 border-none focus:bg-white focus:ring-2 focus:ring-primary outline-none text-slate-900 font-medium transition-all shadow-inner appearance-none">
                                    <option value="" disabled>UF *</option>
                                    {UFs.map(uf => <option key={uf} value={uf}>{uf}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="flex items-center gap-2 mb-2 border-b border-white/10 pb-2">
                            <span className="bg-primary/20 text-primary px-2 py-0.5 rounded text-xs font-bold ring-1 ring-primary/30">2</span>
                            <h3 className="font-semibold text-white text-sm uppercase tracking-wider">Sua Bicicleta</h3>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-white/90 mb-2">Você possui bicicleta atualmente? *</label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                {['Sim', 'Não', 'Pretendo comprar'].map(option => (
                                    <label key={option} className={`flex items-center justify-center p-2.5 rounded-xl border cursor-pointer transition-all ${formData.possui_bicicleta === option ? 'border-primary bg-primary/20 ring-1 ring-primary' : 'border-white/20 bg-white/5 hover:bg-white/10'}`}>
                                        <input type="radio" name="possui_bicicleta" value={option} checked={formData.possui_bicicleta === option} onChange={() => handleRadioChange('possui_bicicleta', option)} className="sr-only" />
                                        <span className={`text-sm font-bold ${formData.possui_bicicleta === option ? 'text-white drop-shadow-md' : 'text-white/70'}`}>{option}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <select name="valor_bicicleta" value={formData.valor_bicicleta} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-white/80 border-none focus:bg-white focus:ring-2 focus:ring-primary outline-none text-slate-900 font-medium transition-all shadow-inner appearance-none">
                                <option value="" disabled>Valor aprox. da bike</option>
                                <option value="Até R$ 2.000">Até R$ 2.000</option>
                                <option value="R$ 2.000 – R$ 5.000">R$ 2.000 – R$ 5.000</option>
                                <option value="R$ 5.000 – R$ 10.000">R$ 5.000 – R$ 10.000</option>
                                <option value="Acima de R$ 10.000">Acima de R$ 10.000</option>
                            </select>
                        </div>

                        <div>
                            <select name="tipo_pedal" value={formData.tipo_pedal} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-white/80 border-none focus:bg-white focus:ring-2 focus:ring-primary outline-none text-slate-900 font-medium transition-all shadow-inner appearance-none">
                                <option value="" disabled>Tipo de pedal frequente</option>
                                <option value="MTB / trilha">MTB / trilha</option>
                                <option value="Estrada / speed">Estrada / speed</option>
                                <option value="Urbano / deslocamento">Urbano / deslocamento</option>
                                <option value="Gravel / misto">Gravel / misto</option>
                            </select>
                        </div>

                        <div>
                            <input type="text" name="marca_modelo_bicicleta" value={formData.marca_modelo_bicicleta} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-white/80 border-none focus:bg-white focus:ring-2 focus:ring-primary outline-none text-slate-900 font-medium placeholder:text-slate-500 transition-all shadow-inner" placeholder="Marca/modelo da bike (opcional)" />
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="flex items-center gap-2 mb-2 border-b border-white/10 pb-2">
                            <span className="bg-primary/20 text-primary px-2 py-0.5 rounded text-xs font-bold ring-1 ring-primary/30">3</span>
                            <h3 className="font-semibold text-white text-sm uppercase tracking-wider">Seguro</h3>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-white/90 mb-3">Você já possui seguro para sua bicicleta?</label>
                            <div className="space-y-2">
                                {['Não tenho seguro', 'Já tenho seguro', 'Já tive seguro'].map(option => (
                                    <label key={option} className={`flex items-center p-3 rounded-xl border cursor-pointer transition-all ${formData.possui_seguro === option ? 'border-primary bg-primary/20 ring-1 ring-primary' : 'border-white/20 bg-white/5 hover:bg-white/10'}`}>
                                        <input type="radio" name="possui_seguro" value={option} checked={formData.possui_seguro === option} onChange={() => handleRadioChange('possui_seguro', option)} className="sr-only" />
                                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center mr-3 ${formData.possui_seguro === option ? 'border-primary' : 'border-white/30'}`}>
                                            {formData.possui_seguro === option && <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_5px_rgba(34,197,94,1)]"></div>}
                                        </div>
                                        <span className={`text-sm font-bold ${formData.possui_seguro === option ? 'text-white' : 'text-white/70'}`}>{option}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-white/90 mb-3">Interesse em simulação gratuita?</label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                {['Sim', 'Talvez', 'Apenas infos'].map(option => (
                                    <label key={option} className={`flex items-center justify-center p-2.5 text-center rounded-xl border cursor-pointer transition-all ${formData.interesse_simulacao === option ? 'border-primary bg-primary/20 ring-1 ring-primary' : 'border-white/20 bg-white/5 hover:bg-white/10'}`}>
                                        <input type="radio" name="interesse_simulacao" value={option} checked={formData.interesse_simulacao === option} onChange={() => handleRadioChange('interesse_simulacao', option)} className="sr-only" />
                                        <span className={`text-xs font-bold ${formData.interesse_simulacao === option ? 'text-white' : 'text-white/70'}`}>{option}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="bg-red-500/20 text-red-100 p-3 rounded-xl text-sm font-semibold border border-red-500/30 animate-in fade-in backdrop-blur-md">
                        {error}
                    </div>
                )}

            </div>

            {/* Navegação */}
            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 relative z-10 w-full">
                {step > 1 ? (
                    <button
                        type="button"
                        onClick={handlePrev}
                        className="flex items-center text-white/70 hover:text-white font-semibold px-2 py-2 transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5 mr-1" /> Voltar
                    </button>
                ) : <div />}

                {step < 3 ? (
                    <button
                        type="button"
                        onClick={handleNext}
                        className="flex items-center bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md active:scale-95 ml-auto border border-white/20"
                    >
                        Próximo <ChevronRight className="w-5 h-5 ml-1" />
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="flex items-center justify-center bg-primary hover:bg-white hover:text-slate-900 text-white font-extrabold text-sm md:text-base py-3 md:py-4 px-6 md:px-8 rounded-xl transition-all duration-300 shadow-[0_10px_30px_rgba(34,197,94,0.3)] hover:shadow-white/30 disabled:opacity-70 group ml-auto grow sm:grow-0"
                    >
                        {isSubmitting ? (
                            <span className="flex items-center"><svg className="animate-spin -ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Enviando...</span>
                        ) : (
                            <>
                                ENVIAR DADOS
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                )}
            </div>

        </div>
    );
};
