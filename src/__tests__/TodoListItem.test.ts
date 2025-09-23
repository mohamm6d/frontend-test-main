import { describe, test, expect, vi } from "vitest";
import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { createPinia } from 'pinia';
import { useTodoListStore } from '../stores/useTodoListStore';
import ListItem from '../components/ListItem/ListItem.vue';

const mockPush = vi.fn();
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: mockPush
  })
}));

describe('TodoListItem', () => {
  test('render component as done', () => {
    render(ListItem, {
      props: {
        description: 'Test Todo',
        state: 'done',
        id: '123',
      },
      global: {
        plugins: [createPinia()]
      }
    });

    expect(screen.getByText('Test Todo')).toBeTruthy();
    expect(screen.getByText('Pending')).toBeTruthy();
  });

  test('render component as pending', () => {
    render(ListItem, {
      props: {
        description: 'Pending Todo',
        state: 'pending',
        id: '456',
      },
      global: {
        plugins: [createPinia()]
      }
    });

    expect(screen.getByText('Pending Todo')).toBeTruthy();
    expect(screen.getByText('Done')).toBeTruthy();
  });

  test('emit removal of item', async () => {
    const user = userEvent.setup();
    const pinia = createPinia();
    const store = useTodoListStore(pinia);
    store.list.push({ id: '123', description: 'Test Todo', category: 'Work', state: 'pending' });

    render(ListItem, {
      props: {
        description: 'Test Todo',
        state: 'pending',
        id: '123',
      },
      global: {
        plugins: [pinia]
      }
    });

    const removeButton = screen.getByText('Remove');
    await user.click(removeButton);
    expect(removeButton).toBeTruthy();
  });

  test('emit edit of item information', async () => {
    const user = userEvent.setup();

    render(ListItem, {
      props: {
        description: 'Test Todo',
        state: 'pending',
        id: '123',
      },
      global: {
        plugins: [createPinia()]
      }
    });

    const editButton = screen.getByText('Edit');
    await user.click(editButton);

    expect(mockPush).toHaveBeenCalledWith('/edit/123');
  });
});
