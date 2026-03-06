export const numberToWords = (num) => {

  if (num === 0) return "Zero";

  const units = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine"
  ];

  const teens = [
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen"
  ];

  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety"
  ];

  const scales = ["", "Thousand", "Million"];

  const convertChunk = (n) => {

    if (n === 0) return "";

    if (n < 10) return units[n];

    if (n < 20) return teens[n - 10];

    if (n < 100)
      return (
        tens[Math.floor(n / 10)] +
        (n % 10 !== 0 ? " " + units[n % 10] : "")
      );

    return (
      units[Math.floor(n / 100)] +
      " Hundred" +
      (n % 100 !== 0 ? " and " + convertChunk(n % 100) : "")
    );
  };

  let words = "";
  let i = 0;

  const roundedNum = parseFloat(num.toFixed(2));
  const [intPart, fracPart] = roundedNum.toString().split(".");

  let integer = parseInt(intPart);
  const fractional = fracPart ? parseInt(fracPart) : 0;

  if (integer > 999999999) return "Value too large";

  while (integer > 0) {

    const chunk = integer % 1000;

    if (chunk !== 0) {

      let chunkWords = convertChunk(chunk);

      words =
        chunkWords +
        (scales[i] ? " " + scales[i] : "") +
        " " +
        words;
    }

    integer = Math.floor(integer / 1000);
    i++;
  }

  words = words.trim();

  if (fractional > 0) {

    let fractionalWords = convertChunk(fractional);

    words +=
      (words ? " and " : "") +
      fractionalWords +
      " Paisa";
  }

  return words.trim();
};