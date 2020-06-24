<template>
  <div
    :class="classes"
    class="history-item"
  >
    <time>[{{ dateFormated }}]</time>
    <span class="history-item__label"> [{{ label }}] </span>
    <span>{ id: {{ data.id }}, name: {{ data.name }} }</span>
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
      switch (this.type) {
        case HANDLE_TYPES.ADD:
          return 'history-item--add';

        case HANDLE_TYPES.REMOVE:
          return 'history-item--remove';

        default:
          return '';
      }
    },
    label() {
      switch (this.type) {
        case HANDLE_TYPES.ADD:
          return 'добавление';

        case HANDLE_TYPES.REMOVE:
          return 'удаление';

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
  $root: &;

  padding: 4px 0;

  &__label {
    // display: inline-block;
    // min-width: 90px;

    #{$root}--add & {
      color: $color-positive;
    }

    #{$root}--remove & {
      color: $color-negative;
    }
  }
}
</style>
