<template>
  <div class="home-panel">
    <div class="home-panel__inner">
      <template v-for="item in data">
        <div
          :key="item.id"
          class="home-panel__item"
        >
          <home-panel-button
            :name="type"
            class="home-panel__button"
            @click="onClick(item)"
          />

          <div
            class="home-panel__label"
            v-text="item.name"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import * as HANDLE_TYPES from '@/helpers/enums/handle-type';
import HomePanelButton from './HomePanelButton.vue';

export default {
  name: 'HomePanel',
  components: {
    HomePanelButton,
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
    type: {
      type: String,
      required: true,
      validator: (prop) => Object.values(HANDLE_TYPES).includes(prop),
    },
  },
  methods: {
    onClick(data) {
      this.$emit(this.type, data);
    },
  },
};
</script>

<style lang="scss">

$size: 20px;

.home-panel {
  height: 100%;
  width: 100%;
  position: relative;

  &__inner {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: 100%;
    overflow-y: auto;
  }

  &__item {
    padding: 5px 10px;
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  &__button {
    margin-right: 10px;
  }
}
</style>
