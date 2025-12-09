export interface WikiArticle {
  id: number;
  title: string;
  wikitext: string;
  createdAt: string;
  updatedAt: string;
}

export const wikipediaData: WikiArticle[] = [
  {
    id: 1,
    title: "História de Barbacena",
    wikitext: `'''Barbacena''' é uma cidade histórica localizada no estado de [[Minas Gerais]], [[Brasil]].

== História ==

A cidade foi fundada em '''1791''' e recebeu o nome em homenagem a '''Felisberto Caldeira Brant''', o Visconde de Barbacena.

=== Fundação ===

A região era habitada por povos indígenas antes da chegada dos colonizadores portugueses. A descoberta de ouro na região atraiu muitos exploradores no século XVIII.

=== Século XIX ===

Durante o século XIX, Barbacena se tornou um importante centro:
* Político
* Econômico
* Cultural

== Geografia ==

Barbacena está situada a uma altitude de aproximadamente '''1.100 metros''' acima do nível do mar, o que lhe confere um clima ameno.

=== Clima ===

O clima da cidade é caracterizado como '''subtropical de altitude''', com temperaturas amenas durante todo o ano.

== Cultura ==

A cidade é conhecida por suas:
# Festas tradicionais
# Arquitetura colonial
# Produção de rosas

== Referências ==

* História oficial do município
* Instituto Brasileiro de Geografia e Estatística (IBGE)`,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15"
  },
  {
    id: 2,
    title: "Festival das Rosas",
    wikitext: `O '''Festival das Rosas''' é o principal evento cultural de [[Barbacena]], realizado anualmente na cidade conhecida como a "Cidade das Rosas".

== História do Festival ==

O festival teve início em '''1966''' e desde então se tornou uma tradição da cidade.

=== Primeira Edição ===

A primeira edição do festival foi modesta, mas já demonstrava o potencial da cidade na produção de rosas.

== Atrações ==

O festival oferece diversas atrações:
* Exposição de rosas
* Shows musicais
* Gastronomia típica
* Artesanato local
* Desfiles

== Importância Econômica ==

O festival é responsável por:
# Atrair turistas de todo o Brasil
# Movimentar a economia local
# Divulgar a produção de rosas da região

== Período de Realização ==

Tradicionalmente, o festival ocorre no mês de '''outubro''', período de maior floração das roseiras.`,
    createdAt: "2024-02-10",
    updatedAt: "2024-02-10"
  }
];
