<template>
  <input
    v-model="realNumber"
    type="text"
    @focus="indicatorChange = true"
    @blur="indicatorChange = false"
    class="ui-money"
  />
</template>

<script>
export default {

  name: 'UiMoney',

  props: {
    moneyFilter: {
      type: Number,
      require: true,
    },
  },

  data() {
    return {
      realNumber: this.moneyFilter,
      indicatorChange: false,
    };
  },

  watch: {
    value: {
      handler(newValue) {
        this.valueInput = newValue;
      },
    },
    indicatorChange: {
      handler(bool) {
        if (!bool) {
          const regExpSeparator = /\B(?=(\d{3})+(?!\d))/g;

          let value = this.realNumber.replace(/,/g, '.').replace(/[^0-9.,]/g, '');
          const dotIndex = value.indexOf('.');

          const dotCount = (value.match(/\./g) || []).length;
          if (dotCount > 1) {
            const lastIndex = value.lastIndexOf('.');
            value = value.substring(0, lastIndex);
          }
          if (dotIndex === 0 || dotIndex === value.length - 1) {
            value = value.replace(/\./g, '');
          }

          const number = parseFloat(Number(value).toFixed(2));
          this.realNumber = number.toString().replace(regExpSeparator, ' ');

          this.$emit('update-input', number);
        }
      },
    },
  },
};
</script>
