export class Utils{

  static numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  static convertToInternationalCurrencySystem (labelValue) {
    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e+9
      ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + "B"
      // Six Zeroes for Millions
      : Math.abs(Number(labelValue)) >= 1.0e+6
        ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + "M"
        // Three Zeroes for Thousands
        : Math.abs(Number(labelValue)) >= 1.0e+3
          ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + "K"
          : Math.abs(Number(labelValue));
  }

  static replaceWithDash(number) {
    return number == 0 ? '-' : number;
  }

  static getArrElementsSum(a: number[]) {
    let sum: number = 0;
    a.forEach(el => {
      sum += el;
    })
    return sum;
  }

  static getCurrentPrice(purchasePrice, expectedYield, balance, currency, rate) {
    if (balance == 0) return '-';
    if (currency === 'RUB') return ((purchasePrice + expectedYield/balance) / rate).toFixed(2)
    return (purchasePrice + expectedYield/balance).toFixed(2);
  }

}
