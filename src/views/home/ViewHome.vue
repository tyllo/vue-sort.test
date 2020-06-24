<template>
  <div class="view-home">
    <div
      v-if="isLoading"
      v-text="'Loading...'"
    />

    <div
      v-else-if="isError"
      v-text="'Ошибка загрузки данных, попробуте нажать F5'"
    />

    <template v-else>
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
    </template>
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
  data: () => ({
    isLoading: false,
    isError: false,
  }),
  computed: {
    ...mapState(['copyList', 'filters', 'dataList']),
    ...mapGetters(['dataListFilteredBySearch']),
  },
  created() {
    if (!this.dataList.length) {
      this.onGetData();
    }
  },
  methods: {
    ...mapActions([
      'getDataList',
      'addData',
      'removeData',
      'filterBySearchDataList',
    ]),

    async onGetData() {
      this.isLoading = true;

      try {
        await this.getDataList();
      } catch {
        this.isError = true;
      }

      this.isLoading = false;
    },

    onSearch(value) {
      // TODO: здесь нужен debounce
      this.filterBySearchDataList(value);
    },
  },
};
</script>

<style lang="scss">

$input-height: 37px;

.view-home {
  display: flex;
  flex-direction: column;

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
    padding-top: $input-height + 20px;
    border-left: 1px solid lightgray;
  }
}
</style>
