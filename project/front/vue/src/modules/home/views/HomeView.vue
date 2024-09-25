<template>
  <div>
    <h1>Funcionalidades del Backend</h1>

    <!-- Funcionalidad Symfony -->
    <div class="functionality">
      <h2>Generar Reporte Detallado (Symfony)</h2>
      <p>Genera un reporte detallado con datos agregados de múltiples fuentes, utilizando procesamiento concurrente.</p>
      <button @click="generateDetailedReport">Generar Reporte</button>
    </div>

    <!-- Funcionalidad Spring Boot -->
    <div class="functionality">
      <h2>Procesar Archivo de Datos Masivo (Spring Boot)</h2>
      <p>Sube y procesa un archivo CSV de gran tamaño, aplicando validaciones y almacenando los datos.</p>
      <button @click="processLargeFile">Procesar Archivo</button>
    </div>

    <!-- Funcionalidad Django -->
    <div class="functionality">
      <h2>Análisis de Sentimiento en Redes Sociales (Django)</h2>
      <p>Analiza el sentimiento de texto o comentarios de redes sociales utilizando un modelo de aprendizaje automático.
      </p>
      <textarea v-model="socialText" placeholder="Introduce el texto para analizar"></textarea>
      <button @click="analyzeSentiment">Analizar Sentimiento</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// import apiClient from '@/api'; // Suponiendo que este es tu cliente HTTP configurado
import FetchHomeData from '@/modules/home/application/useCases/FetchHomeData';
import Symfony from '@/modules/home/application/useCases/Symfony';
const socialText = ref('');

// Funcionalidad Symfony
const generateDetailedReport = async () => {
  try {
    // const response = await apiClient.post('/symfony/report');
    const response = await Symfony.execute();
    console.log('Reporte generado:', response.data);
  } catch (error) {
    console.error('Error generando reporte:', error);
  }
};

// Funcionalidad Spring Boot
const processLargeFile = async () => {
  try {
    // const response = await apiClient.post('/springboot/process-file');
    // console.log('Archivo procesado:', response.data);
  } catch (error) {
    console.error('Error procesando archivo:', error);
  }
};

// Funcionalidad Django
const analyzeSentiment = async () => {
  try {
    // const response = await apiClient.post('/django/analyze-sentiment', { text: socialText.value });
    // console.log('Análisis de sentimiento:', response.data);
  } catch (error) {
    console.error('Error analizando sentimiento:', error);
  }
};


// import { ref, onMounted } from 'vue';
// import { useHome } from '@/modules/home/composables/useHome';
// import FetchHomeData from '@/modules/home/application/useCases/FetchHomeData';

// const { message } = useHome();

// onMounted(async () => {
//   try {
//     const data = await FetchHomeData.execute();
//     console.log('Fetched home data:', data);
//     // message.value = data.title; // Asumiendo que "title" es una propiedad de HomeEntity
//   } catch (error) {
//     console.error('Failed to fetch home data:', error);
//   }
// });
</script>

<style scoped>
.functionality {
  margin-bottom: 20px;
}
</style>
