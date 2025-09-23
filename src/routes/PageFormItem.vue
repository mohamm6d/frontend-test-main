<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { BaseCard } from '@/components/BaseCard';
import { BaseButton } from '@/components/BaseButton';
import { useTodoListStore } from '@/stores/useTodoListStore';
import { useRouter } from 'vue-router';

const router = useRouter();
const { list } = useTodoListStore();

const form = ref({
  description: '',
  category: 'Health',
});

const props = defineProps<{
  action: 'create' | 'edit';
  id?: string;
}>();

onMounted(() => {
  if (props.action === 'edit') {
    form.value.description = list.find((item) => item.id === props.id)?.description || '';
    form.value.category = list.find((item) => item.id === props.id)?.category || '';
  }
});

const onSubmit = (action: 'create' | 'edit') => {
  if (form.value.description.trim() === '') {
    alert('Name is required');
    return;
  }
  if (form.value.category.trim() === '') {
    alert('Category is required');
    return;
  }
  if (action === 'create') {
    list.push({
      id: Date.now().toString(),
      description: form.value.description,
      category: form.value.category,
      state: 'pending',
    });
  } else {
    list.find((item) => item.id === props.id).description = form.value.description;
    list.find((item) => item.id === props.id).category = form.value.category;
  }
  form.value.description = '';
  form.value.category = '';

  router.push('/list-pending');
};
</script>

<template>
  <base-card class="col-start-5 col-span-4 row-start-2 row-span-10">
    <form class="flex flex-col gap-4" @submit.prevent="onSubmit(action)">
      <div class="flex flex-col">
        <label for="todo-description">Description</label>
        <input
          class="border border-neutral-300 hover:border-neutral-500 rounded"
          id="todo-description"
          v-model="form.description"
        />
      </div>
      <div class="flex flex-col">
        <label for="todo-category">Category</label>
        <select
          class="border border-neutral-300 hover:border-neutral-500 rounded"
          id="todo-category"
          v-model="form.category"
        >
          <option value="Health">Health</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
        </select>
      </div>
      <BaseButton type="submit"> Submit </BaseButton>
    </form>
  </base-card>
</template>

<style scoped></style>
