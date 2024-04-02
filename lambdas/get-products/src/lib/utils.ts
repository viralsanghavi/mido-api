export function generateCombinations(s: string) {
  let combinations = [];
  let max = 1 << s.length;

  for (let i = 0; i < max; i++) {
    let combination = "";
    for (let j = 0; j < s.length; j++) {
      // If j-th bit in i is set, convert j-th character to uppercase
      if (i & (1 << j)) {
        combination += s[j].toUpperCase();
      } else {
        combination += s[j].toLowerCase();
      }
    }
    combinations.push(combination);
  }

  return combinations;
}
