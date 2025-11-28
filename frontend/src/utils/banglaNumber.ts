/**
 * Convert English numbers to Bangla numerals
 */
export const toBanglaNumber = (num: number | string): string => {
  const banglaDigits: { [key: string]: string } = {
    '0': '০',
    '1': '১',
    '2': '২',
    '3': '৩',
    '4': '৪',
    '5': '৫',
    '6': '৬',
    '7': '৭',
    '8': '৮',
    '9': '৯',
  };

  return String(num).replace(/\d/g, (digit) => banglaDigits[digit]);
};

/**
 * Format number with Bangla digits and appropriate suffix
 */
export const formatBanglaNumber = (num: number, decimals: number = 0): string => {
  const formatted = num.toFixed(decimals);
  return toBanglaNumber(formatted);
};
