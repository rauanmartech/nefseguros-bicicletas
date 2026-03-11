import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { X, ChevronRight, ChevronLeft, CheckCircle2, ShieldCheck } from 'lucide-react';

interface LeadCaptureModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const UFs = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

export const LeadCaptureModal: React.FC<LeadCaptureModalProps> = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        nome_completo: '',
        whatsapp: '',
        email: '',
        cidade: '',
        estado_uf: '',
        possui_bicicleta: '',
        valor_bicicleta: '',
        tipo_pedal: '',
        marca_modelo_bicicleta: '',
        possui_seguro: '',
        interesse_simulacao: '',
        aniversario: ''
    });

    if (!isOpen) return null;

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) onClose();
    };

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

    const handleSubmit = async () => {
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
                onClose();
                // Reset form after closing
                setTimeout(() => {
                    setStep(1);
                    setIsSuccess(false);
                    setFormData({
                        nome_completo: '', whatsapp: '', email: '', cidade: '', estado_uf: '',
                        possui_bicicleta: '', valor_bicicleta: '', tipo_pedal: '', marca_modelo_bicicleta: '',
                        possui_seguro: '', interesse_simulacao: '', aniversario: ''
                    });
                }, 500);
            }, 3000);

        } catch (err: any) {
            console.error(err);
            setError('Ocorreu um erro ao enviar suas informações. Tente novamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto"
            onClick={handleOverlayClick}
        >
            <div
                className="bg-white rounded-2xl shadow-2xl w-full max-w-[520px] relative overflow-hidden flex flex-col font-sans animate-in fade-in zoom-in duration-300 m-auto"
                role="dialog"
            >
                {/* Header */}
                <div className="pt-8 pb-4 px-6 md:px-8 border-b border-gray-100 relative">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors p-2 rounded-full hover:bg-gray-100"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <div className="flex items-center justify-center mb-3">
                        <div className="w-10 h-10 bg-[#62BF04]/10 rounded-full flex items-center justify-center text-[#62BF04]">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-center text-[#050703] leading-tight mb-2">
                        Receba uma simulação gratuita de proteção para sua bicicleta
                    </h2>
                    <p className="text-center text-sm text-[#3F5925] font-medium">Leva menos de 1 minuto.</p>
                </div>

                {/* Progress Bar */}
                {!isSuccess && (
                    <div className="w-full h-1.5 bg-gray-100">
                        <div
                            className="h-full bg-[#62BF04] transition-all duration-500 ease-out"
                            style={{ width: `${(step / 3) * 100}%` }}
                        ></div>
                    </div>
                )}

                {/* Content */}
                <div className="p-6 md:px-8 pb-8">
                    {isSuccess ? (
                        <div className="text-center py-10 animate-in fade-in zoom-in duration-500">
                            <div className="w-20 h-20 bg-[#62BF04]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle2 className="w-10 h-10 text-[#62BF04]" />
                            </div>
                            <h3 className="text-2xl font-bold text-[#050703] mb-3">Tudo certo!</h3>
                            <p className="text-gray-600">
                                Agradecemos o seu interesse. Nossos especialistas entrarão em contato em breve via WhatsApp com a sua simulação personalizada.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-6 relative min-h-[300px]">

                            {/* Form Phases */}
                            {step === 1 && (
                                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                                    <h3 className="font-semibold text-[#437314] text-sm uppercase tracking-wider mb-4 border-b pb-2">Passo 1: Identificação</h3>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Nome completo *</label>
                                        <input type="text" name="nome_completo" value={formData.nome_completo} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#62BF04] focus:ring-2 focus:ring-[#62BF04]/20 outline-none transition-all placeholder:text-gray-400 text-gray-800 font-medium" placeholder="Como devemos te chamar?" />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">WhatsApp *</label>
                                            <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#62BF04] focus:ring-2 focus:ring-[#62BF04]/20 outline-none transition-all placeholder:text-gray-400 text-gray-800 font-medium" placeholder="(00) 00000-0000" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">Data de Aniversário</label>
                                            <input type="date" name="aniversario" value={formData.aniversario} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#62BF04] focus:ring-2 focus:ring-[#62BF04]/20 outline-none transition-all text-gray-800 font-medium" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Email <span className="font-normal text-gray-400">(opcional)</span></label>
                                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#62BF04] focus:ring-2 focus:ring-[#62BF04]/20 outline-none transition-all placeholder:text-gray-400 text-gray-800 font-medium" placeholder="seu@email.com" />
                                    </div>

                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="col-span-2">
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">Cidade *</label>
                                            <input type="text" name="cidade" value={formData.cidade} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#62BF04] focus:ring-2 focus:ring-[#62BF04]/20 outline-none transition-all placeholder:text-gray-400 text-gray-800 font-medium" placeholder="Sua cidade" />
                                        </div>
                                        <div className="col-span-1">
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">UF *</label>
                                            <select name="estado_uf" value={formData.estado_uf} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#62BF04] focus:ring-2 focus:ring-[#62BF04]/20 outline-none transition-all text-gray-800 font-medium bg-white">
                                                <option value="">--</option>
                                                {UFs.map(uf => <option key={uf} value={uf}>{uf}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                                    <h3 className="font-semibold text-[#437314] text-sm uppercase tracking-wider mb-4 border-b pb-2">Passo 2: Sua Bicicleta</h3>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-800 mb-3">Você possui bicicleta atualmente? *</label>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                            {['Sim', 'Não', 'Pretendo comprar'].map(option => (
                                                <label key={option} className={`flex items-center justify-center p-3 rounded-xl border cursor-pointer transition-all ${formData.possui_bicicleta === option ? 'border-[#62BF04] bg-[#62BF04]/5 ring-1 ring-[#62BF04]' : 'border-gray-200 hover:border-[#62BF04]/50'}`}>
                                                    <input type="radio" name="possui_bicicleta" value={option} checked={formData.possui_bicicleta === option} onChange={() => handleRadioChange('possui_bicicleta', option)} className="sr-only" />
                                                    <span className={`text-sm font-bold ${formData.possui_bicicleta === option ? 'text-[#3F5925]' : 'text-gray-600'}`}>{option}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Qual o valor aproximado da sua bicicleta?</label>
                                        <select name="valor_bicicleta" value={formData.valor_bicicleta} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#62BF04] focus:ring-2 focus:ring-[#62BF04]/20 outline-none transition-all text-gray-800 font-medium bg-white appearance-none">
                                            <option value="">Selecione uma faixa de valor</option>
                                            <option value="Até R$ 2.000">Até R$ 2.000</option>
                                            <option value="R$ 2.000 – R$ 5.000">R$ 2.000 – R$ 5.000</option>
                                            <option value="R$ 5.000 – R$ 10.000">R$ 5.000 – R$ 10.000</option>
                                            <option value="Acima de R$ 10.000">Acima de R$ 10.000</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Qual tipo de pedal você pratica mais?</label>
                                        <select name="tipo_pedal" value={formData.tipo_pedal} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#62BF04] focus:ring-2 focus:ring-[#62BF04]/20 outline-none transition-all text-gray-800 font-medium bg-white appearance-none">
                                            <option value="">Selecione a modalidade</option>
                                            <option value="MTB / trilha">MTB / trilha</option>
                                            <option value="Estrada / speed">Estrada / speed</option>
                                            <option value="Urbano / deslocamento">Urbano / deslocamento</option>
                                            <option value="Gravel / misto">Gravel / misto</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Marca ou modelo da bicicleta <span className="font-normal text-gray-400">(opcional)</span></label>
                                        <input type="text" name="marca_modelo_bicicleta" value={formData.marca_modelo_bicicleta} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#62BF04] focus:ring-2 focus:ring-[#62BF04]/20 outline-none transition-all placeholder:text-gray-400 text-gray-800 font-medium" placeholder="Ex: Trek Marlin 7" />
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                    <h3 className="font-semibold text-[#437314] text-sm uppercase tracking-wider mb-4 border-b pb-2">Passo 3: Seguro e Proteção</h3>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-800 mb-3">Você já possui seguro para sua bicicleta?</label>
                                        <div className="space-y-2">
                                            {['Não tenho seguro', 'Já tenho seguro', 'Já tive seguro'].map(option => (
                                                <label key={option} className={`flex items-center p-3 rounded-xl border cursor-pointer transition-all ${formData.possui_seguro === option ? 'border-[#62BF04] bg-[#62BF04]/5 ring-1 ring-[#62BF04]' : 'border-gray-200 hover:border-[#62BF04]/50'}`}>
                                                    <input type="radio" name="possui_seguro" value={option} checked={formData.possui_seguro === option} onChange={() => handleRadioChange('possui_seguro', option)} className="sr-only" />
                                                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center mr-3 ${formData.possui_seguro === option ? 'border-[#62BF04]' : 'border-gray-300'}`}>
                                                        {formData.possui_seguro === option && <div className="w-2 h-2 rounded-full bg-[#62BF04]"></div>}
                                                    </div>
                                                    <span className={`text-sm font-bold ${formData.possui_seguro === option ? 'text-[#3F5925]' : 'text-gray-600'}`}>{option}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-800 mb-3">Você teria interesse em receber uma simulação gratuita?</label>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                            {['Sim', 'Talvez', 'Só quero mais informações'].map(option => (
                                                <label key={option} className={`flex items-center justify-center p-3 text-center rounded-xl border cursor-pointer transition-all ${formData.interesse_simulacao === option ? 'border-[#62BF04] bg-[#62BF04]/5 ring-1 ring-[#62BF04]' : 'border-gray-200 hover:border-[#62BF04]/50'}`}>
                                                    <input type="radio" name="interesse_simulacao" value={option} checked={formData.interesse_simulacao === option} onChange={() => handleRadioChange('interesse_simulacao', option)} className="sr-only" />
                                                    <span className={`text-xs md:text-sm font-bold ${formData.interesse_simulacao === option ? 'text-[#3F5925]' : 'text-gray-600'}`}>{option}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Error Message */}
                            {error && (
                                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium border border-red-100 animate-in fade-in">
                                    {error}
                                </div>
                            )}

                        </div>
                    )}

                    {/* Navigation Buttons */}
                    {!isSuccess && (
                        <div className="mt-8 flex items-center justify-between border-t pt-5">
                            {step > 1 ? (
                                <button
                                    type="button"
                                    onClick={handlePrev}
                                    className="flex items-center text-gray-500 hover:text-gray-800 font-semibold px-2 py-2 transition-colors"
                                >
                                    <ChevronLeft className="w-5 h-5 mr-1" /> Voltar
                                </button>
                            ) : <div></div>}

                            {step < 3 ? (
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className="flex items-center bg-[#050703] hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg active:scale-95 ml-auto"
                                >
                                    Próximo <ChevronRight className="w-5 h-5 ml-1" />
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className="flex items-center justify-center bg-[#62BF04] hover:bg-[#52a103] text-white font-bold py-3 px-8 rounded-lg w-full sm:w-auto transition-all shadow-md hover:shadow-lg hover:shadow-[#62BF04]/20 active:scale-95 disabled:opacity-70 disabled:active:scale-100 ml-auto"
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center"><svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Enviando...</span>
                                    ) : "Receber Simulação"}
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
};
