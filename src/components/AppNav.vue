<template>
  <div class="app-nav">
    <router-link
      v-for="item in linkList"
      :key="item.label"
      :to="item.route"
      class="app-nav__link"
      v-text="item.label"
    />
  </div>
</template>

<script>

const LINK_LIST = [
  {
    label: 'На главную',
    route: { name: 'home' },
  },
  {
    label: 'История',
    route: { name: 'history' },
  },
  {
    label: 'История добавлений',
    route: { name: 'history.add' },
  },
  {
    label: 'История удалений',
    route: { name: 'history.remove' },
  },
];

export default {
  name: 'AppNav',
  data: () => ({
    linkList: LINK_LIST,
  }),
};
</script>

<style lang="scss">
@import '~@/styles/variables.scss';

.app-nav {
  text-align: center;

  &__link {
    font-weight: bold;
    text-decoration: none;
    color: $color-text;

    & + & {
      margin-left: 15px;
    }

    &:before,
    &:after {
      content: '';
      opacity: 0;
    }

    &:before {
      content: '[',
    }

    &:after {
      content: ']',
    }

    &:hover,
    &.router-link-exact-active {
      &:before,
      &:after {
        opacity: 1;
      }
    }

    &:hover {
      &:before,
      &:after {
        color: $color-text;
      }
    }

    &.router-link-exact-active {
      color: $color-primary;
      text-decoration: solid;
      pointer-events: none;
      cursor: default;
    }
  }
}
</style>
