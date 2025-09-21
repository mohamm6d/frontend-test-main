<script setup lang="ts">
import { computed } from 'vue';
import { BaseCard } from '@/components/BaseCard';
import { useTodoListStore } from '@/stores/useTodoListStore';
import { ListItem } from '@/components/ListItem';

const { list } = useTodoListStore();

const hasItems = computed(() => {
  return !!list.length;
});
</script>

<template>
  <base-card class="col-start-3 col-span-8 row-start-2 row-span-10">
    <div v-if="!hasItems">No pending Items</div>

    <ul class="flex flex-col gap-3" v-for="item in list" :key="item.id">
      <list-item :description="item.name" :state="item.state" />
    </ul>
  </base-card>
</template>

<style scoped></style>
