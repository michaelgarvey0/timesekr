export function minifaker(options?: { seed?: string | number }) {
  // seed is optional, but if provided, it will make the random number generator deterministic
  const seed = options?.seed || '';
  return {
    id: ({ size = 8 }) => {
      const chars =
        'abcdefghijklmnopqrstuvwyz01234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789';
      let id = '';
      for (let i = 0; i < size; i++) {
        const newSeed = seed + String(i);
        id += chars.charAt(Math.floor(rand(newSeed) * chars.length));
      }
      return id;
    },
    integer: ({ min = 0, max = 100 }) => Math.floor(rand(seed) * (max - min + 1)) + min,
    boolean: () => rand(seed) >= 0.5,
    float: ({ min = 0, max = 100, precision = 2 }) => {
      const number = parseFloat((rand(seed) * (max - min + 1) + min).toFixed(precision));
      // make sure number isn't higher than the max
      return number > max ? max : number;
    },
    // get a date between the min and max dates provided
    date: ({ min = new Date(2000, 0, 1), max = new Date(2020, 0, 1) }) => {
      const date = new Date(min.getTime() + rand(seed) * (max.getTime() - min.getTime()));
      return date.toISOString().split('T')[0];
    },
    // choose a fake product name from this list Shoe, Runner, T-Shirt, Jumper, Romper
    productTitle: ({ includeSize = false }) => {
      const genericAdjectives = [
        'Outset',
        'Warmup',
        'Cooldown',
        'Starter',
        'Baby',
        'Everywhere',
        'Define',
        'Everyday',
        'Print',
        'Fuzzy',
        'Wholesome',
        'Gentle',
        'Blazing',
        'Fresh',
        'Mellow',
        'Sunny',
        'Cozy',
        'Crisp',
        'Charming',
        'Breezy',
        'Glowing',
        'Lively',
        'Velvet',
        'Sparkling',
        'Delicate',
        'Twinkling',
        'Enchanting',
        'Flawless',
        'Cherished',
        'Radiant',
        'Tranquil',
        'Serene',
        'Dreamy',
        'Ethereal',
        'Captivating',
        'Enigmatic',
        'Effervescent',
        'Luminous',
        'Exquisite',
        'Infinite',
        'Graceful',
        'Harmonious',
        'Whispering',
      ];
      const products = [
        'Shoe',
        'Runner',
        'T-Shirt',
        'Jumper',
        'Romper',
        'Hat',
        'Socks',
        'Jeans',
        'Bag',
        'Dress',
        'Skirt',
        'Blouse',
        'Shorts',
        'Sweater',
        'Coat',
        'Scarf',
        'Gloves',
        'Watch',
        'Belt',
        'Umbrella',
        'Ring',
        'Necklace',
        'Earrings',
        'Bracelet',
        'Sunglasses',
        'Backpack',
        'Wallet',
        'Sandals',
        'Boots',
        'Sneakers',
        'Slippers',
        'Tank Top',
        'Hoodie',
        'Cardigan',
        'Blazer',
        'Pants',
        'Cap',
        'Beanie',
        'Tie',
        'Tote Bag',
        'Jacket',
        'Pullover',
        'Bikini',
        'Swimsuit',
        'Pajamas',
        'Headband',
        'Headphones',
        'Duffle Bag',
        'Luggage',
        'Gym Bag',
      ];

      return `${
        genericAdjectives[Math.floor(rand(seed) * genericAdjectives.length)]
      } ${products[Math.floor(rand(seed) * products.length)]} ${
        includeSize ? `Size ${Math.ceil(rand(seed) * 8)}` : ''
      }`;
    },
    string: ({ options = [] }: { options: string[]; seed?: string | number }) => {
      // choose a random string from the options array
      if (options.length > 0) {
        return options[Math.floor(rand(seed) * options.length)];
      } else {
        return 'random';
      }
    },
  };
}

// Mulberry32 is a simple random number generator as a drop in replacement for Math.random with a 32-bit state, but is extremely fast and has acceptable quality randomness
// see: https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript/47593316#47593316
function mulberry32(a: number) {
  let t = (a += 0x6d2b79f5);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

function hashString(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

function rand(seed: string | number) {
  return mulberry32(hashString(String(seed)));
}
