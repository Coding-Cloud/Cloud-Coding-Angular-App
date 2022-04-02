export interface Feature {
  name: string;
  description: string;
}

export const features: Feature[] = [
  {
    name: 'Kubernetes',
    description: 'Une infrastructure moderne et scalable grâce à kubernetes'
  },
  {
    name: 'Angular',
    description:
      'Un frontend Angular moderne grâce à un ensemble de librairies sympatiques'
  },
  {
    name: 'NestJS',
    description: 'Un frontend soutenu par nodeJS, puissant et rapide'
  },
  {
    name: 'PostgreSQL',
    description: 'Une base de donnée puissante, qui répondra toujours'
  },
  {
    name: 'Templates',
    description: "Des template déjà prêt à l'emploi pour vos projets web"
  }
];
