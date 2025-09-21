<script setup lang="ts">
import { ref } from 'vue';
import { BaseCard } from '@/components/BaseCard';
import { BaseButton } from '@/components/BaseButton';
import { useTodoListStore } from '@/stores/useTodoListStore';
import { useRouter } from 'vue-router';

const router = useRouter();

const { list } = useTodoListStore();

const form = ref({
  name: '',
  category: '',
});

const onSubmit = (e: Event) => {
  e.preventDefault();
  list.push({
    id: Date.now().toString(),
    name: form.value.name,
    category: form.value.category,
    state: 'pending',
  });
  form.value.name = '';
  form.value.category = '';

  router.push('/list-pending');
};
</script>

<template>
  <base-card class="col-start-5 col-span-4 row-start-2 row-span-10">
    <form class="flex flex-col gap-4" @submit="onSubmit">
      <div class="flex flex-col">
        <label for="todo-name"> Name </label>
        <input
          class="border border-neutral-300 hover:border-neutral-500 rounded"
          id="todo-name"
          v-model="form.name"
        />
      </div>
      <div class="flex flex-col">
        <label for="todo-category"> Category </label>
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
      <BaseButton @click="onSubmit" type="submit"> Submit </BaseButton>
    </form>
  </base-card>
</template>

<style scoped></style>
