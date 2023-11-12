export default {
  install(Vue) {
    Vue.filter('FDate', (string) => {
      if (!string) return '';

      const [year, month, day] = string.split('-');
      return `${day}.${month}.${year}`;
    });
    Vue.filter('FPrice', (price) => {
      const regExpSeparator = /\B(?=(\d{3})+(?!\d))/g;
      const regExpCutZeros = /\.?0+$/;

      const result = (parseFloat(price) ?? 0).toFixed(2);
      return result.replace(regExpSeparator, ' ').replace(regExpCutZeros, '');
    });
  },
};
