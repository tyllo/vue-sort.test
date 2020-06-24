import * as HANDLE_TYPES from '@/helpers/enums/handle-type';

const types = Object.values(HANDLE_TYPES).join('|');

export default [
  {
    path: `/history/:type(${types})?`,
    name: 'history',
    props: true,
    component: () => import('./ViewHistory.vue'),
  },
];
