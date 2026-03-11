import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Check,
  Bike,
  ShieldCheck,
  MapPin,
  Zap,
  ArrowRight,
  ShieldAlert,
  Clock,
  ThumbsUp,
  Mountain,
  Gauge,
  Medal,
  Building2,
  Cog,
  AlertTriangle,
  HeartPulse,
  Globe,
  Users,
  HelpCircle,
  ChevronDown,
  Plus,
  Minus,
  Briefcase,
  Star,
  CheckCircle2,
  Menu,
  X
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";
import heroBg from "../assets/hero-section.png";
import heroMobileBg from "../assets/mobile/hero-background.png";
import logo from "../assets/logo.webp";
import logoCropado from "../assets/logo-cropado.webp";
import ciclistasImg from "../assets/ciclistas.png";
import coberturasBg from "../assets/coberturas-background.png";
import riscosBg from "../assets/riscos.png";
import estradaBg from "../assets/estrada.png";
import perfilImg from "../assets/perfil.webp";
import protectedImg from "../assets/mobile/protected.png";
import unprotectedImg from "../assets/mobile/unprotected.png";
import securityImg from "../assets/mobile/security.png";
import frame1 from "../assets/frame_1_ciclista.mp4";
import frame2 from "../assets/frame_2_ciclista.mp4";
import frame3 from "../assets/frame_3_ciclista.mp4";
import girlPedaling from "../assets/mobile/girl_pedaling_video.mp4";
import mountainBike from "../assets/mobile/mountain_bike_video.mp4";
import urbanBike from "../assets/mobile/urban_bike_video.mp4";
import faqBg from "../assets/faq_background.png";
import { LeadCaptureModal } from "../components/LeadCaptureModal";
import { InlineLeadForm } from "../components/InlineLeadForm";

const Reveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white transition-all duration-300 hover:border-primary/30">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 text-left flex items-center justify-between group"
      >
        <span className="font-bold text-slate-900 group-hover:text-primary transition-colors text-lg">{question}</span>
        {isOpen ? (
          <Minus className="w-5 h-5 text-primary" />
        ) : (
          <Plus className="w-5 h-5 text-slate-400 group-hover:text-primary" />
        )}
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="px-6 pb-6 text-slate-600 leading-relaxed font-light">
          {answer}
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(0);
  const videos = [frame1, frame2, frame3];
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const [currentMobileVideo, setCurrentMobileVideo] = useState(0);
  const mobileVideos = [girlPedaling, mountainBike, urbanBike];
  const mobileVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    // Desktop video playback
    const current = videoRefs.current[currentVideo];
    if (current) {
      current.currentTime = 0;
      current.play().catch((e) => console.log("Erro no autoplay desktop", e));
    }
  }, [currentVideo]);

  useEffect(() => {
    // Mobile video playback
    const currentMob = mobileVideoRefs.current[currentMobileVideo];
    if (currentMob) {
      currentMob.currentTime = 0;
      currentMob.play().catch((e) => console.log("Erro no autoplay mobile", e));
    }
  }, [currentMobileVideo]);

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      {/* Header - Barra Flutuante Arredondada */}
      <header className="fixed top-0 left-0 w-full z-[100] transition-all duration-300 bg-black/60 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between relative group">
          {/* Efeito de brilho no topo */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

          <div className="flex-shrink-0 relative z-10">
            <a href="#inicio" className="flex items-center">
              <img src={logo} alt="Nef Seguros" className="h-8 md:h-10 w-auto object-contain brightness-0 invert hover:scale-105 transition-transform" />
            </a>
          </div>

          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 relative z-10">
            {[
              { name: "Início", href: "#inicio" },
              { name: "Riscos", href: "#riscos" },
              { name: "Modalidades", href: "#planos" },
              { name: "Coberturas", href: "#coberturas" },
              { name: "Diferenciais", href: "#sobre" },
              { name: "Especialista", href: "#consultor" },
              { name: "FAQ", href: "#faq" }
            ].map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-xs lg:text-sm font-bold text-white/70 hover:text-white transition-all duration-300 tracking-tight hover:bg-white/5 rounded-lg"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4 relative z-10">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-primary hover:bg-white text-white hover:text-primary px-6 py-2.5 rounded-full text-xs lg:text-sm font-extrabold transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-white/20 active:scale-95"
            >
              SIMULAR
            </button>

            {/* Menu Sanduíche - Mobile */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <button className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors flex items-center justify-center">
                    <Menu className="w-6 h-6" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full sm:max-w-md bg-gray-950/98 backdrop-blur-2xl border-none p-0 z-[110]">
                  <div className="flex flex-col h-full bg-gradient-to-b from-gray-950 to-slate-900">
                    <div className="p-6 border-b border-white/5 flex items-center justify-between">
                      <img src={logo} alt="Nef Seguros" className="h-8 w-auto brightness-0 invert" />
                      <SheetClose className="p-2 rounded-xl bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-all">
                        <X className="w-6 h-6" />
                      </SheetClose>
                    </div>

                    <nav className="flex-1 px-8 py-12">
                      <div className="flex flex-col space-y-4">
                        {[
                          { name: "Início", href: "#inicio" },
                          { name: "Riscos", href: "#riscos" },
                          { name: "Modalidades", href: "#planos" },
                          { name: "Coberturas", href: "#coberturas" },
                          { name: "Diferenciais", href: "#sobre" },
                          { name: "Especialista", href: "#consultor" },
                          { name: "FAQ", href: "#faq" },
                          { name: "Contratação", href: "#contato" }
                        ].map((link, idx) => (
                          <Reveal key={link.name} delay={idx * 50}>
                            <SheetClose asChild>
                              <a
                                href={link.href}
                                className="flex items-center justify-between py-3 text-lg font-semibold text-white/60 hover:text-primary transition-all group border-b border-white/5"
                              >
                                {link.name}
                                <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary/50" />
                              </a>
                            </SheetClose>
                          </Reveal>
                        ))}
                      </div>
                    </nav>

                    <div className="p-8 border-t border-white/5 bg-black/40">
                      <SheetClose asChild>
                        <button
                          onClick={() => setIsModalOpen(true)}
                          className="w-full py-5 bg-primary text-white font-black text-lg rounded-2xl shadow-xl shadow-primary/30 active:scale-95 transition-transform"
                        >
                          SIMULAR AGORA
                        </button>
                      </SheetClose>
                      <div className="mt-6 flex items-center justify-center gap-3 text-xs text-gray-500 font-bold uppercase tracking-[0.2em]">
                        <ShieldCheck className="w-4 h-4 text-primary" />
                        Segurança Nef Seguros
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* 1. Hero Section */}
      <section id="inicio" className="relative overflow-hidden flex items-center min-h-screen">

        {/* ── MOBILE HERO (< md) ── */}
        <div className="md:hidden w-full min-h-screen flex flex-col relative overflow-hidden bg-black">
          <div
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroMobileBg})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-transparent z-0 h-[60%]" />
          <div className="relative z-10 flex flex-col justify-between px-6 pt-20 h-screen pb-6">
            <div className="flex flex-col gap-6 mt-6">
              {/* Badge de credibilidade */}
              <Reveal className="flex justify-center">
                <div className="inline-flex items-center gap-2 bg-primary/15 border border-primary/30 rounded-full px-4 py-2 mb-6 w-fit mx-auto">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span className="text-primary text-[10px] font-black uppercase tracking-widest">Rodrigo Campelo • Especialista</span>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <h1 className="text-4xl font-black text-white leading-[1.1] tracking-tight mb-5 text-center">
                  Não deixe o medo roubar sua{" "}
                  <span className="text-primary">paixão.</span>
                </h1>
              </Reveal>

              <Reveal delay={200}>
                <p className="text-base text-gray-300 leading-relaxed mb-8 font-light text-center">
                  Proteja sua bicicleta e pedale com liberdade. Consultoria personalizada de{" "}
                  <span className="font-bold text-white">Rodrigo Campelo</span>.
                </p>
              </Reveal>



            </div>

            <Reveal delay={300}>
              <div className="flex flex-col items-center gap-3">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full py-4 bg-primary text-white font-extrabold text-base rounded-2xl shadow-lg shadow-primary/30 active:scale-95 transition-transform"
                >
                  SIMULAR AGORA
                </button>
                <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  Gratuito • Menos de 2 min
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ── DESKTOP HERO (≥ md) ── */}
        <div className="hidden md:block absolute inset-0 z-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${heroBg})` }}>
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-transparent z-0" />
        </div>
        <img src={logoCropado} alt="" className="hidden md:block absolute right-0 bottom-0 w-[600px] h-[600px] opacity-10 translate-x-1/4 translate-y-1/4 pointer-events-none z-0" />
        <div className="hidden md:block container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-32 pb-20 lg:pt-48 lg:pb-32 mt-10">
          <div className="max-w-4xl mx-auto text-white text-center">
            <Reveal delay={100}>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
                Não deixe o medo roubar sua <span className="text-primary">paixão.</span>
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 font-light leading-relaxed">
                Proteja sua bicicleta e pedale com a liberdade que você merece. Descubra a proteção ideal com a consultoria personalizada de <span className="font-bold text-white">Rodrigo Campelo</span>.
              </p>
            </Reveal>

            <Reveal delay={400}>
              <div className="flex flex-col items-center gap-4">
                <button onClick={() => setIsModalOpen(true)} className="inline-flex items-center justify-center px-12 py-5 text-xl font-black text-white transition-all bg-primary hover:bg-white hover:text-primary rounded-2xl shadow-xl shadow-primary/30 hover:-translate-y-1 w-full sm:w-auto uppercase tracking-tight">
                  SIMULAR AGORA
                </button>
                <div className="flex items-center text-sm text-gray-400 font-bold uppercase tracking-widest">
                  Gratuito • Simulação Real
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Section Break - Infinite Marquee (Information carousel) */}
      <div className="bg-primary/10 border-y border-primary/20 py-4 flex overflow-hidden w-full relative group">
        <div className="flex gap-8 items-center animate-marquee whitespace-nowrap opacity-80 group-hover:opacity-100 transition-opacity">
          {[...Array(2)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="text-foreground/80 font-bold flex items-center tracking-wide"><ShieldCheck className="w-5 h-5 mr-2 text-primary" /> Consultoria Especializada</span>
              <span className="text-primary font-bold px-2">•</span>
              <span className="text-foreground/80 font-bold flex items-center tracking-wide"><Users className="w-5 h-5 mr-2 text-primary" /> Atendimento Humanizado</span>
              <span className="text-primary font-bold px-2">•</span>
              <span className="text-foreground/80 font-bold flex items-center tracking-wide"><Zap className="w-5 h-5 mr-2 text-primary" /> Menos Burocracia</span>
              <span className="text-primary font-bold px-2">•</span>
              <span className="text-foreground/80 font-bold flex items-center tracking-wide"><ThumbsUp className="w-5 h-5 mr-2 text-primary" /> Praticidade Real</span>
              <span className="text-primary font-bold px-2">•</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Inline styles for the marquee animation since it's not in tailwind.config.ts by default */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
          width: max-content;
        }
      `}} />

      {/* 2. Seção de Tensão: O Risco Real (Contraste) */}
      <section id="riscos" className="relative w-full overflow-hidden scroll-mt-20">

        {/* ── MOBILE RISCOS (< md) ── */}
        <div className="md:hidden bg-white px-5 py-14">
          <Reveal>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold text-slate-900 mb-3 leading-tight tracking-tight">
                Sua bike pode estar em{" "}
                <span className="text-red-600">risco…</span>{" "}ou totalmente{" "}
                <span className="text-primary">protegida.</span>
              </h2>
              <p className="text-sm text-slate-600 font-medium leading-relaxed">
                A diferença é apenas uma decisão.
              </p>
            </div>
          </Reveal>

          <div className="flex flex-col gap-5 mb-8">
            {/* Linha 1: Sem Proteção + Imagem Direita (UM ÚNICO CARD) */}
            <Reveal delay={100}>
              <div className="bg-white border border-red-100 rounded-[2.5rem] shadow-[0_15px_35px_-5px_rgba(220,38,38,0.08)] flex overflow-hidden min-h-[180px] relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full -mr-16 -mt-16 blur-2xl" />

                {/* Lado Esquerdo: Conteúdo */}
                <div className="flex-[7] p-6 flex flex-col justify-center relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-50 to-red-100 text-red-600 flex items-center justify-center flex-shrink-0 shadow-sm border border-red-200/50">
                      <ShieldAlert className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-red-600 uppercase tracking-[0.15em] block leading-none mb-1">Cenário A</span>
                      <span className="text-sm font-black text-slate-900 uppercase tracking-tight">Sem Proteção</span>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    {["⚠️ Roubo em segundos", "💥 Acidentes acontecem", "💸 Prejuízo total"].map((t, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500/30 flex-shrink-0" />
                        <span className="text-xs font-bold text-slate-600 leading-tight">{t}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Imagem (Diretamente no Card) */}
                <img
                  src={unprotectedImg}
                  alt="Desprotegido"
                  className="w-[30%] object-cover object-center"
                />
              </div>
            </Reveal>

            {/* Linha 2: Imagem Esquerda + Com Proteção (UM ÚNICO CARD) */}
            <Reveal delay={200}>
              <div className="bg-white border border-primary/20 rounded-[2.5rem] shadow-[0_15px_35px_-5px_rgba(34,197,94,0.12)] flex overflow-hidden min-h-[180px] relative">
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full -ml-16 -mb-16 blur-2xl" />

                {/* Imagem (Diretamente no Card) */}
                <img
                  src={protectedImg}
                  alt="Protegido"
                  className="w-[30%] object-cover object-center"
                />

                {/* Lado Direito: Conteúdo */}
                <div className="flex-[7] p-6 flex flex-col justify-center relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 text-primary flex items-center justify-center flex-shrink-0 shadow-sm border border-primary/20">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-primary uppercase tracking-[0.15em] block leading-none mb-1">Cenário B</span>
                      <span className="text-sm font-black text-slate-900 uppercase tracking-tight">Com Proteção</span>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    {["🛡️ Proteção contra roubo", "🔧 Cobertura para danos", "✅ Pedal tranquilo"].map((t, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/30 flex-shrink-0" />
                        <span className="text-xs font-bold text-slate-600 leading-tight">{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ── DESKTOP RISCOS (≥ md) ── */}
        <div className="hidden md:block">
          <div className="relative w-full mx-auto aspect-[1980/1080]">
            <img
              src={riscosBg}
              alt="Contraste de Riscos"
              className="absolute inset-0 w-full h-full object-fill"
            />

            {/* Subtle Vignette & Bottom Gradient Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_70%,rgba(0,0,0,0.03)_100%)] pointer-events-none z-[5]"></div>
            <div className="absolute inset-x-0 bottom-0 h-1/6 bg-gradient-to-t from-black/5 to-transparent pointer-events-none z-[5]"></div>

            {/* Content Container - Overlaying the image exactly */}
            <div className="absolute inset-0 z-10 flex flex-col justify-between pt-8 lg:pt-16 pb-12 lg:pb-24">
              <div className="container mx-auto px-4 h-full flex flex-col justify-between">

                {/* Title - Overlapping the image */}
                <div className="text-center mb-8">
                  <Reveal>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 leading-tight tracking-tight">
                      Sua bicicleta pode estar em <span className="text-red-600">risco…</span> <br className="hidden md:block" /> ou totalmente <span className="text-primary">protegida.</span>
                    </h2>
                    <p className="text-lg md:text-xl text-slate-700 font-bold leading-relaxed max-w-4xl mx-auto">
                      A diferença entre pedalar com preocupação ou com tranquilidade pode ser apenas uma decisão.
                    </p>
                  </Reveal>
                </div>

                {/* Contrast Grid - Left vs Right */}
                <div className="flex-1 flex items-center">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 lg:gap-x-24 w-full">

                    {/* Lado Esquerdo: SEM SEGURO */}
                    <div className="flex flex-col gap-6 lg:pr-10 justify-center">
                      <Reveal delay={200} className="w-full">
                        <div className="bg-black/40 backdrop-blur-md border border-red-500/20 p-3 rounded-xl shadow-xl flex items-center gap-3 w-fit animate-float ml-4 lg:ml-0">
                          <div className="w-8 h-8 bg-red-600/20 text-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <ShieldAlert className="w-4 h-4" />
                          </div>
                          <h4 className="text-sm font-black text-white uppercase tracking-tight">⚠️ Roubo em segundos</h4>
                        </div>
                      </Reveal>

                      <Reveal delay={300} className="w-full">
                        <div className="bg-black/40 backdrop-blur-md border border-red-500/20 p-3 rounded-xl shadow-xl flex items-center gap-3 w-fit animate-float-delayed ml-12 lg:ml-16">
                          <div className="w-8 h-8 bg-red-600/20 text-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Zap className="w-4 h-4" />
                          </div>
                          <h4 className="text-sm font-black text-white uppercase tracking-tight">💥 Acidentes acontecem</h4>
                        </div>
                      </Reveal>

                      <Reveal delay={400} className="w-full">
                        <div className="bg-black/40 backdrop-blur-md border border-red-500/20 p-3 rounded-xl shadow-xl flex items-center gap-3 w-fit animate-float ml-8 lg:ml-8">
                          <div className="w-8 h-8 bg-red-600/20 text-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Plus className="w-4 h-4 rotate-45" />
                          </div>
                          <h4 className="text-sm font-black text-white uppercase tracking-tight">💸 Prejuízo total</h4>
                        </div>
                      </Reveal>
                    </div>

                    {/* Lado Direito: COM SEGURO */}
                    <div className="flex flex-col gap-6 lg:pl-10 justify-center items-end">
                      <Reveal delay={500} className="w-full flex justify-end">
                        <div className="bg-white/10 backdrop-blur-md border border-primary/20 p-3 rounded-xl shadow-xl flex items-center gap-3 w-fit animate-float mr-4 lg:mr-0">
                          <div className="w-8 h-8 bg-primary/20 text-primary rounded-lg flex items-center justify-center flex-shrink-0">
                            <ShieldCheck className="w-4 h-4" />
                          </div>
                          <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">🛡️ Proteção contra roubo</h4>
                        </div>
                      </Reveal>

                      <Reveal delay={600} className="w-full flex justify-end">
                        <div className="bg-white/10 backdrop-blur-md border border-primary/20 p-3 rounded-xl shadow-xl flex items-center gap-3 w-fit animate-float-delayed mr-12 lg:mr-16">
                          <div className="w-8 h-8 bg-primary/20 text-primary rounded-lg flex items-center justify-center flex-shrink-0">
                            <Gauge className="w-4 h-4" />
                          </div>
                          <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">🔧 Cobertura para danos</h4>
                        </div>
                      </Reveal>

                      <Reveal delay={700} className="w-full flex justify-end">
                        <div className="bg-white/10 backdrop-blur-md border border-primary/20 p-3 rounded-xl shadow-xl flex items-center gap-3 w-fit animate-float mr-8 lg:mr-8">
                          <div className="w-8 h-8 bg-primary/20 text-primary rounded-lg flex items-center justify-center flex-shrink-0">
                            <Check className="w-4 h-4" />
                          </div>
                          <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">✅ Pedale com tranquilidade</h4>
                        </div>
                      </Reveal>
                    </div>

                  </div>
                </div>
              </div>



            </div>
          </div>
        </div>{/* end desktop wrapper */}
      </section>

      {/* 4. Tipos de bicicletas */}
      <section id="planos" className="scroll-mt-20 relative overflow-hidden">

        {/* ── MOBILE PLANOS (< md) ── */}
        <div className="md:hidden bg-slate-50 px-5 py-14">
          <Reveal>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-3 text-slate-900">
                Seguro para <span className="text-primary">todos os tipos</span> de pedal.
              </h2>
              <p className="text-sm text-slate-500">Proteção especializada para cada modalidade.</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 gap-3 mb-8">
            {[
              { name: "Speed / Road", icon: <Gauge className="w-5 h-5" /> },
              { name: "Mountain Bike", icon: <Mountain className="w-5 h-5" /> },
              { name: "Urbano", icon: <Building2 className="w-5 h-5" /> },
              { name: "Trial / BMX", icon: <Zap className="w-5 h-5" /> },
              { name: "E-bikes", icon: <Zap className="w-5 h-5" /> },
              { name: "Triathlon", icon: <Medal className="w-5 h-5" /> },
            ].map((bike, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="flex items-center gap-3 bg-white border border-slate-100 rounded-xl p-4 shadow-sm active:scale-95 transition-transform">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                    {bike.icon}
                  </div>
                  <span className="text-sm font-semibold text-slate-800">{bike.name}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={400}>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full py-4 bg-primary text-white font-extrabold rounded-2xl shadow-lg shadow-primary/20 active:scale-95 transition-transform"
            >
              Quero proteger minha bicicleta
            </button>
          </Reveal>
        </div>

        {/* ── DESKTOP PLANOS (≥ md) ── */}
        <div className="hidden md:block py-20 lg:py-28 bg-background relative">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-primary/5 blur-3xl animate-float" />
          <img src={logoCropado} alt="" className="absolute -right-20 top-40 w-96 h-96 opacity-[0.08] rotate-12 pointer-events-none z-0" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Reveal>
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                  Seguro para <span className="text-primary">todos os tipos</span> de pedal.
                </h2>
                <p className="text-lg text-muted-foreground">
                  A Nef Seguros oferece proteção especializada para diferentes modalidades de ciclismo.
                </p>
              </div>
            </Reveal>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6 max-w-4xl mx-auto mb-12">
              {[
                { name: "Speed / Road", icon: <Gauge className="w-6 h-6" /> },
                { name: "Mountain Bike (MTB)", icon: <Mountain className="w-6 h-6" /> },
                { name: "Ciclismo Urbano", icon: <Building2 className="w-6 h-6" /> },
                { name: "Trial / BMX", icon: <Zap className="w-6 h-6" /> },
                { name: "E-bikes (Elétricas)", icon: <Zap className="w-6 h-6" /> },
                { name: "Triathlon / Fixas", icon: <Medal className="w-6 h-6" /> },
              ].map((bike, index) => (
                <Reveal key={index} delay={index * 100} className="h-full">
                  <div className="group flex flex-col items-center justify-center p-6 bg-card border border-border rounded-xl hover:border-primary/60 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden cursor-pointer h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
                    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 relative z-10">
                      {bike.icon}
                    </div>
                    <h3 className="font-semibold text-foreground text-center relative z-10">{bike.name}</h3>
                  </div>
                </Reveal>
              ))}
            </div>
            <div className="text-center">
              <button onClick={() => setIsModalOpen(true)} className="inline-flex items-center text-primary font-semibold hover:text-primary/80 transition-colors group">
                Quero proteger minha bicicleta
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Coberturas principais */}
      <section id="coberturas" className="relative w-full overflow-hidden scroll-mt-20">

        {/* ── MOBILE COBERTURAS (< md) ── */}
        <div className="md:hidden bg-white px-5 py-14">
          <Reveal>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
                O que o seguro pode <span className="text-primary">cobrir</span>
              </h2>
              <div className="h-1 w-16 bg-primary mx-auto rounded-full" />
            </div>
          </Reveal>
          <div className="space-y-3 mb-8">
            {[
              { title: "Roubo e Furto", desc: "Proteção total onde você estiver.", icon: <ShieldAlert className="w-5 h-5" /> },
              { title: "Danos Acidentais", desc: "Reparos após quedas e colisões.", icon: <Zap className="w-5 h-5" /> },
              { title: "Acidentes Pessoais", desc: "Despesas médicas e invalidez.", icon: <HeartPulse className="w-5 h-5" /> },
              { title: "Transporte", desc: "Cobertura em racks e transbike.", icon: <MapPin className="w-5 h-5" /> },
              { title: "Responsabilidade Civil", desc: "Danos causados a terceiros.", icon: <ShieldCheck className="w-5 h-5" /> },
              { title: "Extensão Internacional", desc: "Proteção em competições no exterior.", icon: <Globe className="w-5 h-5" /> },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="flex items-center gap-4 bg-slate-50 border border-slate-100 rounded-2xl p-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">{item.title}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{item.desc}</div>
                  </div>
                  <Check className="w-4 h-4 text-primary ml-auto flex-shrink-0" />
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={300}>
            <div className="relative w-full mb-8 rounded-3xl overflow-hidden aspect-[16/10]">
              {/* Fade superior */}
              <div className="absolute top-0 left-0 w-full h-6 bg-gradient-to-b from-white to-transparent z-10" />

              <img
                src={securityImg}
                alt="Segurança total"
                className="w-full h-full object-cover"
              />

              {/* Fade inferior */}
              <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-white to-transparent z-10" />
            </div>
          </Reveal>

          <Reveal delay={400}>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full py-4 bg-primary text-white font-extrabold rounded-2xl shadow-lg shadow-primary/20 active:scale-95 transition-transform"
            >
              SIMULAR SEGURO AGORA
            </button>
          </Reveal>
        </div>

        {/* ── DESKTOP COBERTURAS (≥ md) ── */}
        <div className="hidden md:block relative w-full bg-white">
          {/* Transição Superior */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent z-10" />

          {/* Container que dita o tamanho baseado na imagem de fundo */}
          <div className="relative w-full max-w-[1920px] mx-auto flex flex-col items-center justify-center">

            {/* Imagem como layer estrutural para definir a altura exata */}
            <img
              src={coberturasBg}
              alt="Fundo de Coberturas: Ciclista com escudo verde"
              className="w-full h-auto object-cover min-h-[1000px] lg:min-h-0 opacity-40 lg:opacity-100 transition-opacity duration-700"
            />

            {/* Overlay Absoluto para o Topo (Título) - Subido e cor ajustada para fundo claro */}
            <div className="absolute top-0 left-0 right-0 z-20 pt-12 lg:pt-16 pointer-events-none">
              <Reveal>
                <div className="text-center pointer-events-auto px-4">
                  <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-slate-900 tracking-tight">
                    O que o seguro pode <span className="text-primary">cobrir</span>
                  </h2>
                  <div className="h-1.5 w-24 bg-primary mx-auto rounded-full shadow-[0_2px_10px_rgba(34,197,94,0.4)]"></div>
                </div>
              </Reveal>
            </div>

            {/* Floating cards container - Overlay Centralizado with design mais sutil e moderno */}
            <div className="absolute inset-0 z-10 w-full h-full pointer-events-none flex items-center justify-center">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full h-full relative pointer-events-auto">

                <div className="hidden lg:block absolute inset-0">

                  {/* Card 1: Top Left */}
                  <div className="absolute top-[18%] left-[2%] xl:left-[8%] w-[300px] z-10 animate-float">
                    <Reveal delay={100}>
                      <div className="group bg-white/40 backdrop-blur-md p-5 rounded-2xl border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.05)] hover:bg-white/60 transition-all duration-500 hover:shadow-primary/20 hover:border-primary/30">
                        <div className="flex items-center gap-4 mb-3">
                          <div className="text-primary bg-primary/10 w-10 h-10 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                            <ShieldAlert className="w-5 h-5" />
                          </div>
                          <h3 className="text-base font-bold text-slate-900">Roubo e Furto</h3>
                        </div>
                        <p className="text-xs text-slate-700 leading-relaxed font-bold opacity-80">Proteção total contra roubo ou furto qualificado em qualquer lugar.</p>
                      </div>
                    </Reveal>
                  </div>

                  {/* Card 2: Mid Left */}
                  <div className="absolute top-[48%] left-[0%] xl:left-[5%] w-[300px] z-10 animate-float-delayed">
                    <Reveal delay={200}>
                      <div className="group bg-white/40 backdrop-blur-md p-5 rounded-2xl border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.05)] hover:bg-white/60 transition-all duration-500 hover:shadow-primary/20 hover:border-primary/30">
                        <div className="flex items-center gap-4 mb-3">
                          <div className="text-primary bg-primary/10 w-10 h-10 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                            <Zap className="w-5 h-5" />
                          </div>
                          <h3 className="text-base font-bold text-slate-900">Danos Acidentais</h3>
                        </div>
                        <p className="text-xs text-slate-700 leading-relaxed font-bold opacity-80">Reparos e peças em caso de colisões, quedas ou acidentes de trânsito.</p>
                      </div>
                    </Reveal>
                  </div>

                  {/* Card 3: Bottom Left */}
                  <div className="absolute bottom-[10%] left-[4%] xl:left-[10%] w-[300px] z-10 animate-float">
                    <Reveal delay={300}>
                      <div className="group bg-white/40 backdrop-blur-md p-5 rounded-2xl border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.05)] hover:bg-white/60 transition-all duration-500 hover:shadow-primary/20 hover:border-primary/30">
                        <div className="flex items-center gap-4 mb-3">
                          <div className="text-primary bg-primary/10 w-10 h-10 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                            <HeartPulse className="w-5 h-5" />
                          </div>
                          <h3 className="text-base font-bold text-slate-900">Acidentes Pessoais</h3>
                        </div>
                        <p className="text-xs text-slate-700 leading-relaxed font-bold opacity-80">Cobertura para o ciclista: despesas médicas, invalidez ou morte acidental.</p>
                      </div>
                    </Reveal>
                  </div>

                  {/* Card 4: Top Right */}
                  <div className="absolute top-[18%] right-[2%] xl:right-[8%] w-[300px] z-10 animate-float-delayed">
                    <Reveal delay={400}>
                      <div className="group bg-white/40 backdrop-blur-md p-5 rounded-2xl border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.05)] hover:bg-white/60 transition-all duration-500 hover:shadow-primary/20 hover:border-primary/30">
                        <div className="flex items-center gap-4 mb-3">
                          <div className="text-primary bg-primary/10 w-10 h-10 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                            <MapPin className="w-5 h-5" />
                          </div>
                          <h3 className="text-base font-bold text-slate-900">Transporte</h3>
                        </div>
                        <p className="text-xs text-slate-700 leading-relaxed font-bold opacity-80">Segurança na locomoção em racks, transbike ou dentro do veículo.</p>
                      </div>
                    </Reveal>
                  </div>

                  {/* Card 5: Mid Right */}
                  <div className="absolute top-[48%] right-[0%] xl:right-[5%] w-[300px] z-10 animate-float">
                    <Reveal delay={500}>
                      <div className="group bg-white/40 backdrop-blur-md p-5 rounded-2xl border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.05)] hover:bg-white/60 transition-all duration-500 hover:shadow-primary/20 hover:border-primary/30">
                        <div className="flex items-center gap-4 mb-3">
                          <div className="text-primary bg-primary/10 w-10 h-10 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                            <ShieldCheck className="w-5 h-5" />
                          </div>
                          <h3 className="text-base font-bold text-slate-900">Responsabilidade Civil</h3>
                        </div>
                        <p className="text-xs text-slate-700 leading-relaxed font-bold opacity-80">Proteção contra danos causados a terceiros durante a pedalada.</p>
                      </div>
                    </Reveal>
                  </div>

                  {/* Card 6: Bottom Right */}
                  <div className="absolute bottom-[10%] right-[4%] xl:right-[10%] w-[300px] z-10 animate-float-delayed">
                    <Reveal delay={600}>
                      <div className="group bg-white/40 backdrop-blur-md p-5 rounded-2xl border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.05)] hover:bg-white/60 transition-all duration-500 hover:shadow-primary/20 hover:border-primary/30">
                        <div className="flex items-center gap-4 mb-3">
                          <div className="text-primary bg-primary/10 w-10 h-10 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                            <Globe className="w-5 h-5" />
                          </div>
                          <h3 className="text-base font-bold text-slate-900">Extensão Exterior</h3>
                        </div>
                        <p className="text-xs text-slate-700 leading-relaxed font-bold opacity-80">Sua proteção te acompanha em competições ou treinos internacionais.</p>
                      </div>
                    </Reveal>
                  </div>

                </div>

                {/* Removed old mobile cards - now handled separately above */}

              </div>
            </div>

            {/* Overlay Absoluto para o Rodapé (Botão) - Abaixado e Modernizado */}
            <div className="absolute bottom-0 left-0 right-0 z-20 pb-6 lg:pb-10 flex justify-center pointer-events-none">
              <button
                onClick={() => setIsModalOpen(true)}
                className="group relative inline-flex items-center justify-center px-10 py-4 text-base font-extrabold text-white transition-all pointer-events-auto overflow-hidden rounded-full shadow-[0_10px_30px_rgba(34,197,94,0.3)] hover:shadow-primary/50"
              >
                <div className="absolute inset-0 bg-primary transition-all duration-300 group-hover:scale-110"></div>
                <span className="relative flex items-center gap-2">
                  SIMULAR SEGURO AGORA
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>

            {/* Transição Inferior - Fade da imagem para o branco da próxima seção */}
            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent z-10"></div>

          </div>{/* end max-w container */}
        </div>{/* end desktop coberturas wrapper */}
      </section>

      {/* 4. A Solução Definitiva (Diferenciais) */}
      <section id="sobre" className="relative w-full scroll-mt-20 overflow-hidden">

        {/* ── MOBILE DIFERENCIAIS (< md) ── */}
        <div className="md:hidden bg-slate-50 px-5 py-14">
          <Reveal>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold text-slate-900 mb-3 leading-tight tracking-tight">
                O diferencial <span className="text-primary">Nef Seguros</span>
              </h2>
              <p className="text-sm text-slate-600 font-medium">Consultoria feita por quem entende de seguros.</p>
              <div className="flex items-center justify-center gap-3 mt-4">
                <div className="w-16 h-px bg-slate-300" />
                <Bike className="w-4 h-4 text-slate-400" />
                <div className="w-16 h-px bg-slate-300" />
              </div>
            </div>
          </Reveal>
          <div className="space-y-3">
            {[
              { title: "Curadoria Especializada", desc: "Analisamos as principais seguradoras para o seu perfil e bike.", icon: <ShieldCheck className="w-5 h-5" /> },
              { title: "Atendimento Humanizado", desc: "Fale diretamente com a equipe, não com um robô.", icon: <Users className="w-5 h-5" /> },
              { title: "Menos Burocracia", desc: "Te ajudamos em toda a jornada, da simulação ao sinistro.", icon: <Zap className="w-5 h-5" /> },
              { title: "Praticidade", desc: "Habilite e desabilite sua proteção com facilidade.", icon: <ThumbsUp className="w-5 h-5" /> },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="flex gap-4 bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-black text-slate-900 text-sm mb-1">{item.title}</div>
                    <div className="text-xs text-slate-500 leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ── DESKTOP DIFERENCIAIS (≥ md) ── */}
        <div className="hidden md:block relative w-full z-[60] bg-white">
          <img src={estradaBg} alt="Fundo Estrada" className="w-full h-auto object-cover lg:min-h-0 min-h-[900px]" />
          <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-white via-white/80 to-transparent z-40 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-50 via-slate-50/40 to-transparent z-40 pointer-events-none" />
          <div className="absolute inset-0 z-[70] flex flex-col">
            <div className="flex-1 flex flex-col items-center justify-start pt-16 lg:pt-24 px-4">
              <Reveal>
                <div className="text-center">
                  <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 leading-tight tracking-tight drop-shadow-sm">
                    O diferencial <span className="text-primary">Nef Seguros</span>
                  </h2>
                  <p className="text-base md:text-lg text-slate-800 font-bold max-w-2xl mx-auto leading-relaxed">
                    Consultoria feita por quem entende de seguros para garantir sua total proteção.
                  </p>
                </div>
              </Reveal>

              {/* Divider decorativo */}
              <div className="flex items-center justify-center gap-4 mt-6">
                <div className="w-32 md:w-48 h-px bg-slate-400/60" />
                <div className="flex-shrink-0 text-slate-500">
                  <Bike className="w-5 h-5" />
                </div>
                <div className="w-32 md:w-48 h-px bg-slate-400/60" />
              </div>
            </div>

            {/* ── METADE INFERIOR: Timeline de Cards ── */}
            <div className="flex-1 flex items-center justify-center pb-20">
              <div className="container mx-auto px-4 md:px-8">
                {/* Linha Central da Timeline (Imaginária - serve apenas de guia) */}
                <div className="relative w-full h-[2px] bg-transparent flex items-center">

                  <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8">
                    {[
                      {
                        title: "Curadoria Especializada",
                        desc: "Analisamos as principais seguradoras para o seu perfil e bike.",
                        icon: <ShieldCheck className="w-5 h-5" />
                      },
                      {
                        title: "Atendimento Humanizado",
                        desc: "Fale diretamente com a equipe da Nef Seguros, não com um robô.",
                        icon: <Users className="w-5 h-5" />
                      },
                      {
                        title: "Menos Burocracia",
                        desc: "Te ajudamos em toda a jornada, da simulação ao sinistro.",
                        icon: <Zap className="w-5 h-5" />
                      },
                      {
                        title: "Praticidade",
                        desc: "Habilite e desabilite sua proteção com facilidade e rotina.",
                        icon: <ThumbsUp className="w-5 h-5" />
                      }
                    ].map((item, idx) => {
                      // Alternância: 0, 2 em cima | 1, 3 embaixo
                      const isAbove = idx % 2 === 0;
                      return (
                        <Reveal key={idx} delay={idx * 150} className="relative flex justify-center">
                          <div className={`relative flex flex-col items-center ${isAbove ? "mb-auto -translate-y-[100%] md:-translate-y-[110%]" : "mt-auto translate-y-[100%] md:translate-y-[110%]"}`}>

                            {/* Linha Conectora e Bolinha */}
                            <div className={`absolute left-1/2 -translate-x-1/2 w-[2px] bg-primary/40 ${isAbove ? "top-full h-16 md:h-24 lg:h-32" : "bottom-full h-16 md:h-24 lg:h-32"}`}>
                              <div className={`absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rounded-full shadow-[0_0_15px_rgba(34,197,94,0.6)] border-2 border-white ${isAbove ? "bottom-0" : "top-0"}`}></div>
                            </div>

                            {/* Card Glassmorphism */}
                            <div className="bg-white/10 backdrop-blur-xl p-5 lg:p-6 rounded-2xl border border-white/25 shadow-2xl w-[280px] lg:w-[320px] group hover:bg-white transition-all duration-500 hover:scale-105">
                              <div className="flex items-center gap-4 mb-3">
                                <div className="w-10 h-10 bg-primary/20 text-primary rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                  {item.icon}
                                </div>
                                <h3 className="text-sm lg:text-base font-black text-slate-900 leading-tight">{item.title}</h3>
                              </div>
                              <p className="text-[11px] lg:text-xs text-slate-700 font-bold leading-relaxed">{item.desc}</p>
                            </div>
                          </div>
                        </Reveal>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>{/* end desktop diferenciais wrapper */}
      </section>


      {/* 5. Depoimentos e Autoridade (Rodrigo Campelo) */}
      <section id="consultor" className="scroll-mt-20 relative overflow-hidden">

        {/* ── MOBILE CONSULTOR (< md) ── */}
        <div className="md:hidden bg-white px-5 py-14">
          <Reveal>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold text-slate-900 mb-3 leading-tight">
                Quem pedala com segurança,{" "}
                <span className="text-primary">recomenda.</span>
              </h2>
              <p className="text-sm text-slate-500 mb-6">Confiança comprovada por quem já contratou.</p>

              {/* Badge Google Global - MOBILE */}
              <div className="flex items-center justify-center gap-2 mb-2 bg-slate-50 border border-slate-200/60 py-2.5 px-5 rounded-full w-fit mx-auto shadow-sm">
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className="w-4 h-4" />
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
                </div>
                <span className="text-[11px] font-black text-slate-700 uppercase tracking-wider">5.0 • Google Reviews</span>
              </div>
            </div>
          </Reveal>

          {/* Reviews simplificados */}
          <div className="space-y-3 mb-8">
            {[
              { initials: "FM", name: "Felipe Monteiro", sub: "Local Guide", review: "\"Rodrigo foi extremamente claro, atencioso e profissional em todas as etapas.\"" },
              { initials: "PS", name: "Paulo Saraiva", sub: "Local Guide", review: "\"Super indico o Rodrigo! Me ajudou em todas as atribulações que tive na seguradora.\"" },
              { initials: "EP", name: "Edmar Pedras", sub: "2 reviews", review: "\"Atendimento de alto nível de qualidade, com cuidado em cada detalhe.\"" },
            ].map((r, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm flex-shrink-0">{r.initials}</div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">{r.name}</div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, k) => <Star key={k} className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />)}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 italic leading-relaxed mb-3">{r.review}</p>
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-100/50">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2d/Google-favicon-2015.png" alt="Google" className="w-3 h-3 grayscale opacity-40" />
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Publicada no Google</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Rodrigo Card compacto */}
          <Reveal delay={300}>
            <div className="bg-slate-900 rounded-3xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 blur-2xl" />
              <div className="flex items-center gap-4 mb-5">
                <div className="relative flex-shrink-0">
                  <img src={perfilImg} alt="Rodrigo Campelo" className="w-16 h-16 rounded-2xl object-cover border-2 border-white/20" />
                  <div className="absolute -bottom-1 -right-1 bg-primary w-6 h-6 rounded-lg flex items-center justify-center">
                    <ShieldCheck className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div>
                  <div className="text-lg font-black text-white">Rodrigo Campelo</div>
                  <div className="flex items-center gap-2">
                    <div className="text-primary text-xs font-bold uppercase tracking-wider">Consultor Estratégico</div>
                    <div className="w-1 h-1 rounded-full bg-white/20" />
                    <div className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-md border border-white/5">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/2/2d/Google-favicon-2015.png" alt="G" className="w-2.5 h-2.5 brightness-0 invert opacity-60" />
                      <span className="text-[9px] font-bold text-white/60">5.0</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed mb-5">
                Com expertise em seguros, Rodrigo atua como consultor estratégico, garantindo mais tranquilidade em cada pedal.
              </p>
              <div className="grid grid-cols-2 gap-2 mb-5">
                {["Especialista em bikes", "Atendimento consultivo", "Centenas de clientes", "5★ no Google"].map((b, k) => (
                  <div key={k} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-xs text-slate-300 font-medium">{b}</span>
                  </div>
                ))}
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className="text-xs text-slate-400 italic leading-relaxed">
                  "Minha missão é garantir que você se preocupe apenas com o pedal."
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ── DESKTOP CONSULTOR (≥ md) ── */}
        <div className="hidden md:block py-20 lg:py-32 bg-slate-50 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
              <Reveal>
                <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                  Quem pedala com segurança, <span className="text-primary">recomenda.</span>
                </h2>
                <p className="text-lg text-slate-600 font-medium">
                  Veja o que nossos clientes dizem no Google e conheça quem está por trás do atendimento de excelência da Nef Seguros.
                </p>
              </Reveal>
            </div>
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center overflow-visible">
              <div className="w-full lg:w-1/2 relative space-y-6 lg:space-y-0 h-auto lg:h-[600px] flex flex-col justify-center">

                {/* Review 1 - Felipe Monteiro */}
                <div className="lg:absolute lg:top-0 lg:left-0 w-full lg:max-w-md z-10 transform lg:-rotate-2 transition-all duration-300 hover:z-50">
                  <Reveal delay={100} className="w-full">
                    <div className="bg-white p-6 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 group hover:scale-[1.02] transition-transform duration-300">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 font-bold overflow-hidden">
                            FM
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900">Felipe Monteiro</p>
                            <p className="text-[10px] text-slate-400">Local Guide • 20 reviews</p>
                          </div>
                        </div>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs lg:text-sm text-slate-600 leading-relaxed italic mb-4">
                        "Gostaria de registrar meu agradecimento ao Rodrigo Campêlo pelo excelente atendimento na contratação do meu seguro. Foi extremamente claro, atencioso e profissional em todas as etapas."
                      </p>
                      <div className="flex items-center gap-2 pt-3 border-t border-slate-50">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2d/Google-favicon-2015.png" alt="Google" className="w-3 h-3 grayscale opacity-50" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Google Review</span>
                      </div>
                    </div>
                  </Reveal>
                </div>

                {/* Review 2 - Paulo Saraiva */}
                <div className="lg:absolute lg:top-1/3 lg:left-12 w-full lg:max-w-md z-20 transition-all duration-300 hover:z-50">
                  <Reveal delay={300} className="w-full">
                    <div className="bg-white p-6 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 group hover:scale-[1.02] transition-transform duration-300">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                            PS
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900">Paulo Saraiva</p>
                            <p className="text-[10px] text-slate-400">Local Guide • 14 reviews</p>
                          </div>
                        </div>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs lg:text-sm text-slate-600 leading-relaxed italic mb-4">
                        "Super indico o Rodrigo! Profissional sério e sempre diligente. Me ajudou em todas as atribulações que tive na seguradora. Parabéns pelo excelente trabalho."
                      </p>
                      <div className="flex items-center gap-2 pt-3 border-t border-slate-50">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2d/Google-favicon-2015.png" alt="Google" className="w-3 h-3 grayscale opacity-50" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Google Review</span>
                      </div>
                    </div>
                  </Reveal>
                </div>

                {/* Review 3 - Edmar Pedras */}
                <div className="lg:absolute lg:bottom-4 lg:left-4 w-full lg:max-w-md z-30 transform lg:rotate-2 transition-all duration-300 hover:z-50">
                  <Reveal delay={500} className="w-full">
                    <div className="bg-white p-6 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 group hover:scale-[1.02] transition-transform duration-300">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-white font-bold overflow-hidden">
                            EP
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900">Edmar Pedras</p>
                            <p className="text-[10px] text-slate-400">2 reviews</p>
                          </div>
                        </div>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs lg:text-sm text-slate-600 leading-relaxed italic mb-4">
                        "Rodrigo e equipe prestam atendimento de alto nível de qualidade, com cuidado em cada detalhe. Parabéns pelos excelentes serviços prestados!"
                      </p>
                      <div className="flex items-center gap-2 pt-3 border-t border-slate-50">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2d/Google-favicon-2015.png" alt="Google" className="w-3 h-3 grayscale opacity-50" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Google Review</span>
                      </div>
                    </div>
                  </Reveal>
                </div>
              </div>

              {/* Right Side: Authority Block (Rodrigo Campelo) */}
              <div className="w-full lg:w-1/2 lg:pl-10">
                <Reveal delay={200}>
                  <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-2xl shadow-slate-200/60 border border-slate-100 relative overflow-hidden group">
                    {/* Subtle background decoration */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-primary/10 transition-colors"></div>

                    {/* Card Watermark Logo */}
                    <img
                      src={logoCropado}
                      alt=""
                      className="absolute -right-8 -bottom-8 w-48 h-48 opacity-[0.05] grayscale pointer-events-none z-0"
                    />

                    <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                      {/* Professional Photo */}
                      <div className="flex-shrink-0 relative">
                        <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-lg scale-90 translate-y-3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <img
                          src={perfilImg}
                          alt="Rodrigo Campelo"
                          className="w-24 md:w-32 h-24 md:h-32 rounded-2xl object-cover shadow-lg relative z-10 border-2 border-white transition-all duration-700"
                        />
                        <div className="absolute -bottom-2 -right-2 bg-primary text-white p-1.5 rounded-lg shadow-lg z-20">
                          <ShieldCheck className="w-4 h-4 md:w-5 md:h-5" />
                        </div>
                      </div>

                      {/* Intro */}
                      <div>
                        <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-2 leading-tight">Rodrigo Campelo</h3>
                        <p className="text-primary font-bold text-sm uppercase tracking-widest mb-4">Seu corretor especializado</p>
                        <p className="text-slate-600 leading-relaxed font-medium mb-6">
                          Com expertise em seguros e profundo entendimento das necessidades dos ciclistas, Rodrigo atua como um consultor estratégico, ajudando a encontrar a melhor proteção para cada bicicleta e garantindo mais tranquilidade em cada pedal.
                        </p>
                      </div>
                    </div>

                    {/* Bullet Points */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-8 border-t border-slate-50">
                      {[
                        { text: "Especialista em seguros de bikes", icon: <CheckCircle2 className="w-5 h-5" /> },
                        { text: "Atendimento consultivo personalizado", icon: <CheckCircle2 className="w-5 h-5" /> },
                        { text: "Centenas de clientes protegidos", icon: <CheckCircle2 className="w-5 h-5" /> },
                        { text: "Avaliações 5 estrelas no Google", icon: <CheckCircle2 className="w-5 h-5" /> }
                      ].map((bullet, k) => (
                        <div key={k} className="flex items-center gap-3">
                          <div className="text-primary flex-shrink-0">{bullet.icon}</div>
                          <span className="text-sm font-bold text-slate-800">{bullet.text}</span>
                        </div>
                      ))}
                    </div>

                    {/* Closing Credibility Text */}
                    <div className="mt-10 bg-slate-50 p-6 rounded-2xl border border-slate-100 italic text-slate-600 text-sm leading-relaxed">
                      "Minha missão é garantir que você se preocupe apenas com o pedal, deixando a segurança e a burocracia por nossa conta. Aqui, seu investimento é levado a sério."
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>{/* end desktop consultor wrapper */}
      </section>

      {/* 6. Perguntas Frequentes (FAQ) */}
      <section id="faq" className="relative w-full overflow-hidden scroll-mt-20">

        {/* ── MOBILE FAQ (< md) ── */}
        <div className="md:hidden bg-slate-50 px-5 py-14">
          <Reveal>
            <div className="mb-8">
              <div className="text-primary font-bold text-xs tracking-widest uppercase mb-3">FAQ</div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-3">
                Dúvidas <span className="text-primary">frequentes.</span>
              </h2>
              <p className="text-sm text-slate-500">Tudo que você precisa saber antes de contratar.</p>
            </div>
          </Reveal>
          <div className="space-y-3">
            {[
              { q: "O seguro é muito caro?", a: "O custo é mínimo comparado ao valor da bike. Planos flexíveis e ajustados ao seu orçamento." },
              { q: "A contratação é demorada?", a: "Não! O processo é simplificado com atendimento direto via WhatsApp." },
              { q: "Meu tipo de bike é coberto?", a: "Sim! Cobrimos urbanas, elétricas, alta performance e muito mais." },
              { q: "E se precisar usar o seguro?", a: "Suporte ágil. Você terá todo o apoio para resolver rapidamente." },
            ].map((faq, idx) => (
              <Reveal key={idx} delay={idx * 80}>
                <FAQItem question={faq.q} answer={faq.a} />
              </Reveal>
            ))}
          </div>
        </div>

        {/* ── DESKTOP FAQ (≥ md) ── */}
        <div className="hidden md:block relative w-full py-20 lg:py-32 bg-slate-50">
          <div className="absolute inset-0 z-0">
            <img src={faqBg} alt="Dúvidas e proteção" className="w-full h-full object-cover object-center" />
          </div>
          <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-slate-50 to-transparent z-10 pointer-events-none" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
              <div className="hidden lg:block w-full h-full" />
              <div className="w-full text-left">

                <div className="mb-10 text-left">
                  <Reveal>
                    <div className="text-primary font-bold text-sm tracking-widest uppercase mb-4">FAQ</div>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 drop-shadow-sm">
                      Dúvidas <span className="text-primary">frequentes.</span>
                    </h2>
                    <p className="text-lg text-slate-600 font-medium drop-shadow-sm">
                      Tudo o que você precisa saber para pedalar com mais segurança e tranquilidade.
                    </p>
                  </Reveal>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      q: "O seguro é muito caro?",
                      a: "O custo do seguro é um investimento mínimo comparado ao valor da sua bicicleta e ao prejuízo de uma perda. Nossos planos são flexíveis e ajustados ao seu orçamento, garantindo the melhor custo-benefício."
                    },
                    {
                      q: "A contratação é demorada?",
                      a: "Não! Com a consultoria de Rodrigo Campelo, o processo é simplificado. Focamos na praticidade e agilidade, com atendimento direto via WhatsApp para agilizar sua simulação e contratação."
                    },
                    {
                      q: "Meu tipo de bicicleta é coberto?",
                      a: "Sim! Cobrimos uma ampla gama de modalidades e tipos de bicicletas, desde urbanas até elétricas e de alta performance. Nossa consultoria garante que encontraremos a cobertura perfeita para a sua bike."
                    },
                    {
                      q: "E se eu precisar usar o seguro?",
                      a: "Nosso suporte é ágil e eficiente. Em caso de sinistro, você terá todo o apoio necessário para resolver a situação da forma mais rápida e tranquila possível."
                    }
                  ].map((faq, idx) => (
                    <Reveal key={idx} delay={idx * 100}>
                      <FAQItem question={faq.q} answer={faq.a} />
                    </Reveal>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </div>{/* end desktop faq wrapper */}
      </section>


      {/* Section Break - Infinite Logo Marquee */}
      <div className="bg-white border-y border-slate-100 py-4 flex overflow-hidden w-full relative group">
        <div className="flex gap-20 items-center animate-marquee whitespace-nowrap pr-20">
          {[...Array(2)].map((_, i) => (
            <React.Fragment key={i}>
              {[...Array(10)].map((_, j) => (
                <img
                  key={`${i}-${j}`}
                  src={logoCropado}
                  alt="Nef Seguros"
                  className="h-10 md:h-12 w-auto object-contain transition-all duration-500 hover:scale-110 flex-shrink-0"
                />
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* 7. CTA Final */}
      <section id="contato" className="relative overflow-hidden bg-black scroll-mt-20">

        {/* ── MOBILE CTA (< md) ── */}
        <div className="md:hidden px-5 py-14 relative min-h-[80vh] flex flex-col justify-center overflow-hidden">
          {/* Background Videos Mobile */}
          <div className="absolute inset-0 z-0 bg-black">
            {mobileVideos.map((src, idx) => (
              <video
                key={idx}
                ref={(el) => (mobileVideoRefs.current[idx] = el)}
                src={src}
                muted
                playsInline
                onEnded={() => {
                  if (currentMobileVideo === idx) {
                    setCurrentMobileVideo((prev) => (prev + 1) % mobileVideos.length);
                  }
                }}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ${currentMobileVideo === idx ? "opacity-60" : "opacity-0"}`}
              />
            ))}
          </div>

          {/* Overlays decorativos */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 z-1" />
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/10 blur-3xl z-1" />

          <div className="relative z-10">
            <Reveal>
              <h2 className="text-3xl font-black text-white leading-tight tracking-tight mb-4 uppercase">
                Não Espere o Pior Acontecer.{" "}
                <span className="text-primary">Proteja Sua Paixão Hoje!</span>
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="text-sm text-gray-300 leading-relaxed mb-8">
                Milhares de ciclistas já pedalam com tranquilidade. Não deixe sua paixão à mercê do acaso.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <InlineLeadForm />
            </Reveal>
            <Reveal delay={300}>
              <div className="mt-6 flex flex-col gap-3">
                <a
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 bg-[#25D366] text-white py-4 rounded-2xl font-extrabold text-base shadow-lg shadow-green-900/30 active:scale-95 transition-transform"
                >
                  <Zap className="w-5 h-5 fill-current" />
                  Falar via WhatsApp
                </a>
                <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                  Consultoria Rodrigo Campelo — Sem custo
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ── DESKTOP CTA (≥ md) ── */}
        <div className="hidden md:block relative py-24 lg:py-32 min-h-[90vh]">
          {/* Camada de Background dos 3 vídeos em Loop Sequencial por onEnded */}
          <div className="absolute inset-0 z-0 bg-black overflow-hidden border-none">
            {videos.map((src, idx) => (
              <video
                key={idx}
                ref={(el) => (videoRefs.current[idx] = el)}
                src={src}
                muted
                playsInline
                onEnded={() => {
                  if (currentVideo === idx) {
                    setCurrentVideo((prev) => (prev + 1) % videos.length);
                  }
                }}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms] ${currentVideo === idx ? "opacity-100" : "opacity-0"}`}
              />
            ))}
          </div>

          {/* Overlay Black com opacidade reduzida para contraste (50%) */}
          <div className="absolute inset-0 z-10 bg-black/50"></div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 h-full flex items-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center w-full">
              {/* Esquerda: Texto Puro Alinhado */}
              <div className="text-left text-white max-w-2xl mx-auto lg:mx-0">
                <Reveal>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 tracking-tighter uppercase leading-none text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]">
                    Não Espere o Pior <br className="hidden lg:block" /> Acontecer. <span className="text-primary drop-shadow-[0_5px_15px_rgba(34,197,94,0.4)]">Proteja Sua Paixão Hoje!</span>
                  </h2>
                </Reveal>
                <Reveal delay={150}>
                  <p className="text-lg md:text-2xl font-medium opacity-95 mb-10 leading-relaxed drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)] max-w-lg">
                    Milhares de ciclistas já pedalam com a tranquilidade de ter sua bicicleta protegida. Não deixe seu investimento e sua paixão à mercê do acaso.
                  </p>
                </Reveal>
                <Reveal delay={300}>
                  <div className="flex flex-col sm:flex-row items-start gap-4 text-sm font-bold opacity-100">
                    <div className="flex items-center bg-black/40 backdrop-blur-md px-5 py-3 rounded-full border border-white/20 shadow-xl">
                      <ShieldCheck className="w-5 h-5 mr-3 text-primary" />
                      Consultoria Rodrigo Campelo
                    </div>
                    <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="flex items-center bg-[#25D366] text-white px-5 py-3 rounded-full hover:scale-105 transition-transform shadow-[0_10px_20px_rgba(37,211,102,0.3)]">
                      <Zap className="w-5 h-5 mr-3 fill-current" />
                      Falar via WhatsApp
                    </a>
                  </div>
                </Reveal>
              </div>
              {/* Direita: Formulário Criativo Inline */}
              <div className="w-full flex justify-center lg:justify-end">
                <Reveal delay={200} className="w-full max-w-md xl:max-w-lg">
                  <InlineLeadForm />
                </Reveal>
              </div>
            </div>
          </div>
        </div>{/* end desktop CTA wrapper */}
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border pt-16 pb-8 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <img src={logo} alt="Nef Seguros" className="h-10 w-auto mb-6 opacity-90" />
              <p className="text-muted-foreground max-w-sm mb-6">
                Consultoria especializada liderada por <strong>Rodrigo Campelo</strong>. Proteção pensada exclusivamente para quem leva o ciclismo a sério.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-primary hover:text-white transition-all"><Globe className="w-5 h-5" /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-primary hover:text-white transition-all"><Users className="w-5 h-5" /></a>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-6 underline decoration-primary decoration-4 underline-offset-4">Navegação</h4>
              <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                <ul className="space-y-3">
                  <li><a href="#inicio" className="text-muted-foreground hover:text-primary transition-colors text-sm font-bold">Início</a></li>
                  <li><a href="#riscos" className="text-muted-foreground hover:text-primary transition-colors text-sm font-bold">Riscos</a></li>
                  <li><a href="#planos" className="text-muted-foreground hover:text-primary transition-colors text-sm font-bold">Modalidades</a></li>
                  <li><a href="#coberturas" className="text-muted-foreground hover:text-primary transition-colors text-sm font-bold">Coberturas</a></li>
                </ul>
                <ul className="space-y-3">
                  <li><a href="#sobre" className="text-muted-foreground hover:text-primary transition-colors text-sm font-bold">Diferenciais</a></li>
                  <li><a href="#consultor" className="text-muted-foreground hover:text-primary transition-colors text-sm font-bold">Especialista</a></li>
                  <li><a href="#faq" className="text-muted-foreground hover:text-primary transition-colors text-sm font-bold">FAQ</a></li>
                  <li><Link to="/login" className="text-muted-foreground/60 hover:text-primary transition-colors text-xs font-semibold">Acesso Admin</Link></li>
                </ul>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-6 underline decoration-primary decoration-4 underline-offset-4">Consultoria</h4>
              <ul className="space-y-3">
                <li className="text-muted-foreground text-sm font-medium"><strong>Rodrigo Campelo</strong></li>
                <li className="text-muted-foreground text-sm font-medium">atendimento@nefseguros.com.br</li>
                <li>
                  <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-primary font-bold hover:underline">
                    Falar via WhatsApp
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              © {new Date().getFullYear()} Nef Seguros. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

      <LeadCaptureModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Index;
                </li >
              </ul >
            </div >
          </div >
  <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between">
    <p className="text-sm text-muted-foreground mb-4 md:mb-0">
      © {new Date().getFullYear()} Nef Seguros. Todos os direitos reservados.
    </p>
  </div>
        </div >
      </footer >

  <LeadCaptureModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div >
  );
};

export default Index;
