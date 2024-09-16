<template>
  <div>
    <HomeHeader />
    <!-- <p>{{ message }}</p> -->
    <p>{{ data }}</p>
    <HomeFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
// import { useHome } from '@/modules/home/composables/useHome';
import FetchHomeData from '@/modules/home/application/useCases/FetchHomeData';

// const { message } = useHome();

onMounted(async () => {
  try {
    const data = await FetchHomeData.execute();
    console.log('Fetched home data:', data);
    // message.value = data.title; // Asumiendo que "title" es una propiedad de HomeEntity
  } catch (error) {
    console.error('Failed to fetch home data:', error);
  }
});
</script>

<style scoped>
/* Estilos específicos de la vista */
</style>
