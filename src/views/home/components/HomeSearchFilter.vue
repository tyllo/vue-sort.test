<template>
  <div class="home-search-filter">
    <i
      class="home-search-filter__search-icon"
      @click="onClean"
    />

    <input
      :value="value"
      :class="inputClasses"
      class="home-search-filter__input"
      @input="$emit('input', $event.target.value)"
    >

    <home-panel-button
      v-if="value"
      name="close"
      class="home-search-filter__button-close"
      @click="onClean"
    />
  </div>
</template>

<script>
import HomePanelButton from './HomePanelButton.vue';

export default {
  name: 'HomeSearchFilter',
  components: {
    HomePanelButton,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  computed: {
    inputClasses() {
      return {
        'home-search-filter__input--cleanable': this.value,
        'home-search-filter__input--searchable': true,
      };
    },
  },
  methods: {
    onClean() {
      this.$emit('input', '');
      this.$emit('clean', '');
    },
  },
};
</script>

<style lang="scss">

$icon-size: 20px;

.home-search-filter {
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid lightgray;

  &__search-icon {
    position: absolute;
    left: 8px;
    width: $icon-size;
    height: $icon-size;
    background-image: url(~@mdi/svg/svg/magnify.svg);
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    opacity: 0.25;
    pointer-events: none;
  }

  &__button-close {
    position: absolute;
    right: 8px;
  }

  &__input {
    outline: none;
    width: 100%;
    padding: 10px 16px 10px;
    border: none;

    &--searchable {
      padding-left: $icon-size + 16px;
    }

    &--cleanable {
      padding-right: $icon-size + 16px;
    }
  }
}
</style>
