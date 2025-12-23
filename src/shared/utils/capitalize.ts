const IGNORE_CAPITALIZE_WORDS = [
  'a',
  'à',
  'as',
  'às',
  'ao',
  'aos',
  'o',
  'os',
  'e',
  'ou',
  'mas',
  'nem',
  'que',
  'se',
  'de',
  'da',
  'do',
  'das',
  'dos',
  'dum',
  'duma',
  'duns',
  'dumas',
  'em',
  'na',
  'no',
  'nas',
  'nos',
  'num',
  'numa',
  'nuns',
  'numas',
  'por',
  'pra',
  'pela',
  'pelo',
  'pelas',
  'pelos',
  'para',
  'com',
  'sem',
  'sob',
  'um',
  'uns',
  'uma',
  'umas',
];

export function capitalize(text: string): string {
  return text
    .toLowerCase()
    .split(' ')
    .map((word) =>
      IGNORE_CAPITALIZE_WORDS.includes(word)
        ? word
        : word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join(' ');
}
