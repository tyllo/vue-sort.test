<template>
  <div class="app">
    <header class="app__header">
      <app-nav />
    </header>

    <main class="app__main">
      <div class="app__main-container">
        <div
          v-if="isLoading"
          v-text="'Loading...'"
        />

        <div
          v-else-if="isError"
          v-text="'Ошибка загрузки данных, попробуте нажать F5'"
        />

        <router-view
          v-else
          class="app__main-inner"
        />
      </div>
    </main>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import AppNav from '@/components/AppNav.vue';

export default {
  name: 'App',
  components: {
    AppNav,
  },
  data: () => ({
    isLoading: false,
    isError: false,
  }),
  created() {
    this.onGetData();
  },
  methods: {
    ...mapActions(['getData']),

    async onGetData() {
      this.isLoading = true;

      try {
        await this.getData();
      } catch (e) {
        console.log(e);
        this.isError = true;
      }

      this.isLoading = false;
    },
  },
};
</script>

<style lang="scss">
@import '~@/styles/variables.scss';

$max-width: 768px;

.app {
  display: flex;
  flex-direction: column;
  min-height: 100%;

  &__header {
    display: flex;
    align-items: center;
    justify-content: center;
    height: $app-header-height;
    width: 100%;
  }

  &__main {
    width: 100%;
    flex-grow: 1;
    display: flex;
    flex-wrap: wrap;

    &-container {
      margin: 0 auto;
      width: 100%;
      max-width: $max-width;
      min-height: calc(100% - $app-header-height);
    }

    &-inner {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
