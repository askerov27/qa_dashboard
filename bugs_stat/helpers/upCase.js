const firstLetterCapital = (env) => {
  const firstLetter = env.charAt(0);
  const firstLetterCap = firstLetter.toUpperCase();
  const remainingLetters = env.slice(1);
  const capitalizedWord = firstLetterCap + remainingLetters;
  return capitalizedWord;
};

export { firstLetterCapital };
