<template>
  <div class="history-list">
    <template v-for="item in data">
      <history-item
        :key="item.date"
        :date="item.date"
        :data="item.data"
        :type="item.type"
      />
    </template>
  </div>
</template>

<script>
import HistoryItem from './HistoryItem.vue';

export default {
  name: 'HistoryList',
  components: {
    HistoryItem,
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
};
</script>
