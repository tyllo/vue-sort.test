import { api } from '@/api';
import * as HANDLE_TYPES from '@/helpers/enums/handle-type';

const createState = () => ({
  dataList: [],
  copyList: [],
  historyList: [],
  filters: {
    search: '',
  },
});

const getters = {
  dataListFiltered: (state) => {
    const copyListIds = state.copyList.map((_) => _.id);
    if (!copyListIds.length) return state.dataList;

    // TODO: а может целесообразнее иметь копию dataList и перекладывать чем фильтровать?
    return state.dataList.filter((_) => !copyListIds.includes(_.id));
  },

  dataListFilteredBySearch: (state, { dataListFiltered: list }) => {
    const search = state.filters.search?.toLowerCase();
    if (!search) return list;

    return list
      .reduce((acc, data) => {
        const isIncludes = data.name?.toLowerCase().includes(search);
        const { length } = data.items.filter((_) => _.name?.toLowerCase().includes(search));
        const count = isIncludes ? length + 1 : length;
        if (!count) return acc;
        const options = { data, count };
        return acc.concat(options);
      }, [])
      // чем больше count, тем выше data
      .sort((a, b) => b.count - a.count)
      .map((_) => _.data);
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
