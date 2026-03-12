import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { CheckCircle2, Send, Bike, ShieldCheck, MapPin, Mail, Phone, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const UFs = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

const TesteForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    whatsapp: '',
    email: '',
    cidade: '',
    estado: '',
    valor_bike: '',
    tipo_pedal: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('leads_teste')
        .insert([
          {
            nome: formData.nome,
            whatsapp: formData.whatsapp,
            email: formData.email || null,
            cidade: formData.cidade,
            estado: formData.estado,
            valor_bike: formData.valor_bike ? parseInt(formData.valor_bike) : null,
            tipo_pedal: formData.tipo_pedal
          }
        ]);

      if (error) throw error;

      setIsSuccess(true);
      toast.success("Lead de teste enviado com sucesso!");
      
      // Reset form after a few seconds
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          nome: '',
          whatsapp: '',
          email: '',
          cidade: '',
          estado: '',
          valor_bike: '',
          tipo_pedal: ''
        });
      }, 5000);

    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Erro ao enviar lead de teste");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] shadow-2xl text-center space-y-6 animate-in zoom-in duration-300">
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2 ring-4 ring-primary/10">
            <CheckCircle2 className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Sucesso!</h1>
          <p className="text-white/70 text-lg leading-relaxed">
            Seu lead de teste foi enviado para o banco de dados. Verifique suas automações agora!
          </p>
          <Button 
            onClick={() => setIsSuccess(false)}
            className="w-full h-14 bg-primary hover:bg-white hover:text-slate-950 text-white font-bold rounded-2xl transition-all shadow-lg shadow-primary/20"
          >
            Enviar outro teste
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 md:p-8 font-sans relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-primary/10 blur-[100px] rounded-full"></div>
      
      <div className="max-w-2xl w-full relative z-10">
        <div className="text-center mb-10 space-y-4">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full mb-2">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span className="text-primary text-xs font-bold uppercase tracking-widest">Ambiente de Teste</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Formulário de <span className="text-primary">Lead Teste</span>
          </h1>
          <p className="text-white/60 text-lg max-w-lg mx-auto">
            Use este formulário para enviar dados fictícios e testar o funcionamento das suas automações e do CRM.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 md:p-10 rounded-[2.5rem] shadow-2xl relative">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 col-span-full">
              <Label htmlFor="nome" className="text-white/80 font-bold ml-1 flex items-center gap-2">
                <User className="w-4 h-4" /> Nome Completo
              </Label>
              <Input
                id="nome"
                name="nome"
                required
                placeholder="Ex: Lead de Teste Silva"
                value={formData.nome}
                onChange={handleChange}
                className="h-14 bg-white/10 border-white/20 focus:border-primary focus:ring-1 focus:ring-primary text-white placeholder:text-white/20 rounded-2xl transition-all"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatsapp" className="text-white/80 font-bold ml-1 flex items-center gap-2">
                <Phone className="w-4 h-4" /> WhatsApp
              </Label>
              <Input
                id="whatsapp"
                name="whatsapp"
                required
                placeholder="Ex: 11988887777"
                value={formData.whatsapp}
                onChange={handleChange}
                className="h-14 bg-white/10 border-white/20 focus:border-primary focus:ring-1 focus:ring-primary text-white placeholder:text-white/20 rounded-2xl transition-all"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/80 font-bold ml-1 flex items-center gap-2">
                <Mail className="w-4 h-4" /> Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Ex: teste@example.com"
                value={formData.email}
                onChange={handleChange}
                className="h-14 bg-white/10 border-white/20 focus:border-primary focus:ring-1 focus:ring-primary text-white placeholder:text-white/20 rounded-2xl transition-all"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cidade" className="text-white/80 font-bold ml-1 flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Cidade
              </Label>
              <Input
                id="cidade"
                name="cidade"
                required
                placeholder="Ex: São Paulo"
                value={formData.cidade}
                onChange={handleChange}
                className="h-14 bg-white/10 border-white/20 focus:border-primary focus:ring-1 focus:ring-primary text-white placeholder:text-white/20 rounded-2xl transition-all"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="estado" className="text-white/80 font-bold ml-1 flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Estado (UF)
              </Label>
              <Select onValueChange={(v) => handleSelectChange('estado', v)} value={formData.estado}>
                <SelectTrigger className="h-14 bg-white/10 border-white/20 text-white rounded-2xl focus:ring-primary">
                  <SelectValue placeholder="Selecione UF" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-white/10 text-white">
                  {UFs.map(uf => (
                    <SelectItem key={uf} value={uf}>{uf}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="valor_bike" className="text-white/80 font-bold ml-1 flex items-center gap-2">
                <Bike className="w-4 h-4" /> Valor da Bike (R$)
              </Label>
              <Input
                id="valor_bike"
                name="valor_bike"
                type="number"
                placeholder="Ex: 5000"
                value={formData.valor_bike}
                onChange={handleChange}
                className="h-14 bg-white/10 border-white/20 focus:border-primary focus:ring-1 focus:ring-primary text-white placeholder:text-white/20 rounded-2xl transition-all"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tipo_pedal" className="text-white/80 font-bold ml-1 flex items-center gap-2">
                <Bike className="w-4 h-4" /> Tipo de Pedal
              </Label>
              <Select onValueChange={(v) => handleSelectChange('tipo_pedal', v)} value={formData.tipo_pedal}>
                <SelectTrigger className="h-14 bg-white/10 border-white/20 text-white rounded-2xl focus:ring-primary">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-white/10 text-white">
                  <SelectItem value="MTB / trilha">MTB / trilha</SelectItem>
                  <SelectItem value="Estrada / speed">Estrada / speed</SelectItem>
                  <SelectItem value="Urbano / deslocamento">Urbano / deslocamento</SelectItem>
                  <SelectItem value="Gravel / misto">Gravel / misto</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 h-16 bg-primary hover:bg-white hover:text-slate-950 text-white font-black text-xl rounded-2xl col-span-full transition-all duration-300 shadow-[0_15px_40px_rgba(34,197,94,0.3)] hover:shadow-white/20 disabled:opacity-50 group"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-3">
                  <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  ENVIANDO...
                </span>
              ) : (
                <span className="flex items-center gap-3">
                  ENVIAR LEAD TESTE <Send className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TesteForm;
