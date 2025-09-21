import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Root',
    redirect: '/list-pending',
    children: [
      {
        path: '/list-pending',
        name: 'ListPending',
        component: () => import('./PageListPendingItems.vue'),
      },
      {
        path: '/list-done',
        name: 'ListDone',
        component: () => import('./PageListDoneItems.vue'),
      },
      {
        path: '/create',
        name: 'Create',
        component: () => import('./PageFormItem.vue'),
        props: (route) => ({
          action: 'create',
        }),
      },
      {
        path: '/edit/:id',
        name: 'Edit',
        component: () => import('./PageFormItem.vue'),
        props: (route) => ({
          action: 'edit',
          id: route.params.id,
        }),

      },
    ],
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
