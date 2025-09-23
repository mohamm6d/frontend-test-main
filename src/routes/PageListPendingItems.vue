<script setup lang="ts">
import { computed } from 'vue';
import { BaseCard } from '@/components/BaseCard';
import { useTodoListStore } from '@/stores/useTodoListStore';
import { ListItem } from '@/components/ListItem';

const { list } = useTodoListStore();
const pendingList = computed(() => {
  return list.filter((item) => item.state === 'pending');
});
const hasItems = computed(() => {
  return !!pendingList.value.length;
});
</script>

<template>
  <base-card class="col-start-5 col-span-4 row-start-2 row-span-10">
    <div v-if="!hasItems">No pending Items</div>

    <ul class="flex flex-col gap-3">
      <list-item
        v-for="item in pendingList"
        :key="item.id"
        :description="item.description"
        :state="item.state"
        :id="item.id"
      />
    </ul>
  </base-card>
</template>

<style scoped></style>
