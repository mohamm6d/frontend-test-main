import { describe, test, expect } from "vitest";
import { render, screen } from '@testing-library/vue';
import { createPinia } from 'pinia';
import { useTodoListStore } from '../stores/useTodoListStore';
import PageListPendingItems from '../routes/PageListPendingItems.vue';
import PageListDoneItems from '../routes/PageListDoneItems.vue';

describe('TodoSection', () => {
  test('show list when active', () => {
    const pinia = createPinia();

    render(PageListPendingItems, {
      global: {
        plugins: [pinia]
      }
    });
    expect(screen.getByText('No pending Items')).toBeTruthy();
  });

  test('show pending items', () => {
    const pinia = createPinia();
    const store = useTodoListStore(pinia);
    store.list.push(
      { id: '1', name: 'Pending Todo', category: 'Work', state: 'pending' },
      { id: '2', name: 'Done Todo', category: 'Health', state: 'done' }
    );

    render(PageListPendingItems, {
      global: {
        plugins: [pinia]
      }
    });
    expect(screen.getByText('Pending Todo')).toBeTruthy();
  });

  test('pending items should not appear in done screen', () => {
    const pinia = createPinia();
    const store = useTodoListStore(pinia);
    store.list.push(
      { id: '1', name: 'Only Pending Item', category: 'Work', state: 'pending' },
      { id: '2', name: 'Another Pending', category: 'Personal', state: 'pending' }
    );

    render(PageListDoneItems, {
      global: {
        plugins: [pinia]
      }
    });

    expect(screen.queryByText('Only Pending Item')).toBeFalsy();
    expect(screen.queryByText('Another Pending')).toBeFalsy();
    expect(screen.getByRole('list')).toBeTruthy();
  });

  test('done items should not appear in pending screen', () => {
    const pinia = createPinia();
    const store = useTodoListStore(pinia);
    store.list.push(
      { id: '1', name: 'Only Done Item', category: 'Work', state: 'done' },
      { id: '2', name: 'Another Done', category: 'Health', state: 'done' }
    );

    render(PageListPendingItems, {
      global: {
        plugins: [pinia]
      }
    });

    expect(screen.queryByText('Only Done Item')).toBeFalsy();
    expect(screen.queryByText('Another Done')).toBeFalsy();
    expect(screen.getByRole('list')).toBeTruthy();
  });

  test('mixed items should be properly filtered', () => {
    const pinia = createPinia();
    const store = useTodoListStore(pinia);
    store.list.push(
      { id: '1', name: 'Pending Task 1', category: 'Work', state: 'pending' },
      { id: '2', name: 'Done Task 1', category: 'Health', state: 'done' },
      { id: '3', name: 'Pending Task 2', category: 'Personal', state: 'pending' },
      { id: '4', name: 'Done Task 2', category: 'Work', state: 'done' }
    );

    const { unmount: unmountPending } = render(PageListPendingItems, {
      global: {
        plugins: [pinia]
      }
    });

    expect(screen.getByText('Pending Task 1')).toBeTruthy();
    expect(screen.getByText('Pending Task 2')).toBeTruthy();
    expect(screen.queryByText('Done Task 1')).toBeFalsy();
    expect(screen.queryByText('Done Task 2')).toBeFalsy();

    unmountPending();

    render(PageListDoneItems, {
      global: {
        plugins: [pinia]
      }
    });

    expect(screen.getByText('Done Task 1')).toBeTruthy();
    expect(screen.getByText('Done Task 2')).toBeTruthy();
    expect(screen.queryByText('Pending Task 1')).toBeFalsy();
    expect(screen.queryByText('Pending Task 2')).toBeFalsy();
  });
});
