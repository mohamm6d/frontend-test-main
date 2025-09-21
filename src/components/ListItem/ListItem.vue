<script setup lang="ts">
import { computed, defineComponent } from 'vue';
import { ListItemState } from '@/types';
import { BaseButton } from '@/components/BaseButton';
import { useTodoListStore } from '@/stores/useTodoListStore';

const { list } = useTodoListStore();

defineComponent({
  name: 'ListItem',
});

const props = withDefaults(
  defineProps<{
    description: string;
    state?: ListItemState;
  }>(),
  {
    state: 'pending',
  }
);

const listItemClasses = computed(() => {
  return {
    pending: '',
    done: 'line-through',
  }[props.state];
});

const editItem = () => {
  router.push(`/edit/${props.id}`);
};

const removeItem = () => {
  list.splice(list.indexOf(props.id), 1);
};

const completeItem = () => {
  props.state = 'done';
};
</script>

<template>
  <li
    :class="[
      'border border-neutral-300 rounded py-2 px-4 flex flex-row items-center gap-2',
      listItemClasses,
    ]"
    :aria-checked="state === 'done'"
  >
    <base-button @click="completeItem" :disabled="state === 'done'" >Complete</base-button>
    <div class="w-full">
      {{ description }}
    </div>
    <base-button @click="editItem">Edit</base-button>
    <base-button @click="removeItem">Remove</base-button>
  </li>
</template>

<style scoped></style>
