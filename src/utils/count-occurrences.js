function countOccurrences(array, element) {
  let res = 0;
  for (let i = 0; i < array.length; i++) {
    if (element == array[i]) res++;
  }
  return res;
}
module.exports = {
  countOccurrences,
};
