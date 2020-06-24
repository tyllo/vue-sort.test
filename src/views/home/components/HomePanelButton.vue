<template>
  <button
    :class="buttonClasses"
    class="home-panel-button"
    @click="$emit('click')"
  />
</template>

<script>
import * as HANDLE_TYPES from '@/helpers/enums/handle-type';

const TYPES = {
  ...HANDLE_TYPES,
  CLOSE: 'close',
};

export default {
  name: 'HomePanelButton',
  props: {
    name: {
      type: String,
      required: true,
      validator: (prop) => Object.values(TYPES).includes(prop),
    },
  },
  computed: {
    buttonClasses() {
      switch (this.name) {
        case TYPES.ADD:
          return 'home-panel-button--add';

        case TYPES.REMOVE:
          return 'home-panel-button--remove';

        case TYPES.CLOSE:
          return 'home-panel-button--close';

        default:
          return '';
      }
    },
  },
};
</script>

<style lang="scss">

$size: 20px;

.home-panel-button {
  outline: none;
  flex-shrink: 0;
  padding: 6px;
  width: $size;
  height: $size;
  border: none;
  border-radius: 2px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 75%;
  cursor: pointer;
  transition: all 0.2s;

  &--add {
    background-image: url(~@mdi/svg/svg/plus.svg);
  }

  &--remove {
    background-image: url(~@mdi/svg/svg/minus.svg);
  }

  &--close {
    background-image: url(~@mdi/svg/svg/close.svg);
  }

  &:hover {
    opacity: 0.5;
  }
}
</style>
