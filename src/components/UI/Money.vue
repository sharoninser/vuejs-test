<template>
  <input
    v-model="valueInput"
    type="text"
    class="ui-money"
  />
</template>

<script>
export default {

  name: 'UiMoney',

  props: {
    value: {
      type: Number,
      require: true,
    },
  },

  data() {
    return {
      valueInput: this.value || '',
    };
  },
  watch: {
    value(newValue) {
      this.valueInput = newValue ? newValue.toLocaleString() : '';
    },
    valueInput(newValue) {
      if (newValue !== undefined) {
        const regExpSeparator = /(\d)(?=(\d{3})+(?!\d))/g;
        let value = newValue
          .replace(/,/g, '.')
          .replace(/[^\d.]/g, '')
          .replace(/^0+(?=\d)/, '');

        if (value.match(/\./g) && value.match(/\./g).length > 1 && value.endsWith('.')) {
          value = value.slice(0, -1);
        }
        if (value.match(/\./g) && value.length > 1 && value.startsWith('.')) {
          value = value.slice(1);
        }
        if (value.includes('.')) {
          const parts = value.split('.');
          parts[0] = parts[0].replace(regExpSeparator, '$1 ');

          if (parts[1] && parts[1].length > 2) {
            parts[1] = parts[1].slice(0, 2);
          }
          value = parts.join('.');
        } else {
          value = value.replace(regExpSeparator, '$1 ');
        }

        this.valueInput = value === '' ? undefined : value;

        const parsedValue = this.valueInput === '' ? undefined : Number(parseFloat(value.replace(/\s/g, '')).toFixed(2));
        this.$emit('input', parsedValue);
      }
    },
  },
};
</script>
