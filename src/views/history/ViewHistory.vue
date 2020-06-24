<template>
  <div class="view-history">
    <history-list
      v-if="data.length"
      :data="data"
    />
    <h2
      v-else
      class="view-history__empty-text"
      v-text="emptyText"
    />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import * as HANDLE_TYPES from '@/helpers/enums/handle-type';
import HistoryList from './components/HistoryList.vue';

export default {
  name: 'ViewHistory',
  components: {
    HistoryList,
  },
  props: {
    type: {
      type: String,
      default: undefined,
      validator: (prop) => Object.values(HANDLE_TYPES).includes(prop),
    },
  },
  computed: {
    ...mapState(['historyList']),
    ...mapGetters(['addHistoryList', 'removeHistoryList']),

    data() {
      switch (this.type) {
        case HANDLE_TYPES.ADD:
          return this.addHistoryList;

        case HANDLE_TYPES.REMOVE:
          return this.removeHistoryList;

        default:
          return this.historyList;
      }
    },

    emptyText() {
      switch (this.type) {
        case HANDLE_TYPES.ADD:
          return 'История добавления пуста';

        case HANDLE_TYPES.REMOVE:
          return 'История удаления пуста';

        default:
          return 'История пуста';
      }
    },
  },
};
</script>

<style lang="scss">

.view-history {
  padding: 20px;

  &__empty-text {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    font-weight: normal;
  }
}
</style>
