<template>
  <div class="app">
    <header class="app__header">
      <app-nav />
    </header>

    <main class="app__main">
      <router-view
        class="app__main-inner"
      />
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
  }),
  created() {
    this.onGetData();
  },
  methods: {
    ...mapActions(['getData']),

    async onGetData() {
      try {
        await this.getData();
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style lang="scss">
@import '~@/styles/variables.scss';

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

    &-inner {
      width: 100%;
    }
  }
}
</style>
