<template>
  <div class="container mx-auto">
    <h1 class="text-3xl font-bold mb-4">Comparação de Produtos</h1>

    <!-- Tabela de comparação de produtos -->
    <table class="w-full border-collapse border border-gray-200">
      <thead>
        <tr class="bg-gray-200">
          <th class="border border-gray-200 py-2 px-4">Características</th>
          <th v-for="(product, index) in products" :key="index" class="border border-gray-200 py-2 px-4">{{ product.name }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(feature, index) in features" :key="index" class="border-b border-gray-200">
          <td class="border border-gray-200 py-2 px-4">{{ feature.name }}</td>
          <td v-for="(product, idx) in products" :key="idx" class="border border-gray-200 py-2 px-4">
            {{ product.features[feature.key] || '-' }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ComparisonView',
  data() {
    return {
      products: [
        {
          name: 'Produto A',
          features: {
            price: '$999',
            screenSize: '15"',
            resolution: '1920x1080',
            processor: 'Intel Core i5',
            ram: '8GB',
          },
        },
        {
          name: 'Produto B',
          features: {
            price: '$1299',
            screenSize: '14"',
            resolution: '2560x1440',
            processor: 'AMD Ryzen 7',
            ram: '16GB',
          },
        },
        // Adicione mais produtos conforme necessário
      ] as any,
      features: [
        { name: 'Preço', key: 'price' },
        { name: 'Tamanho da Tela', key: 'screenSize' },
        { name: 'Resolução', key: 'resolution' },
        { name: 'Processador', key: 'processor' },
        { name: 'RAM', key: 'ram' },
        // Adicione mais características conforme necessário
      ],
    };
  },
};
</script>

<style scoped>
/* Estilos para a página de comparação de produtos */
</style>
