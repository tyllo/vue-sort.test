<template>
  <div class="view-home">
    <div class="view-home__row">
      <div class="view-home__col view-home__add-container">
        <home-search-filter
          :value="filters.search"
          class="view-home__search-filter"
          @input="onSearch"
        />

        <home-panel
          :data="dataListFilteredBySearch"
          type="add"
          @add="addData"
        />
      </div>

      <div class="view-home__col view-home__remove-container">
        <home-panel
          :data="copyList"
          type="remove"
          @remove="removeData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import HomeSearchFilter from './components/HomeSearchFilter.vue';
import HomePanel from './components/HomePanel.vue';

export default {
  name: 'ViewHome',
  components: {
    HomeSearchFilter,
    HomePanel,
  },
  computed: {
    ...mapState(['copyList', 'filters']),
    ...mapGetters(['dataListFilteredBySearch']),
  },
  methods: {
    ...mapActions([
      'addData',
      'removeData',
      'filterBySearchDataList',
    ]),

    onSearch(value) {
      // TODO: здесь нужен debounce
      this.filterBySearchDataList(value);
    },
  },
};
</script>

<style lang="scss">

.view-home {
  display: flex;
  flex-direction: column;
  padding: 30px;

  &__row {
    display: flex;
    flex-wrap: wrap;
    height: 100%;
  }

  &__col {
    width: auto;
    min-width: 0;
    max-width: 100%;

    flex: 10000 1 0%;
  }

  &__search-filter {
    margin-right: 20px;
    margin-bottom: 20px;
  }

  &__add-container {
    display: flex;
    flex-direction: column;
  }

  &__remove-container {
    border-left: 1px solid lightgray;
  }
}
</style>
