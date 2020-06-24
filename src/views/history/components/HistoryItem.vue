<template>
  <div
    :class="classes"
    class="history-item"
  >
    [{{ dateFormated }}] {{ data.name }}
  </div>
</template>

<script>
import * as HANDLE_TYPES from '@/helpers/enums/handle-type';
import { formatDate } from '@/helpers/formatDate';

export default {
  name: 'HistoryItem',
  props: {
    data: {
      type: Object,
      required: true,
    },
    date: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
      validator: (prop) => Object.values(HANDLE_TYPES).includes(prop),
    },
  },
  computed: {
    dateFormated() {
      return formatDate(this.date);
    },
    classes() {
      const { type } = this;

      switch (type) {
        case HANDLE_TYPES.ADD:
          return 'history-item--add';

        case HANDLE_TYPES.REMOVE:
          return 'history-item--remove';

        default:
          return '';
      }
    },
  },
};
</script>

<style lang="scss">
@import '~@/styles/variables.scss';

.history-item {
  &--add {
    color: $color-positive;
  }

  &--remove {
    color: $color-negative;
  }
}
</style>
