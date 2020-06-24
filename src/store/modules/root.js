import { api } from '@/api';
import * as HANDLE_TYPES from '@/helpers/enums/handle-type';

const createState = () => ({
  dataList: [],
  copyList: [],
  // TODO:
  // а может стоило бы разнести данные и историю по разным модулям?
  // Тогда нужно было бы слушать заранее известные экшены addData и removeData
  historyList: [],
  filters: {
    search: '',
  },
});

const getters = {
  dataListFiltered: (state) => {
    const copyListIds = state.copyList.map((_) => _.id);
    if (!copyListIds.length) return state.dataList;

    // TODO: а может целесообразнее иметь копию dataList чем фильтровать?
    return state.dataList.filter((_) => !copyListIds.includes(_.id));
  },

  dataListFilteredBySearch: (state, { dataListFiltered: list }) => {
    const search = state.filters.search?.toLowerCase();
    if (!search) return list;

    return list.filter((_) => _.name?.toLowerCase().includes(search));
  },

  addHistoryList: (state) => state.historyList
    .filter((_) => _.type === HANDLE_TYPES.ADD),

  removeHistoryList: (state) => state.historyList
    .filter((_) => _.type === HANDLE_TYPES.REMOVE),
};

const mutations = {
  setDataList(state, payload) {
    state.dataList = payload;
  },

  setCopyList(state, payload) {
    state.copyList = payload;
  },

  setHistory(state, payload) {
    state.historyList.push(payload);
  },

  setFilters(state, payload) {
    state.filters = payload;
  },
};

const actions = {
  async getData({ commit }) {
    const { data } = await api.getData();
    commit('setDataList', data);
  },

  addData({ dispatch }, data) {
    dispatch('handleData', { type: HANDLE_TYPES.ADD, data });
  },

  removeData({ dispatch }, data) {
    dispatch('handleData', { type: HANDLE_TYPES.REMOVE, data });
  },

  handleData({ state, commit }, { type, data }) {
    let { copyList } = state;

    switch (type) {
      case HANDLE_TYPES.ADD:
        copyList = copyList.concat(data);
        break;

      case HANDLE_TYPES.REMOVE:
        copyList = copyList.filter((_) => _.id !== data.id);
        break;

      default:
    }

    commit('setCopyList', copyList);
    commit('setHistory', { date: new Date().getTime(), data, type });
  },

  filterBySearchDataList({ commit }, value) {
    const search = value?.trim();
    const data = { ...commit.filters, search };
    commit('setFilters', data);
  },
};

export const root = {
  state: createState,
  getters,
  mutations,
  actions,
};
