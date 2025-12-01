export interface Event {
  id: number;
  title: string;
  image: string;
  date: string;
  fullDate: string;
  time: string;
  location: string;
  category: string;
  organizer: string;
  price: string;
  description: string;
  fullDescription: string[];
}

export const eventsData: Event[] = [
  {
    id: 1,
    title: "Festival das Rosas 2025",
    image: "https://images.unsplash.com/photo-1656701858200-46341576b29e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5rJTIwcm9zZXMlMjBnYXJkZW58ZW58MXx8fHwxNzYyMTQyMjc1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    date: "15 a 22 de maio",
    fullDate: "15 a 22 de maio de 2025",
    time: "09h às 22h",
    location: "Vários pontos da cidade",
    category: "Cultura",
    organizer: "Prefeitura Municipal",
    price: "Gratuito",
    description: "A tradicional Festa das Rosas celebra Barbacena como a Cidade das Rosas com exposições, shows e feiras.",
    fullDescription: [
      "A tradicional Festa das Rosas de Barbacena retorna em 2025 em sua 31ª edição, prometendo uma semana inteira de celebração da cultura e tradição local. O evento acontecerá entre os dias 15 e 22 de maio, coincidindo com o período de floração das roseiras que embelezam a cidade.",
      "Durante toda a semana, diversos pontos estratégicos da cidade receberão exposições de flores, shows musicais, apresentações culturais, feiras de artesanato e gastronomia. A Praça da Estação será o ponto central do evento, onde ficará montada a exposição principal com milhares de rosas de diferentes variedades.",
      "Este ano, a programação conta com atrações especiais: workshops sobre cultivo de rosas e paisagismo ministrados por especialistas renomados, concurso de jardins residenciais, desfile de carros alegóricos decorados com flores, e shows noturnos com artistas locais e regionais.",
      "O Festival das Rosas não é apenas uma celebração estética, mas também representa a importância econômica da floricultura para Barbacena, que é um dos principais polos produtores de rosas do Brasil. Produtores de todo o estado estarão presentes compartilhando conhecimento e mostrando suas produções.",
      "A entrada é gratuita em todas as atrações. A organização recomenda chegar cedo aos pontos principais devido à grande movimentação esperada. Estacionamentos especiais serão disponibilizados nas proximidades dos locais do evento."
    ]
  },
  {
    id: 2,
    title: "Show Os Serranos - 10 Anos",
    image: "https://images.unsplash.com/photo-1709731191876-899e32264420?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwc3RhZ2UlMjBsaWdodHN8ZW58MXx8fHwxNzYyMDc4Njk4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    date: "9 de novembro",
    fullDate: "9 de novembro de 2025",
    time: "20h",
    location: "Centro Cultural de Barbacena",
    category: "Música",
    organizer: "Centro Cultural",
    price: "R$ 30 (inteira) / R$ 15 (meia)",
    description: "Celebração de 10 anos da banda Os Serranos com repertório especial e participações surpresa.",
    fullDescription: [
      "A banda Os Serranos, um dos grandes nomes da música autoral de Barbacena, celebra uma década de carreira com um show especial no Centro Cultural. O evento marca não apenas o aniversário da banda, mas também representa o amadurecimento de um som único que mistura rock, blues e elementos da música regional mineira.",
      "Formada em 2015 por cinco músicos apaixonados pela cidade e pela música de raiz, a banda conquistou uma legião de fãs em toda a região. O repertório da noite incluirá os maiores sucessos do grupo, como 'Serra da Mantiqueira', 'Caminho de Pedra' e 'Noites de Barbacena', além de releituras de clássicos da MPB.",
      "Miguel Oliveira, vocalista e fundador da banda, promete emoções: 'Preparamos algo muito especial para essa noite. Teremos participações surpresa de artistas amigos que nos acompanharam nessa jornada, e vamos tocar músicas inéditas do nosso próximo álbum.'",
      "O Centro Cultural passou por melhorias recentes em seu sistema de som e iluminação, garantindo uma experiência sonora de alta qualidade para o público. O espaço comporta 500 pessoas e conta com bar completo e área de convivência.",
      "Os ingressos podem ser adquiridos na bilheteria do Centro Cultural (de terça a sábado, das 14h às 20h) ou pelo site oficial do evento. Estudantes, idosos e professores têm direito à meia-entrada mediante apresentação de documento. O evento tem classificação livre e recomenda-se chegar com antecedência."
    ]
  },
  {
    id: 3,
    title: "Arte no Parque - Edição de Novembro",
    image: "https://images.unsplash.com/photo-1629329087638-c1c7aaca4138?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxhbmRzY2FwZSUyMGJyYXppbHxlbnwxfHx8fDE3NjIxNjkzMDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    date: "3 de novembro",
    fullDate: "3 de novembro de 2025",
    time: "09h às 17h",
    location: "Parque Municipal",
    category: "Arte",
    organizer: "Secretaria de Cultura",
    price: "Gratuito",
    description: "Exposição mensal de artistas locais ao ar livre com obras de pintura, escultura e fotografia.",
    fullDescription: [
      "O projeto Arte no Parque retorna para sua edição de novembro trazendo uma cuidadosa seleção de obras de artistas locais e regionais. O evento acontece no primeiro domingo do mês no Parque Municipal, transformando o espaço verde em uma galeria de arte a céu aberto.",
      "Nesta edição, a curadoria da professora e artista plástica Beatriz Fernandes destaca especialmente artistas emergentes da região, proporcionando visibilidade para talentos que muitas vezes não têm acesso a galerias tradicionais. Serão mais de 30 artistas expondo trabalhos em diversas técnicas e estilos.",
      "Entre os destaques desta edição, estão as esculturas em madeira de eucalipto de Marcos Vieira, que retratam cenas do cotidiano rural da região com um realismo impressionante. As pinturas abstratas de Júlia Campos também prometem chamar atenção pela técnica apurada e uso de cores vibrantes.",
      "A programação inclui ainda apresentações de música ao vivo durante todo o dia, oficinas gratuitas de desenho para crianças, e uma área gastronômica com food trucks oferecendo comida típica mineira. É uma excelente oportunidade para passar um domingo em família apreciando arte e natureza.",
      "O evento é totalmente gratuito e aberto ao público. Recomenda-se levar protetor solar, água e roupas confortáveis. O Parque Municipal conta com estacionamento próprio e fácil acesso por transporte público. Em caso de chuva, o evento será transferido para o próximo domingo."
    ]
  },
  {
    id: 4,
    title: "Torneio Regional de Futebol",
    image: "https://images.unsplash.com/photo-1599446419264-122a20fc6508?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW9wbGUlMjBwbGF5aW5nJTIwc29jY2VyfGVufDF8fHx8MTc2MjE3MDExNHww&ixlib=rb-4.1.0&q=80&w=1080",
    date: "10 de novembro",
    fullDate: "10 de novembro de 2025",
    time: "16h",
    location: "Estádio Municipal",
    category: "Esporte",
    organizer: "Liga Regional de Futebol",
    price: "R$ 20 (inteira) / R$ 10 (meia)",
    description: "Jogo decisivo pelo campeonato estadual com o time de Barbacena buscando o título.",
    fullDescription: [
      "O Estádio Municipal de Barbacena será palco de um confronto decisivo pelo campeonato estadual neste domingo. O time local, que vem fazendo uma campanha surpreendente, enfrenta o segundo colocado em uma partida que pode definir o futuro da competição.",
      "Com quatro vitórias consecutivas e uma defesa sólida que sofreu apenas dois gols nos últimos cinco jogos, o time barbacenense chega embalado para o confronto. O destaque da equipe continua sendo o jovem atacante Rafael Silva, artilheiro isolado do campeonato com 12 gols.",
      "O técnico João Mendes tem trabalhado intensamente com o elenco durante a semana, focando especialmente na estratégia defensiva. 'Sabemos que será um jogo difícil, mas estamos preparados. Jogar em casa, com nossa torcida, é sempre um diferencial importante', declarou o treinador em coletiva.",
      "A diretoria do clube espera casa cheia e pede que a torcida chegue cedo para evitar filas. O estádio passa por melhorias constantes e agora conta com arquibancadas renovadas, banheiros reformados e lanchonetes modernizadas. A capacidade é de 8.000 pessoas.",
      "Ingressos podem ser adquiridos na bilheteria do estádio até o horário do jogo ou antecipadamente em pontos de venda credenciados pela cidade. Crianças até 10 anos e idosos acima de 60 anos não pagam. A organização recomenda o uso de transporte público devido à grande movimentação esperada."
    ]
  },
  {
    id: 5,
    title: "Feira de Orgânicos e Artesanato",
    image: "https://images.unsplash.com/photo-1648856046245-320fa00c4194?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmF6aWxpYW4lMjBzdHJlZXQlMjBmb29kfGVufDF8fHx8MTc2MjE3MDExM3ww&ixlib=rb-4.1.0&q=80&w=1080",
    date: "Todos os sábados",
    fullDate: "Todos os sábados de novembro",
    time: "07h às 13h",
    location: "Praça da Estação",
    category: "Gastronomia",
    organizer: "Cooperativa de Produtores Locais",
    price: "Gratuito (entrada)",
    description: "Feira semanal com produtos orgânicos frescos, artesanato local e gastronomia típica mineira.",
    fullDescription: [
      "Toda semana, a Praça da Estação se transforma em um colorido ponto de encontro da comunidade barbacenense com a tradicional Feira de Orgânicos e Artesanato. O evento reúne mais de 40 expositores entre produtores rurais, artesãos e pequenos empreendedores locais.",
      "Os visitantes encontram uma grande variedade de produtos frescos e orgânicos direto do produtor: verduras, legumes, frutas da estação, ovos caipira, mel, queijos artesanais, pães caseiros e muito mais. Os preços são justos e a qualidade dos produtos é garantida pela certificação orgânica da cooperativa organizadora.",
      "Além dos alimentos frescos, a feira conta com uma seção dedicada ao artesanato mineiro, onde é possível encontrar peças únicas de cerâmica, bordados, trabalhos em madeira, sabonetes artesanais, cosméticos naturais e decoração. É o lugar perfeito para encontrar presentes especiais e apoiar a economia local.",
      "A área gastronômica oferece delícias típicas da culinária mineira: pão de queijo quentinho, bolos caseiros, doces artesanais, café passado na hora e até opções de comida pronta como pastéis, tapiocas e sanduíches naturais. Muitos frequentadores fazem da feira seu ritual de café da manhã de sábado.",
      "A feira funciona mesmo em caso de chuva, com tendas cobertas protegendo os expositores e os visitantes. O ambiente é familiar e pet-friendly. A Praça da Estação conta com estacionamento nas proximidades e fácil acesso por transporte público. É uma excelente opção para começar o final de semana com qualidade de vida."
    ]
  },
  {
    id: 6,
    title: "Noite do Samba e Choro",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxtdXNpYyUyMGd1aXRhciUyMGxpdmV8ZW58MXx8fHwxNzYyMTQyMzQzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    date: "16 de novembro",
    fullDate: "16 de novembro de 2025",
    time: "19h",
    location: "Espaço Cultural Casa da Música",
    category: "Música",
    organizer: "Coletivo Choro de Barbacena",
    price: "R$ 25 (inteira) / R$ 12 (meia)",
    description: "Roda de samba e choro com músicos tradicionais da cidade e convidados especiais.",
    fullDescription: [
      "A Casa da Música recebe mais uma edição da tradicional Noite do Samba e Choro, evento mensal que celebra os ritmos que são patrimônio cultural brasileiro. Esta edição especial conta com a participação do Coletivo Choro de Barbacena e convidados de cidades vizinhas.",
      "O Coletivo, formado por músicos experientes que dedicam suas vidas à preservação da música instrumental brasileira, promete uma noite inesquecível com clássicos de Pixinguinha, Jacob do Bandolim, Cartola e outros mestres. O repertório inclui ainda composições autorais dos músicos do grupo.",
      "Entre os convidados especiais desta edição, destaque para a presença da cantora Maria Conceição, conhecida por sua interpretação emocionante de sambas de raiz, e do cavaquinista Pedrinho Batuque, que vem de Juiz de Fora especialmente para o evento.",
      "A Casa da Música oferece um ambiente intimista e acolhedor, ideal para apreciar música de qualidade. O espaço conta com bar completo servindo drinks especiais, cervejas artesanais e petiscos. Durante os intervalos, haverá uma roda de samba aberta onde o público pode participar.",
      "Recomenda-se chegar com antecedência, pois o local tem capacidade limitada de 150 pessoas. Os ingressos estão à venda na bilheteria da Casa da Música (terça a domingo, das 15h às 21h) e também podem ser adquiridos online através do site oficial. O evento é para maiores de 16 anos."
    ]
  }
];
