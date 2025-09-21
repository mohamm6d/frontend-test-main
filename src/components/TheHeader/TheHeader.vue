<script setup lang="ts">
import { defineComponent } from 'vue';
import { BaseCard } from '@/components/BaseCard';
import { useRouter } from 'vue-router';

defineComponent({
  name: 'TheHeader',
});

const router = useRouter();

const navigateTo = (path: string) => {
  router.push(path);
};
</script>

<template>
  <base-card class="col-span-full grid auto-flow-col items-center">
    <h3>Page Name</h3>
    <div class="grid auto-flow-col gap-2 justify-end">
      <button @click="navigateTo('/create')">Create</button>
      <button @click="navigateTo('/list-pending')">Pending</button>
      <button @click="navigateTo('/list-done')">Done</button>
    </div>
  </base-card>
</template>

<style scoped></style>
