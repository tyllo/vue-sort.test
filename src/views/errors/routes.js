export default [
  {
    path: '*',
    name: 'not-found',
    component: () => import('./ViewError.vue'),
  },
];
