<template>
        <div class="container flex mx-auto gap-4">
          <div id="aside" class="flex flex-col lg:w-1/4">
            <div class="aside bg-gray-900 p-4">
              <h2 class="text-white text-2xl mb-4">Categorias</h2>
              <div class="checkbox-filter">
                <div class="input-checkbox">
                  <input type="checkbox" id="category-1" class="checkbox-purple">
                  <label for="category-1" class="text-white">Laptops</label>
                </div>
                <div class="input-checkbox">
                  <input type="checkbox" id="category-2" class="checkbox-purple">
                  <label for="category-2" class="text-white">Smartphones</label>
                </div>
                <div class="input-checkbox">
                  <input type="checkbox" id="category-3" class="checkbox-purple">
                  <label for="category-3" class="text-white">Câmeras</label>
                </div>
                <div class="input-checkbox">
                  <input type="checkbox" id="category-4" class="checkbox-purple">
                  <label for="category-4" class="text-white">Acessórios</label>
                </div>
                <div class="input-checkbox">
                  <input type="checkbox" id="category-5" class="checkbox-purple">
                  <label for="category-5" class="text-white">Promoções</label>
                </div>
              </div>
            </div>
            <div class="aside bg-gray-900 p-4">
              <div class="price-slider">
                <h2 class="text-white text-2xl mb-4">Preço</h2>
                <h2 class="text-purple-500 text-2xl">R$50</h2>
              </div>
              <input type="range" step="50" min="0" max="5000" class="input-range" value="50">
            </div>
            <div class="aside bg-gray-900 p-4">
              <h2 class="text-white text-2xl mb-4">Marca</h2>
              <div class="checkbox-filter">
                <div class="input-checkbox">
                  <input type="checkbox" id="SAMSUNG" class="checkbox-purple">
                  <label for="SAMSUNG" class="text-white">SAMSUNG</label>
                </div>
                <div class="input-checkbox">
                  <input type="checkbox" id="LG" class="checkbox-purple">
                  <label for="LG" class="text-white">LG</label>
                </div>
                <div class="input-checkbox">
                  <input type="checkbox" id="SONY" class="checkbox-purple">
                  <label for="SONY" class="text-white">SONY</label>
                </div>
              </div>
            </div>
            <div class="product-list bg-gray-900 p-4">
              <h2 class="text-white text-center text-2xl mb-4">Mais Vendidos</h2>
              <div class="product-widget">
                <div class="product-img"><img src="/img/product01.png" alt="Dell XPS 13"></div>
                <div class="product-body">
                  <h2 class="text-white text-xs">Laptops</h2>
                  <a href="/produto?produtoId=4" class="text-purple-500 font-bold">Dell XPS 13</a>
                  <p class="text-white">R$ 1.199,99</p>
                </div>
              </div>
              <div class="product-widget">
                <div class="product-img"><img src="/img/product02.png" alt="Fone Gamer"></div>
                <div class="product-body">
                  <h2 class="text-white text-xs">Fones de ouvido</h2>
                  <a href="/produto?produtoId=5" class="text-purple-500 font-bold">Fone Gamer</a>
                  <p class="text-white">R$ 299,99</p>
                </div>
              </div>
              <div class="product-widget">
                <div class="product-img"><img src="/img/product03.png" alt="Notebook Dell Inspiron 15"></div>
                <div class="product-body">
                  <h2 class="text-white text-xs">Laptops</h2>
                  <a href="/produto?produtoId=6" class="text-purple-500 font-bold">Notebook Dell Inspiron 15</a>
                  <p class="text-white">R$ 3.899,99</p>
                </div>
              </div>
            </div>
          </div>
          <div class="lg:w-3/4">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 px-4 md:px-0">
              <Product v-for="(product, index) in filteredProducts" :key="index" v-bind="product" />
            </div>
          </div>
        </div>
    </template>
    
    <script lang="ts">
    import Product from "../components/Product.vue";
    
    export default {
      name: 'ProductListView',
      data() {
        return {
          products: [] as any,
          query: '',
        };
      },
      components: {
        Product,
      },
      computed: {
        filteredProducts() {
          if (!this.query) return this.products;
    
          const filtered = this.products.filter((product: { category: string; }) => {
            // Verifica se a query corresponde ao nome da categoria do produto
            return product.category.toLowerCase().includes(this.query.toLowerCase());
          });
    
          return filtered;
        }
      },
      mounted() {
        // Obtém a query da URL
        const urlParams = new URLSearchParams(window.location.search);
        this.query = urlParams.get('c') || ''; // 'c' é o parâmetro da query na URL
      }
    };
    </script>
    
    <style scoped>
    /* Estilos para a página de lista de produtos */
    </style>
    