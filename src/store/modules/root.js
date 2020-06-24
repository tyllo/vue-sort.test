import { api } from '@/api';

const HANDLE_TYPE = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
};

const createState = () => ({
  dataList: [],
  copyList: [],
  // TODO:
  // а может стоило бы разнести данные и историю по разным модулям?
  // Тогда нужно было бы слушать заранее известные экшены addData и removeData
  historyList: [],
});

const getters = {
  dataListFiltered: (state) => {
    const copyListIds = state.copyList.map((_) => _.id);
    if (!copyListIds.length) return state.dataList;

    // TODO: а может целесообразнее иметь копию dataList чем фильтровать?
    return state.dataList.filter((_) => !copyListIds.includes(_.id));
  },

  addHistoryList: (state) => state.historyList
    .filter((_) => _.type === HANDLE_TYPE.ADD),

  removeHistoryList: (state) => state.historyList
    .filter((_) => _.type === HANDLE_TYPE.REMOVE),
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
};

const actions = {
  async getData({ commit }) {
    const { data } = await api.getData();
    commit('setDataList', data);
  },

  addData({ dispatch }, data) {
    dispatch('handleData', { type: HANDLE_TYPE.ADD, data });
  },

  removeData({ dispatch }, data) {
    dispatch('handleData', { type: HANDLE_TYPE.REMOVE, data });
  },

  handleData({ state, commit }, { type, data }) {
    let { copyList } = state;

    switch (type) {
      case HANDLE_TYPE.ADD:
        copyList = copyList.concat(data);
        break;

      case HANDLE_TYPE.REMOVE:
        copyList = copyList.filter((_) => _.id !== data.id);
        break;

      default:
    }

    commit('setCopyList', copyList);
    commit('setHistory', { date: new Date(), data, type });
  },
};

export const root = {
  state: createState,
  getters,
  mutations,
  actions,
};
