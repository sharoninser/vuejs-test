<template>
  <div class="data-table">
    <div class="data-table__filter">
      <ui-money v-model="moneyFilter" />
    </div>

    <div class="data-table__main">
      <div class="data-table__head">
        <div class="data-table__row">
          <div 
            v-for="col in columns" 
            :key="col.id" 
            class="data-table__col"
            :class="`data-table__col--${col.prop}`"
            :style="'width: ' + col.width"
          >
            {{ col.label }}
          </div>
        </div>
      </div>
      <div class="data-table__body">
        <div 
          v-for="row in rows"
          :key="row.id"
          class="data-table__row"
        >
          <div
            v-for="col in columns"
            :key="col.id"
            class="data-table__col"
            :class="`data-table__col--${col.prop}`"
            :style="'width: ' + col.width"
          >
            <span class="data-table__col-value data-table__col-value--title">{{ col.label }}</span>
            <span 
              v-if="col.prop === 'id'"
              class="data-table__col-value"
            >
              {{ row[col.prop] }}
            </span>
            <span 
              v-if="col.prop === 'date'"
              class="data-table__col-value"
            >
              {{ row[col.prop] | FDate }}
            </span>
            <span 
              v-if="col.prop === 'name'"
              class="data-table__col-value"
            >
              {{ row[col.prop] }}
            </span>
            <span 
              v-if="col.prop === 'money'"
              class="data-table__col-value"
            >
              {{ row[col.prop] | FPrice }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="data-table__paginator">
      <ui-pagination
        v-model="page"
        :pages="pageCount"
      />
    </div>
  </div>
</template>

<script>
export default {

  name: 'DataTable',

  props: {
    rows: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
  },

  data: () => ({
    page: 1,
    pageSize: 4,
    moneyFilter: 0,
  }),

  computed: {
    pageCount() {
      return Math.ceil(this.rows.length / this.pageSize);
    },
  },
};
</script>

<style lang="sass">
  .data-table
    padding-bottom: 2rem
    &__filter
      display: flex
      justify-content: flex-end
      margin-bottom: 1.5rem
    &__paginator
      margin-top: 1.5rem
    &__head
      @media screen and (max-width: 768px)
        display: none
      .data-table__col
        font-weight: 600
        padding: 0.5rem
    &__body
      .data-table__col
        padding: 1rem 0.5rem
        @media screen and (max-width: 768px)
          padding: 0
    &__row + &__row
      @media screen and (max-width: 768px)
        margin-top: 1rem
    &__row
      display: flex
      @media screen and (max-width: 768px)
        flex-direction: column
        border: 1px solid #ccc
        padding: 1rem 1.5rem
    &__col + &__col
      @media screen and (max-width: 768px)
        margin-top: 1rem
    &__col
      text-align: center
      border: 1px solid #ccc
      @media screen and (max-width: 768px)
        width: 100%!important
        border: none
        text-align: left
      &-value
        &--title
          display: none
          font-weight: 600
          @media screen and (max-width: 768px)
            display: block
</style>
