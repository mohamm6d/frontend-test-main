<script setup lang="ts">
import { computed } from 'vue';
import { BaseCard } from '@/components/BaseCard';
import { useTodoListStore } from '@/stores/useTodoListStore';
import { ListItem } from '@/components/ListItem';

const { list } = useTodoListStore();
const doneList = computed(() => {
  return list.filter((item) => item.state === 'done');
});
const hasItems = computed(() => {
  return !!list.length;
});
</script>

<template>
  <base-card class="col-start-5 col-span-4 row-start-2 row-span-10">
    <div v-if="!hasItems">No done Items</div>
    <ul class="flex flex-col gap-3">
      <list-item
        v-for="item in doneList"
        :key="item.id"
        :description="item.name"
        :state="item.state"
        :id="item.id"
      />
    </ul>
  </base-card>
</template>

<style scoped></style>
