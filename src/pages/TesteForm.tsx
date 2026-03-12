import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { CheckCircle2, Send, Bike, ShieldCheck, MapPin, Mail, Phone, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import logo from "../assets/logo.webp";

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
      
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          nome: '', whatsapp: '', email: '', cidade: '', estado: '',
          valor_bike: '', tipo_pedal: ''
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
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 bg-grid-pattern">
        <div className="max-w-md w-full bg-white border border-border p-10 rounded-[2.5rem] shadow-2xl text-center space-y-6 animate-in zoom-in duration-300">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2 border border-primary/20">
            <CheckCircle2 className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-black text-foreground tracking-tight">Sucesso!</h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Seu lead de teste foi enviado para o CRM.
          </p>
          <Button 
            onClick={() => setIsSuccess(false)}
            className="w-full h-14 bg-primary hover:bg-crm-dark text-white font-black rounded-2xl transition-all shadow-lg"
          >
            Novo teste
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 bg-grid-pattern">
      <div className="w-full max-w-lg space-y-8 animate-in fade-in duration-500">
        <div className="text-center space-y-4">
          <Link to="/" className="inline-block hover:scale-105 transition-transform mb-4">
            <img src={logo} alt="Nef Seguros" className="h-10 w-auto" />
          </Link>
          <h1 className="text-4xl font-black text-foreground tracking-tighter">
            Lead de <span className="text-primary italic">Teste</span>
          </h1>
          <p className="text-muted-foreground font-medium text-sm px-4">
            Envie dados reais de contato para validar suas automações.
          </p>
        </div>

        <div className="bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-5">
              <div className="space-y-2">
                <Label htmlFor="nome" className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Nome Completo</Label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input id="nome" name="nome" required placeholder="Nome Fictício" value={formData.nome} onChange={handleChange} className="pl-11 h-12 bg-slate-50 border-slate-200 rounded-xl" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="whatsapp" className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">WhatsApp Real</Label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input id="whatsapp" name="whatsapp" required placeholder="11988887777" value={formData.whatsapp} onChange={handleChange} className="pl-11 h-12 bg-slate-50 border-slate-200 rounded-xl" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">E-mail Real</Label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input id="email" name="email" type="email" placeholder="teste@email.com" value={formData.email} onChange={handleChange} className="pl-11 h-12 bg-slate-50 border-slate-200 rounded-xl" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="cidade" className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Cidade</Label>
                  <Input id="cidade" name="cidade" required placeholder="Cidade" value={formData.cidade} onChange={handleChange} className="h-12 bg-slate-50 border-slate-200 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estado" className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">UF</Label>
                  <Select onValueChange={(v) => handleSelectChange('estado', v)} value={formData.estado}>
                    <SelectTrigger className="h-12 bg-slate-50 border-slate-200 rounded-xl">
                      <SelectValue placeholder="--" />
                    </SelectTrigger>
                    <SelectContent>
                      {UFs.map(uf => <SelectItem key={uf} value={uf}>{uf}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="valor_bike" className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Valor da Bike</Label>
                  <div className="relative">
                    <Bike className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input id="valor_bike" name="valor_bike" type="number" min="0" placeholder="0" value={formData.valor_bike} onChange={handleChange} className="pl-11 h-12 bg-slate-50 border-slate-200 rounded-xl" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tipo_pedal" className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Modalidade</Label>
                  <Select onValueChange={(v) => handleSelectChange('tipo_pedal', v)} value={formData.tipo_pedal}>
                    <SelectTrigger className="h-12 bg-slate-50 border-slate-200 rounded-xl">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MTB / trilha">MTB / trilha</SelectItem>
                      <SelectItem value="Estrada / speed">Estrada / speed</SelectItem>
                      <SelectItem value="Urbano / deslocamento">Urbano / deslocamento</SelectItem>
                      <SelectItem value="Gravel / misto">Gravel / misto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 bg-primary hover:bg-crm-dark text-white font-black rounded-2xl shadow-xl shadow-primary/20 transition-all duration-300 group mt-4 flex items-center justify-center gap-3"
            >
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ENVIANDO...
                </>
              ) : (
                <>
                  ENVIAR TESTE <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </>
              )}
            </Button>
          </form>
        </div>

        <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
          Ambiente de Validação Nef Seguros
        </p>
      </div>
    </div>
  );
};

export default TesteForm;
