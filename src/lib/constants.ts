export const EVENT = {
  name: "X-Zone",
  fullName: "X-Zone 2026",
  tagline: "O Maior Evento Gamer e Geek de Goiânia",
  date: "05 de Setembro de 2026",
  dateISO: "2026-09-05T10:00:00-03:00",
  endISO: "2026-09-05T22:00:00-03:00",
  time: "10h às 22h",
  location: "Goiânia, GO",
  audience: "3.000 a 5.000 pessoas",
};

export const TICKET_TYPES = [
  {
    id: "1",
    name: "Inteira",
    description: "Acesso completo ao evento",
    price: 60,
    color: "xz-green",
    available: true,
    perks: ["Acesso a todas as áreas", "Participação nos torneios gratuitos", "Área Free-Play ilimitada"],
  },
  {
    id: "2",
    name: "Meia-Entrada",
    description: "Estudante, idoso ou PCD (apresentar documento)",
    price: 30,
    color: "xz-lime",
    available: true,
    perks: ["Acesso a todas as áreas", "Participação nos torneios gratuitos", "Área Free-Play ilimitada"],
  },
  {
    id: "3",
    name: "VIP",
    description: "Experiência premium com benefícios exclusivos",
    price: 120,
    color: "xz-yellow",
    available: true,
    featured: true,
    perks: [
      "Acesso a todas as áreas",
      "Área VIP exclusiva",
      "Meet & Greet com convidados",
      "Brinde exclusivo X-Zone",
      "Prioridade no credenciamento",
      "Lanche incluso",
    ],
  },
];

export const SCHEDULE = [
  { time: "10h00", title: "Abertura Oficial", type: "palco", highlight: true },
  { time: "10h30", title: "Início Torneios (MK · FC26 · Just Dance · Clash Royale)", type: "torneio" },
  { time: "10h30", title: "Free-Play liberado (Consoles, Retro, VR)", type: "freeplay" },
  { time: "11h00", title: "Board Games & Sword Play", type: "geek" },
  { time: "11h30", title: "Oficina de Cosplay", type: "geek" },
  { time: "12h00", title: "Round 6 (Squid Game)", type: "torneio" },
  { time: "12h30", title: "Gincanas e Interações com o Público", type: "palco" },
  { time: "13h00", title: "Guerra de Varetas", type: "torneio" },
  { time: "13h30", title: "Qual é a Música? (com Emojis)", type: "geek" },
  { time: "14h00", title: "Painel de Creators", type: "palco", highlight: true },
  { time: "15h00", title: "Museu de Jogos + Concurso de Desenho", type: "geek" },
  { time: "15h30", title: "Semifinais dos Torneios", type: "torneio", highlight: true },
  { time: "16h30", title: "Entrevista com Convidado Especial", type: "palco", highlight: true },
  { time: "17h30", title: "Karaokê Geek Especial", type: "geek" },
  { time: "18h00", title: "Fotos Cosplay + Meet & Greet", type: "cosplay" },
  { time: "18h30", title: "Desfile de Cosplay (Concurso Oficial)", type: "cosplay", highlight: true },
  { time: "19h30", title: "Finais dos Torneios", type: "torneio", highlight: true },
  { time: "20h30", title: "Premiações Oficiais", type: "palco", highlight: true },
  { time: "21h30", title: "Encerramento", type: "palco" },
];

export const GUESTS = [
  {
    id: "feh-dubs",
    name: "Feh Dubs",
    role: "Atriz · Dubladora · Criadora de Conteúdo",
    bio: "Conhecida artisticamente como Feh Dubs / Feh Dantas. Nascida em 2006, no Rio de Janeiro, iniciou na dublagem em 2024 com crescimento rápido na indústria. Fundou a Feh Dubs Produções focada em dublagem e conteúdo digital.",
    works: [
      "Shijima Mei — Hanako-kun",
      "Sol — O Incrível Circo Digital",
      "Shierra — Mushoku Tensei",
      "Ururu Fleur — The Wrong Way to Use Healing Magic",
    ],
    socials: { instagram: true, tiktok: true, youtube: true },
    gradient: "from-[#20CD5C] to-[#B3F54E]",
  },
  {
    id: "francisco-junior",
    name: "Francisco Júnior",
    role: "Dublador Nacional",
    bio: "Dublador brasileiro reconhecido nacionalmente. Conhecido por interpretar personagens fortes e icônicos. Voz marcante dentro da nova geração da dublagem, consolidou seu nome entre os dubladores mais lembrados pelo público geek.",
    works: [
      "Escanor — The Seven Deadly Sins",
      "Sukuna — Jujutsu Kaisen",
      "Aquaman — Aquaman",
      "Sir Crocodile — One Piece",
      "Kokushibo — Kimetsu no Yaiba",
    ],
    socials: { instagram: true, tiktok: true, youtube: false },
    gradient: "from-[#B3F54E] to-[#D0FA40]",
  },
  {
    id: "core",
    name: "Core das Antigas",
    role: "Criador de Conteúdo Digital",
    bio: "Reconhecido pelo seu humor, carisma e conteúdos voltados ao universo geek, nostalgia e jogos de terror. Cresceu através de conteúdos sobre FNAF, animes clássicos e nostalgia da internet.",
    works: [
      "Conteúdo sobre FNAF e jogos de terror",
      "Vídeos sobre animes clássicos e atuais",
      "Humor e nostalgia da internet",
      "Lives e interação com a comunidade",
    ],
    socials: { instagram: true, tiktok: true, youtube: true },
    gradient: "from-[#D0FA40] to-[#20CD5C]",
  },
];

export const PARTNERS = [
  { name: "Escola Saga", category: "Educação" },
  { name: "GoGo Games", category: "Games" },
  { name: "Interactive", category: "Tecnologia" },
  { name: "LIG Games", category: "Games" },
  { name: "Level", category: "Games" },
  { name: "RAFS", category: "Parceiro" },
];

export const STATS = [
  { value: "5.000+", label: "Pessoas Esperadas", icon: "users" },
  { value: "12h", label: "De Experiência Contínua", icon: "clock" },
  { value: "30+", label: "Atrações e Atividades", icon: "star" },
  { value: "6", label: "Áreas Temáticas", icon: "map" },
];

export const FAQS = [
  {
    q: "Como funciona a entrada no evento?",
    a: "Ao comprar seu ingresso, você receberá um e-mail com seu QR Code pessoal. Na entrada do evento, basta apresentar o QR Code pelo celular ou impresso para validação.",
  },
  {
    q: "Qual é a classificação etária do evento?",
    a: "O evento é para todas as idades. Menores de 12 anos devem estar acompanhados de responsável.",
  },
  {
    q: "Como funciona a meia-entrada?",
    a: "Estudantes, idosos (60+) e PCD têm direito à meia-entrada mediante apresentação de documento comprobatório na entrada do evento.",
  },
  {
    q: "Posso transferir meu ingresso para outra pessoa?",
    a: "Sim! O ingresso é nominativo, mas pode ser transferido com antecedência mínima de 48 horas pelo e-mail do suporte.",
  },
  {
    q: "Os torneios têm custo adicional?",
    a: "Os torneios básicos estão inclusos no ingresso. Torneios com premiação em dinheiro podem ter uma taxa de inscrição separada.",
  },
  {
    q: "Preciso me inscrever antecipadamente nos torneios?",
    a: "As pré-inscrições abrem 15 dias antes do evento. Inscrições no local também estão disponíveis, mas sujeitas a vagas.",
  },
  {
    q: "Haverá estacionamento no local?",
    a: "Informações sobre o local e estacionamento serão divulgadas nas redes sociais do evento com 30 dias de antecedência.",
  },
  {
    q: "Posso cancelar meu ingresso?",
    a: "Cancelamentos são aceitos com até 7 dias de antecedência do evento para reembolso integral. Entre em contato pelo e-mail de suporte.",
  },
];
