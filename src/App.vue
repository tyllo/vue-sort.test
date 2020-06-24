<template>
  <div class="app">
    <header class="app__header">
      <app-nav />
    </header>

    <main class="app__main">
      <div class="app__main-container">
        <router-view
          class="app__main-inner"
        />
      </div>
    </main>
  </div>
</template>

<script>
import AppNav from '@/components/AppNav.vue';

export default {
  name: 'App',
  components: {
    AppNav,
  },
};
</script>

<style lang="scss">
@import '~@/styles/_variables.scss';

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
      min-height: calc(100% - #{$app-header-height});
    }

    &-inner {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
