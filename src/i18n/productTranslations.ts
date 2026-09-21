import { Language } from './types';

export interface LocalizedProductInfo {
  name: string;
  subtitle: string;
  badge?: string;
  description: string;
}

export const PRODUCT_TRANSLATIONS: Record<'en' | 'de', Record<string, LocalizedProductInfo>> = {
  en: {
    'oplast-h40': {
      name: 'Oplast H40 Parking Eco-Grid',
      subtitle: 'Universal permeable grid for parking lots and private driveways',
      badge: 'Bestseller',
      description: 'The most popular grass and gravel grid manufactured at the Winduga plant. Honeycomb structure with integrated Quick-Lock modular tabs. Provides 88% bio-active surface for rain infiltration. Designed for gravel or seeded grass.',
    },
    'oplast-h50': {
      name: 'Oplast H50 Heavy Road Grid',
      subtitle: 'Reinforced grid for heavy trucks and fire brigade access routes',
      badge: 'Heavy Duty 450 t/m²',
      description: 'Ultra-durable model with 5 mm wall thickness designed for industrial logistics depots, truck parking, helipads, and emergency fire lanes. Resists axle loads up to 20 tonnes.',
    },
    'oplast-h30': {
      name: 'Oplast H30 Garden & Lawn Grid',
      subtitle: 'Lightweight grid for pedestrian paths, garden borders, and parks',
      badge: 'Garden & Park',
      description: 'Economical 30 mm grid ideal for garden landscaping, pedestrian trails, golf courses, and gravel terraces. Easy to handle and fast to install.',
    },
    'obrzeze-eko-45': {
      name: 'Oplast Eko-Bord 45 Garden Border (1m)',
      subtitle: 'Flexible lawn border for pavers and stones (height 45 mm)',
      badge: 'Top Choice',
      description: 'High-flexibility edge restraint for paving stones, cobbles, and lawn borders. Allows forming perfect straight lines or smooth curves without digging deep trenches.',
    },
    'obrzeze-eko-58': {
      name: 'Oplast Eko-Bord 58 Heavy Border (1m)',
      subtitle: 'Reinforced edging for granite pavers and concrete slabs (58 mm)',
      badge: 'High Stability',
      description: 'Sturdy edge for heavy pavers (6-8 cm thickness), terrace tiles, and driveway separations. Resists lateral ground displacement.',
    },
    'obrzeze-eko-78': {
      name: 'Oplast Eko-Bord 78 Maxi Border (1m)',
      subtitle: 'Tall edging for thick pavers and large driveway slabs (78 mm)',
      badge: 'Maxi 78mm',
      description: 'Maximum height edge restraint for thick commercial pavers (8-10 cm) and heavy decorative stone beds.',
    },
    'kotwy-oplast-18': {
      name: 'Oplast Eco-Anchors 18 cm (Pack of 50)',
      subtitle: 'Reinforced polymer anchoring nails for borders and grids',
      badge: 'Essential',
      description: 'High-strength plastic anchoring pins with barbed teeth. Guarantees permanent fixation of borders in standard garden subsoil.',
    },
    'kotwy-oplast-24': {
      name: 'Oplast Eco-Anchors 24 cm Long (Pack of 50)',
      subtitle: 'Extended anchoring pins for loose sand, gravel, and slopes',
      badge: 'Extra Grip',
      description: 'Extended 24 cm pins ensuring exceptional pull-out resistance on steep slopes and sandy terrain.',
    },
    'znaczniki-parkingowe': {
      name: 'Oplast Parking Bay Markers (Pack of 20)',
      subtitle: 'Snap-in visual delineators for parking slots and disabled bays',
      badge: 'Parking Accessories',
      description: 'Durable snap-in plastic caps that press firmly into grid cells to mark vehicle bays, arrows, and safety lanes.',
    },
    'geowłóknina-150': {
      name: 'Geotextile 150g/m² (50m² Roll - 1x50m)',
      subtitle: 'Separation and filtration non-woven fabric for sub-base',
      badge: 'Base Protection',
      description: 'High-performance polypropylene non-woven geotextile. Prevents aggregate intermixing with the ground while ensuring full rainwater drainage.',
    },
  },
  de: {
    'oplast-h40': {
      name: 'Oplast H40 Parkplatz-Rasengitter',
      subtitle: 'Universelles Gitter für Parkplätze und private Hauseinfahrten',
      badge: 'Bestseller',
      description: 'Das meistverkaufte Rasen- und Kiesgitter aus dem Werk Winduga. Wabenstruktur mit integriertem Quick-Lock Verbindungssystem. Bietet 88% wasserdurchlässige Grünfläche. Belastbar bis 16 Tonnen Achslast.',
    },
    'oplast-h50': {
      name: 'Oplast H50 Heavy Schwerlastgitter',
      subtitle: 'Verstärktes Gitter für LKW-Verkehr und Feuerwehrzufahrten',
      badge: 'Schwerlast 450 t/m²',
      description: 'Höchstbelastbares Modell mit 5 mm Wandstärke für Industrieanlagen, LKW-Wendeplätze, Hubschrauberlandeplätze und Feuerwehrwege. Achslast bis 20 Tonnen.',
    },
    'oplast-h30': {
      name: 'Oplast H30 Garten- und Gehweggitter',
      subtitle: 'Leichtes Gitter für Gartenwege, Fußgängerzonen und Grünanlagen',
      badge: 'Garten & Park',
      description: 'Wirtschaftliches 30 mm Gitter für Landschaftsbau, Fußwege, Golfplätze und Kiesterrassen. Leicht im Transport und sekundenschnell verlegt.',
    },
    'obrzeze-eko-45': {
      name: 'Oplast Eko-Bord 45 Rasenkante (1m)',
      subtitle: 'Flexible Beeteinfassung für Pflastersteine und Rasen (45 mm)',
      badge: 'Top-Wahl',
      description: 'Hochflexible Randeinfassung für Pflastersteine, Naturstein und Kiesbeete. Ermöglicht müheloses Verlegen von Geraden und Radien ohne Betonbett.',
    },
    'obrzeze-eko-58': {
      name: 'Oplast Eko-Bord 58 Schwere Kante (1m)',
      subtitle: 'Verstärkte Bordkante für dickere Pflaster und Platten (58 mm)',
      badge: 'Hohe Stabilität',
      description: 'Stabile Randeinfassung für Pflasterstärken von 6-8 cm, Terrassenplatten und Grundstückszufahrten.',
    },
    'obrzeze-eko-78': {
      name: 'Oplast Eko-Bord 78 Maxi Bordkante (1m)',
      subtitle: 'Hohe Bordkante für schwere Pflastersteine und Platten (78 mm)',
      badge: 'Maxi 78mm',
      description: 'Maximale Bauhöhe für schwere gewerbliche Pflastersteine (8-10 cm) und starke Schotteraufbauten.',
    },
    'kotwy-oplast-18': {
      name: 'Oplast Kunststoff-Erdnägel 18 cm (50 Stk.)',
      subtitle: 'Verstärkte Erdnägel zur Befestigung von Rasenkanten und Gittern',
      badge: 'Unverzichtbar',
      description: 'Schlagfeste Kunststoffnägel mit Widerhaken für die feste Verankerung von Bordkanten im Untergrund.',
    },
    'kotwy-oplast-24': {
      name: 'Oplast Kunststoff-Erdnägel 24 cm Lang (50 Stk.)',
      subtitle: 'Extra lange Erdanker für sandige Böden und Böschungen',
      badge: 'Extra Halt',
      description: 'Verlängerte 24 cm Erdnägel für außergewöhnliche Auszugsfestigkeit in lockerem Sand und an Hanglagen.',
    },
    'znaczniki-parkingowe': {
      name: 'Oplast Parkplatz-Markierer (20 Stk.)',
      subtitle: 'Einsteck-Markierungselemente zur Kennzeichnung von Stellplätzen',
      badge: 'Parkplatz-Zubehör',
      description: 'Farbige Markierungsstopfen, die in die Waben des Gitters eingedrückt werden, um Parkbuchten und Linien zu markieren.',
    },
    'geowłóknina-150': {
      name: 'Geovlies 150g/m² (50m² Rolle - 1x50m)',
      subtitle: 'Trenn- und Filtervlies für den sickerfähigen Unterbau',
      badge: 'Unterbauschutz',
      description: 'Hochwertiges Polypropylen-Vlies. Verhindert das Vermischen von Schotter und Erdreich bei dauerhafter Wasserdurchlässigkeit.',
    },
  },
};

export const getLocalizedProduct = (product: { id: string; name: string; subtitle: string; badge?: string; description: string }, lang: Language) => {
  if (lang === 'pl') {
    return {
      name: product.name,
      subtitle: product.subtitle,
      badge: product.badge,
      description: product.description,
    };
  }
  const translation = PRODUCT_TRANSLATIONS[lang]?.[product.id];
  if (!translation) {
    return {
      name: product.name,
      subtitle: product.subtitle,
      badge: product.badge,
      description: product.description,
    };
  }
  return {
    name: translation.name,
    subtitle: translation.subtitle,
    badge: translation.badge || product.badge,
    description: translation.description,
  };
};
