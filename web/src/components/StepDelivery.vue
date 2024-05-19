<template>
  <div>
    <div class="section-title mb-6">
      <h3 class="text-lg font-semibold">{{ title }}</h3>
    </div>
    <div v-if="loading">
      <p class="text-center text-gray-600">Carregando opções de frete...</p>
    </div>
    <div v-else class="flex flex-col">
      <div v-if="shippingOptionsCorreios || shippingOptionsJadlog">
        <div v-if="shippingOptionsCorreios.valorpac || shippingOptionsCorreios.valorsedex" class="shipping-option mb-8 p-6 border rounded shadow-md">
          <p class="font-semibold text-gray-800">Opções de frete dos Correios:</p>
          <div v-if="shippingOptionsCorreios.valorpac" class="option">
            <label class="block cursor-pointer mb-4 flex items-center">
              <input type="radio" name="correiosOption" :value="{ service: 'PAC', price: shippingOptionsCorreios.valorpac, days: shippingOptionsCorreios.prazopac }" v-model="selectedShippingOption" class="mr-2 cursor-pointer w-4 h-4">
              <span class="text-gray-700">Valor PAC: R$ {{ shippingOptionsCorreios.valorpac }} - Prazo: {{ shippingOptionsCorreios.prazopac }} dias</span>
            </label>
          </div>
          <div v-if="shippingOptionsCorreios.valorsedex" class="option">
            <label class="block cursor-pointer flex items-center">
              <input type="radio" name="correiosOption" :value="{ service: 'SEDEX', price: shippingOptionsCorreios.valorsedex, days: shippingOptionsCorreios.prazosedex }" v-model="selectedShippingOption" class="mr-2 cursor-pointer w-4 h-4">
              <span class="text-gray-700">Valor Sedex: R$ {{ shippingOptionsCorreios.valorsedex }} - Prazo: {{ shippingOptionsCorreios.prazosedex }} dias</span>
            </label>
          </div>
        </div>
        <div v-if="shippingOptionsJadlog.valoreconomico || shippingOptionsJadlog.valorexpresso" class="shipping-option mb-8 p-6 border rounded shadow-md">
          <p class="font-semibold text-gray-800">Opções de frete da Jadlog:</p>
          <div v-if="shippingOptionsJadlog.valoreconomico" class="option">
            <label class="block cursor-pointer mb-4 flex items-center">
              <input type="radio" name="jadlogOption" :value="{ service: 'Econômico', price: shippingOptionsJadlog.valoreconomico, days: shippingOptionsJadlog.prazoeconomico }" v-model="selectedShippingOption" class="mr-2 cursor-pointer w-4 h-4">
              <span class="text-gray-700">Valor Econômico: R$ {{ shippingOptionsJadlog.valoreconomico }} - Prazo: {{ shippingOptionsJadlog.prazoeconomico }}</span>
            </label>
          </div>
          <div v-if="shippingOptionsJadlog.valorexpresso" class="option">
            <label class="block cursor-pointer flex items-center">
              <input type="radio" name="jadlogOption" :value="{ service: 'Expresso', price: shippingOptionsJadlog.valorexpresso, days: shippingOptionsJadlog.prazoexpresso }" v-model="selectedShippingOption" class="mr-2 cursor-pointer w-4 h-4">
              <span class="text-gray-700">Valor Expresso: R$ {{ shippingOptionsJadlog.valorexpresso }} - Prazo: {{ shippingOptionsJadlog.prazoexpresso }} dias</span>
            </label>
          </div>
        </div>
      </div>
      <div v-else>
        <p class="text-gray-600">Nenhuma opção de frete disponível para o endereço fornecido.</p>
      </div>
      <div v-if="error" class="error-message mt-6 text-red-500">
        <p>{{ error }}</p>
      </div>
      <div class="shipping-option mb-8 p-6 border rounded shadow-md">
        <p class="font-semibold text-gray-800">Retirada no endereço:</p>
        <label class="block cursor-pointer flex items-center">
          <input type="radio" name="retiradaOption" :value="{ service: 'Retirada', price: 0, days: 'das 8h às 11h' }" v-model="selectedShippingOption" class="mr-2 cursor-pointer w-4 h-4">
          <span class="text-gray-700">Rua Agrolândia, 325, Glória, Joinville - SC (das 8h às 11h)</span>
        </label>
      </div>
      <button @click="selectShippingOption" :disabled="!selectedShippingOption" class="px-4 py-2 rounded text-white font-bold bg-gradient-to-r from-sky-500 from-10% to-green-500 to-90% hover:from-green-500 hover:to-green-700 focus:outline-none">Finalizar Pedido</button>
    </div>
  </div>
</template>

  <script lang="ts">
  const VUE_APP_CEPCERTO_API_KEY = import.meta.env.VITE_CEPCERTO_API_KEY
  
  export default {
    props: {
      title: String,
      shipping: Object as any,
      billing: Object as any,
      products: Array as any
    },
    data() {
      return {
        shippingOptionsCorreios: null as any,
        shippingOptionsJadlog: null as any,
        selectedShippingOption: null as any,
        loading: false,
        error: null as any,
      };
    },
    computed: {
      totalWeight() {
        return this.calculateTotalWeight();
      },
      totalHeight() {
        return this.calculateTotalDimension('height')/10;
      },
      totalWidth() {
        return this.calculateTotalDimension('width')/10;
      },
      totalLength() {
        return this.calculateTotalDimension('length')/10;
      },
      zipCodeOrigem() {
        return "89202974";
      },
      zipCodeOrigemJadlog(){
        return "89217001";
      },
      zipCodeDestino() {
        return this.shipping.zipCode || this.billing.zipCode;
      }
    },
    methods: {
      async fetchShippingOptions() {
        this.loading = true;
        try {
          // Requisição para os Correios
          const responseCorreios = await fetch(`https://www.cepcerto.com/ws/json-frete/${this.zipCodeOrigem}/${this.zipCodeDestino}/${this.totalWeight}/${this.totalHeight}/${this.totalWidth}/${this.totalLength}/${VUE_APP_CEPCERTO_API_KEY}`);
          if (!responseCorreios.ok) {
            throw new Error('Erro ao carregar opções de frete dos Correios.');
          }
          
          this.shippingOptionsCorreios = await responseCorreios.json();

          // Requisição para a Jadlog
          const responseJadlog = await fetch(`https://www.cepcerto.com/ws/json-frete-jadlog/${this.zipCodeOrigemJadlog}/${this.zipCodeDestino}/${this.totalWeight}/${this.totalHeight}/${this.totalWidth}/${this.totalLength}/${VUE_APP_CEPCERTO_API_KEY}`);
          if (!responseJadlog.ok) {
            throw new Error('Erro ao carregar opções de frete da Jadlog.');
          }
          
          this.shippingOptionsJadlog = await responseJadlog.json();

        } catch (error: any) {
          this.error = error.message;
          console.error('Erro ao obter opções de frete:', error);
        } finally {
          this.loading = false;
        }
      },
      calculateTotalWeight() {
        return this.products.reduce((total: any, product: { weight: any; }) => total + (product.weight || 0), 0);
      },
      calculateTotalDimension(dimension: string) {
        return this.products.reduce((maxValue: number, product: { [x: string]: any; }) => Math.max(maxValue, product[dimension] || 0), 0);
      },
      selectShippingOption() {
        if (this.selectedShippingOption) {
          this.$emit('next-step', this.selectedShippingOption);
        }
      }
    },
    mounted() {
      this.fetchShippingOptions();
    }
  };
  </script>
  

<style scoped>
.section-title {
  margin-bottom: 1.5rem;
}

.shipping-option {
  background-color: #f9fafb;
}

.shipping-option .option {
  padding-left: 1rem;
}

.error-message {
  margin-top: 1.5rem;
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>