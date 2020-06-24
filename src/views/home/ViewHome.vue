<template>
  <div class="view-home">
    <div class="view-home__row">
      <div class="view-home__col">
        <home-panel
          :data="dataListFiltered"
          type="add"
          @add="addData"
        />
      </div>

      <div class="view-home__col view-home__remove-container">
        <home-panel
          :data="copyList"
          type="remove"
          @remove="removeData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import HomePanel from './components/HomePanel.vue';

export default {
  name: 'ViewHome',
  components: {
    HomePanel,
  },
  computed: {
    ...mapState(['copyList']),
    ...mapGetters(['dataListFiltered']),
  },
  methods: {
    ...mapActions(['addData', 'removeData']),
  },
};
</script>

<style lang="scss">

.view-home {
  padding: 30px;

  &__row {
    display: flex;
    flex-wrap: wrap;
    height: 100%;
  }

  &__col {
    width: auto;
    min-width: 0;
    max-width: 100%;

    flex: 10000 1 0%;
  }

  &__remove-container {
    border-left: 1px solid lightgray;
  }
}
</style>
