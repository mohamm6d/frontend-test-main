
import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { createPinia } from 'pinia';
import PageFormItem from '../routes/PageFormItem.vue';
import { useTodoListStore } from '../stores/useTodoListStore';

const mockPush = vi.fn();
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: mockPush
  })
}));

describe('TodoForm', () => {
  beforeEach(() => {
    mockPush.mockClear();
    vi.clearAllMocks();
  });
  test('add new item', async () => {
    const user = userEvent.setup();
    const pinia = createPinia();
    const store = useTodoListStore(pinia);

    expect(store.list).toHaveLength(0);

    render(PageFormItem, {
      props: { action: 'create' },
      global: {
        plugins: [pinia]
      }
    });

    const nameInput = screen.getByLabelText('Name');
    const categorySelect = screen.getByLabelText('Category');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    await user.type(nameInput, 'Test Todo');
    await user.selectOptions(categorySelect, 'Work');
    await user.click(submitButton);

    expect(store.list).toHaveLength(1);
    expect(store.list[0].name).toBe('Test Todo');
    expect(store.list[0].category).toBe('Work');
    expect(store.list[0].state).toBe('pending');
    expect(mockPush).toHaveBeenCalledWith('/list-pending');
  });

  test('edit item', async () => {
    const user = userEvent.setup();
    const pinia = createPinia();
    const store = useTodoListStore(pinia);
    store.list.push({ id: '123', name: 'Existing Todo', category: 'Health', state: 'pending' });

    expect(store.list[0].name).toBe('Existing Todo');
    expect(store.list[0].category).toBe('Health');

    render(PageFormItem, {
      props: { action: 'edit', id: '123' },
      global: {
        plugins: [pinia]
      }
    });

    const nameInput = screen.getByLabelText('Name');
    const categorySelect = screen.getByLabelText('Category');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    await new Promise(resolve => setTimeout(resolve, 10));
    expect(nameInput.value).toBe('Existing Todo');
    expect(categorySelect.value).toBe('Health');

    await user.clear(nameInput);
    await user.type(nameInput, 'Updated Todo');
    await user.selectOptions(categorySelect, 'Work');
    await user.click(submitButton);

    expect(store.list).toHaveLength(1);
    expect(store.list[0].name).toBe('Updated Todo');
    expect(store.list[0].category).toBe('Work');
    expect(store.list[0].state).toBe('pending');
    expect(store.list[0].id).toBe('123');
    expect(mockPush).toHaveBeenCalledWith('/list-pending');
  });

  test('form validation prevents empty submission', async () => {
    const user = userEvent.setup();
    const pinia = createPinia();
    const store = useTodoListStore(pinia);

    render(PageFormItem, {
      props: { action: 'create' },
      global: {
        plugins: [pinia]
      }
    });

    const submitButton = screen.getByRole('button', { name: 'Submit' });
    await user.click(submitButton);
    expect(store.list).toHaveLength(0);
    expect(mockPush).not.toHaveBeenCalled();
  });
});
