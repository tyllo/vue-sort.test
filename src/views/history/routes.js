export default [
  {
    path: '/history',
    name: 'history',
    component: () => import('./ViewHistory.vue'),
  },
  {
    path: '/history/add',
    name: 'history.add',
    component: () => import('./ViewHistoryAdd.vue'),
  },
  {
    path: '/history/remove',
    name: 'history.remove',
    component: () => import('./ViewHistoryRemove.vue'),
  },
];
