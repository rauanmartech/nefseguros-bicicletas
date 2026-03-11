import * as fs from "fs";
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";

const doc = new Document({
    sections: [
        {
            properties: {},
            children: [
                new Paragraph({
                    text: "Copy da Landing Page - Nef Seguros",
                    heading: HeadingLevel.TITLE,
                }),

                new Paragraph({ text: "", spacing: { after: 200 } }),

                // 1. Hero Section
                new Paragraph({
                    text: "1. Headline (Hero Section)",
                    heading: HeadingLevel.HEADING_1,
                }),
                new Paragraph({
                    children: [
                        new TextRun({ text: "Título: ", bold: true }),
                        new TextRun("Não deixe o medo roubar sua paixão."),
                    ],
                }),
                new Paragraph({
                    children: [
                        new TextRun({ text: "Subtítulo: ", bold: true }),
                        new TextRun("Proteja sua bicicleta e pedale com a liberdade que você merece. Descubra a proteção ideal com a consultoria personalizada de Rodrigo Campelo."),
                    ],
                }),
                new Paragraph({
                    text: "Benefícios em destaque:"
                }),
                new Paragraph({ text: "- Consultoria Especializada Rodrigo Campelo", bullet: { level: 0 } }),
                new Paragraph({ text: "- Proteção contra Roubo, Furto e Acidentes", bullet: { level: 0 } }),
                new Paragraph({ text: "- Menos burocracia, mais segurança", bullet: { level: 0 } }),
                new Paragraph({
                    children: [
                        new TextRun({ text: "CTA: ", bold: true }),
                        new TextRun("SIMULAR AGORA E GARANTIR MINHA PROTEÇÃO (Leva menos de 2 minutos)"),
                    ],
                }),

                new Paragraph({ text: "", spacing: { after: 200 } }),

                // Destaques (Marquee)
                new Paragraph({
                    text: "Destaques Rápidos (Barra rotativa)",
                    heading: HeadingLevel.HEADING_2,
                }),
                new Paragraph({ text: "Consultoria Especializada • Atendimento Humanizado • Menos Burocracia • Praticidade Real" }),

                new Paragraph({ text: "", spacing: { after: 200 } }),

                // 2. Riscos
                new Paragraph({
                    text: "2. Seção de Tensão (Riscos)",
                    heading: HeadingLevel.HEADING_1,
                }),
                new Paragraph({
                    children: [
                        new TextRun({ text: "Título: ", bold: true }),
                        new TextRun("Sua bicicleta pode estar em risco… ou totalmente protegida."),
                    ],
                }),
                new Paragraph({
                    children: [
                        new TextRun({ text: "Subtítulo: ", bold: true }),
                        new TextRun("A diferença entre pedalar com preocupação ou com tranquilidade pode ser apenas uma decisão."),
                    ],
                }),
                new Paragraph({ text: "Sem Seguro:", bold: true }),
                new Paragraph({ text: "⚠️ Roubo em segundos", bullet: { level: 0 } }),
                new Paragraph({ text: "💥 Acidentes acontecem", bullet: { level: 0 } }),
                new Paragraph({ text: "💸 Prejuízo total", bullet: { level: 0 } }),
                new Paragraph({ text: "Com Seguro:", bold: true }),
                new Paragraph({ text: "🛡️ Proteção contra roubo", bullet: { level: 0 } }),
                new Paragraph({ text: "🔧 Cobertura para danos", bullet: { level: 0 } }),
                new Paragraph({ text: "✅ Pedale com tranquilidade", bullet: { level: 0 } }),

                new Paragraph({ text: "", spacing: { after: 200 } }),

                // 3. Modalidades
                new Paragraph({
                    text: "3. Modalidades de Bicicletas",
                    heading: HeadingLevel.HEADING_1,
                }),
                new Paragraph({
                    children: [
                        new TextRun({ text: "Título: ", bold: true }),
                        new TextRun("Seguro para todos os tipos de pedal."),
                    ],
                }),
                new Paragraph({
                    children: [
                        new TextRun({ text: "Subtítulo: ", bold: true }),
                        new TextRun("A Nef Seguros oferece proteção especializada para diferentes modalidades de ciclismo."),
                    ],
                }),
                new Paragraph({ text: "Tipos de Bikes:", bold: true }),
                new Paragraph({ text: "- Speed / Road", bullet: { level: 0 } }),
                new Paragraph({ text: "- Mountain Bike (MTB)", bullet: { level: 0 } }),
                new Paragraph({ text: "- Ciclismo Urbano", bullet: { level: 0 } }),
                new Paragraph({ text: "- Trial / BMX", bullet: { level: 0 } }),
                new Paragraph({ text: "- E-bikes (Elétricas)", bullet: { level: 0 } }),
                new Paragraph({ text: "- Triathlon / Fixas", bullet: { level: 0 } }),
                new Paragraph({
                    children: [
                        new TextRun({ text: "CTA: ", bold: true }),
                        new TextRun("Quero proteger minha bicicleta"),
                    ],
                }),

                new Paragraph({ text: "", spacing: { after: 200 } }),

                // 4. Coberturas
                new Paragraph({
                    text: "4. Coberturas do Seguro",
                    heading: HeadingLevel.HEADING_1,
                }),
                new Paragraph({
                    children: [
                        new TextRun({ text: "Título: ", bold: true }),
                        new TextRun("O que o seguro pode cobrir"),
                    ],
                }),
                new Paragraph({ text: "Roubo e Furto: Proteção total contra roubo ou furto qualificado em qualquer lugar.", bullet: { level: 0 } }),
                new Paragraph({ text: "Danos Acidentais: Reparos e peças em caso de colisões, quedas ou acidentes de trânsito.", bullet: { level: 0 } }),
                new Paragraph({ text: "Acidentes Pessoais: Cobertura para o ciclista: despesas médicas, invalidez ou morte acidental.", bullet: { level: 0 } }),
                new Paragraph({ text: "Transporte: Segurança na locomoção em racks, transbike ou dentro do veículo.", bullet: { level: 0 } }),
                new Paragraph({ text: "Responsabilidade Civil: Proteção contra danos causados a terceiros durante a pedalada.", bullet: { level: 0 } }),
                new Paragraph({ text: "Extensão Exterior: Sua proteção te acompanha em competições ou treinos internacionais.", bullet: { level: 0 } }),
                new Paragraph({
                    children: [
                        new TextRun({ text: "CTA: ", bold: true }),
                        new TextRun("SIMULAR SEGURO AGORA"),
                    ],
                }),

                new Paragraph({ text: "", spacing: { after: 200 } }),

                // 5. Diferenciais
                new Paragraph({
                    text: "5. Seção de Diferenciais",
                    heading: HeadingLevel.HEADING_1,
                }),
                new Paragraph({
                    children: [
                        new TextRun({ text: "Título: ", bold: true }),
                        new TextRun("O diferencial Nef Seguros"),
                    ],
                }),
                new Paragraph({
                    children: [
                        new TextRun({ text: "Subtítulo: ", bold: true }),
                        new TextRun("Consultoria feita por quem entende de seguros para garantir sua total proteção."),
                    ],
                }),
                new Paragraph({ text: "Curadoria Especializada: Analisamos as principais seguradoras para o seu perfil e bike.", bullet: { level: 0 } }),
                new Paragraph({ text: "Atendimento Humanizado: Fale diretamente com a equipe da Nef Seguros, não com um robô.", bullet: { level: 0 } }),
                new Paragraph({ text: "Menos Burocracia: Te ajudamos em toda a jornada, da simulação ao sinistro.", bullet: { level: 0 } }),
                new Paragraph({ text: "Praticidade: Habilite e desabilite sua proteção com facilidade e rotina.", bullet: { level: 0 } }),

                new Paragraph({ text: "", spacing: { after: 200 } }),

                // 6. Autoridade
                new Paragraph({
                    text: "6. Autoridade e Depoimentos (Rodrigo Campelo)",
                    heading: HeadingLevel.HEADING_1,
                }),
                new Paragraph({
                    children: [
                        new TextRun({ text: "Título: ", bold: true }),
                        new TextRun("Quem pedala com segurança, recomenda."),
                    ],
                }),
                new Paragraph({
                    children: [
                        new TextRun({ text: "Subtítulo: ", bold: true }),
                        new TextRun("Veja o que nossos clientes dizem no Google e conheça quem está por trás do atendimento de excelência da Nef Seguros."),
                    ],
                }),
                new Paragraph({ text: "Depoimentos:", bold: true }),
                new Paragraph({ text: '"Gostaria de registrar meu agradecimento ao Rodrigo Campêlo pelo excelente atendimento na contratação do meu seguro. Foi extremamente claro, atencioso e profissional em todas as etapas." - Felipe Monteiro', bullet: { level: 0 } }),
                new Paragraph({ text: '"Super indico o Rodrigo! Profissional sério e sempre diligente. Me ajudou em todas as atribulações que tive na seguradora. Parabéns pelo excelente trabalho." - Paulo Saraiva', bullet: { level: 0 } }),
                new Paragraph({ text: '"Rodrigo e equipe prestam atendimento de alto nível de qualidade, com cuidado em cada detalhe. Parabéns pelos excelentes serviços prestados!" - Edmar Pedras', bullet: { level: 0 } }),

                new Paragraph({ text: "", spacing: { after: 100 } }),

                new Paragraph({
                    children: [
                        new TextRun({ text: "Sobre o Rodrigo Campelo: ", bold: true }),
                        new TextRun("Com expertise em seguros e profundo entendimento das necessidades dos ciclistas, Rodrigo atua como um consultor estratégico, ajudando a encontrar a melhor proteção para cada bicicleta e garantindo mais tranquilidade em cada pedal."),
                    ],
                }),
                new Paragraph({ text: "- Especialista em seguros de bikes", bullet: { level: 0 } }),
                new Paragraph({ text: "- Atendimento consultivo personalizado", bullet: { level: 0 } }),
                new Paragraph({ text: "- Centenas de clientes protegidos", bullet: { level: 0 } }),
                new Paragraph({ text: "- Avaliações 5 estrelas no Google", bullet: { level: 0 } }),
                new Paragraph({ text: 'Aspas do Rodrigo: "Minha missão é garantir que você se preocupe apenas com o pedal, deixando a segurança e a burocracia por nossa conta. Aqui, seu investimento é levado a sério."', italic: true }),

                new Paragraph({ text: "", spacing: { after: 200 } }),

                // 7. FAQ
                new Paragraph({
                    text: "7. Perguntas Frequentes (FAQ)",
                    heading: HeadingLevel.HEADING_1,
                }),
                new Paragraph({
                    children: [
                        new TextRun({ text: "Título: ", bold: true }),
                        new TextRun("Dúvidas frequentes."),
                    ],
                }),
                new Paragraph({
                    children: [
                        new TextRun({ text: "Subtítulo: ", bold: true }),
                        new TextRun("Tudo o que você precisa saber para pedalar com mais segurança e tranquilidade."),
                    ],
                }),
                new Paragraph({ text: "P: O seguro é muito caro?", bold: true }),
                new Paragraph({ text: "R: O custo do seguro é um investimento mínimo comparado ao valor da sua bicicleta e ao prejuízo de uma perda. Nossos planos são flexíveis e ajustados ao seu orçamento, garantindo the melhor custo-benefício." }),
                new Paragraph({ text: "P: A contratação é demorada?", bold: true }),
                new Paragraph({ text: "R: Não! Com a consultoria de Rodrigo Campelo, o processo é simplificado. Focamos na praticidade e agilidade, com atendimento direto via WhatsApp para agilizar sua simulação e contratação." }),
                new Paragraph({ text: "P: Meu tipo de bicicleta é coberto?", bold: true }),
                new Paragraph({ text: "R: Sim! Cobrimos uma ampla gama de modalidades e tipos de bicicletas, desde urbanas até elétricas e de alta performance. Nossa consultoria garante que encontraremos a cobertura perfeita para a sua bike." }),
                new Paragraph({ text: "P: E se eu precisar usar o seguro?", bold: true }),
                new Paragraph({ text: "R: Nosso suporte é ágil e eficiente. Em caso de sinistro, você terá todo o apoio necessário para resolver a situação da forma mais rápida e tranquila possível." }),

                new Paragraph({ text: "", spacing: { after: 200 } }),

                // 8. CTA Final
                new Paragraph({
                    text: "8. CTA Final",
                    heading: HeadingLevel.HEADING_1,
                }),
                new Paragraph({
                    children: [
                        new TextRun({ text: "Título: ", bold: true }),
                        new TextRun("Não Espere o Pior Acontecer. Proteja Sua Paixão Hoje!"),
                    ],
                }),
                new Paragraph({ text: "Milhares de ciclistas já pedalam com a tranquilidade de ter sua bicicleta protegida. Não deixe seu investimento e sua paixão à mercê do acaso." }),
                new Paragraph({
                    children: [
                        new TextRun({ text: "Formulário de Captura: ", bold: true }),
                        new TextRun("Receba sua simulação gratuita (Preencha rapidamente os dados e deixe que a gente te chama no WhatsApp)"),
                    ],
                }),
                new Paragraph({ text: "- Nome completo", bullet: { level: 0 } }),
                new Paragraph({ text: "- WhatsApp", bullet: { level: 0 } }),
                new Paragraph({ text: "- Data de Aniversário", bullet: { level: 0 } }),
                new Paragraph({ text: "- Email (opcional)", bullet: { level: 0 } }),
                new Paragraph({ text: "- Sua Cidade", bullet: { level: 0 } }),
                new Paragraph({ text: "- UF", bullet: { level: 0 } }),
                new Paragraph({ text: "- Possui bike?", bullet: { level: 0 } }),
                new Paragraph({ text: "- Valor aprox. da bike", bullet: { level: 0 } }),
                new Paragraph({ text: "- Tipo de pedal frequente", bullet: { level: 0 } }),
                new Paragraph({ text: "- Marca/modelo da bike (opcional)", bullet: { level: 0 } }),
                new Paragraph({ text: "- Possui seguro atualmente?", bullet: { level: 0 } }),
                new Paragraph({
                    children: [
                        new TextRun({ text: "Botão Submeter do Formulário: ", bold: true }),
                        new TextRun("QUERO MINHA SIMULAÇÃO"),
                    ],
                }),
                new Paragraph({ text: "", spacing: { after: 100 } }),
                new Paragraph({ text: "Botões de Contato Adicionais:", bold: true }),
                new Paragraph({ text: "- Consultoria Rodrigo Campelo", bullet: { level: 0 } }),
                new Paragraph({ text: "- Fale com Rodrigo pelo WhatsApp", bullet: { level: 0 } }),
            ],
        },
    ],
});

Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("Copy_Landing_Page.docx", buffer);
    console.log("Documento DOCX criado com sucesso: Copy_Landing_Page.docx");
});
