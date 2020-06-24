<template>
  <button
    :class="buttonClasses"
    class="home-panel-button"
    @click="$emit('click')"
  />
</template>

<script>

const NAMES = {
  ADD: 'add',
  REMOVE: 'remove',
};

export default {
  name: 'HomePanelButton',
  props: {
    name: {
      type: String,
      required: true,
      validator: (prop) => Object.values(NAMES).includes(prop),
    },
  },
  computed: {
    buttonClasses() {
      const { name } = this;

      switch (name) {
        case NAMES.ADD:
          return 'home-panel-button--add';

        case NAMES.REMOVE:
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
