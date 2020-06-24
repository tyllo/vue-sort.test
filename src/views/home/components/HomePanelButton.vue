<template>
  <button
    :class="buttonClasses"
    class="home-panel-button"
    @click="$emit('click')"
  />
</template>

<script>
import * as HANDLE_TYPES from '@/helpers/enums/handle-type';

export default {
  name: 'HomePanelButton',
  props: {
    name: {
      type: String,
      required: true,
      validator: (prop) => Object.values(HANDLE_TYPES).includes(prop),
    },
  },
  computed: {
    buttonClasses() {
      const { name } = this;

      switch (name) {
        case HANDLE_TYPES.ADD:
          return 'home-panel-button--add';

        case HANDLE_TYPES.REMOVE:
          return 'home-panel-button--remove';

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
  background-color: shado;
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

  &:hover {
    opacity: 0.5;
  }
}
</style>
