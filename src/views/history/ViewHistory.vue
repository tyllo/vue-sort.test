<template>
  <div class="view-history">
    <history-list
      :data="data"
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
  },
};
</script>
