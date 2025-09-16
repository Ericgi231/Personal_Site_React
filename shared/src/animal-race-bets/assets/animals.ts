export interface AnimalData {
  id: string;
  name: string;
  tag: string;
  species: string;
  color: string;
  friendIds?: string[];
}

// Name rules:
// 1. No puns
// 2. No alliteration
// 3. Do not reference the animal's species
export const ANIMAL_MAP: Record<string, AnimalData> = {
  // snail1: { 
  //   id: 'snail1', 
  //   name: 'Oktoberfest Road Rage', 
  //   tag: 'ORG',
  //   species: 'Snail', 
  //   color: '#A3C1AD' },
  cow1: { 
    id: 'cow1', 
    name: 'Merciless Harvest', 
    tag: 'MEH',
    species: 'Cow', 
    color: '#A3C1AD' },
  horse1: { 
    id: 'horse1', 
    name: 'Jovial Merryment', 
    tag: 'MRY',
    species: 'Horse', 
    color: '#A3C1AD' },
  rat1: { 
    id: 'rat1', 
    name: 'A Beautiful Day To Dream', 
    tag: 'DRM',
    species: 'Rat', 
    color: '#A3C1AD' },
  // shrimp1: { 
  //   id: 'shrimp1', 
  //   name: 'Big Queen', 
  //   tag: 'BQN',
  //   species: 'Shrimp', 
  //   color: '#A3C1AD' },
  // horse2: { 
  //   id: 'horse2', 
  //   name: 'Slightly Oblong', 
  //   tag: 'SOB',
  //   species: 'Horse', 
  //   color: '#A3C1AD' },
  // dog1: { 
  //   id: 'dog1', 
  //   name: 'Handbag', 
  //   tag: 'BAG',
  //   species: 'Dog', 
  //   color: '#A3C1AD' },
  // cat1: { 
  //   id: 'cat1', 
  //   name: 'Licence For That', 
  //   tag: 'LFT',
  //   species: 'Cat', 
  //   color: '#A3C1AD' },
  frog1: { 
    id: 'frog1', 
    name: 'Raphael Cortez Alexander III', 
    tag: 'III',
    species: 'Frog', 
    color: '#A3C1AD' },
};