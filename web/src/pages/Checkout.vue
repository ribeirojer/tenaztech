<template>
  <div class="container mx-auto flex flex-col lg:flex-row gap-4 px-4 lg:px-0 my-8 lg:my-12">
    <div class="w-full lg:w-2/3">
      <CheckoutProgress :currentStep="currentStep" :steps="steps" />
      <div v-if="currentStep === 0">
        <StepPersonalInfo :personalInfo="personalInfo" @next-step="handlePersonalInfo" />
      </div>
      <div v-else-if="currentStep === 1">
        <StepBillingShipping @next-step="handleBillingShipping" />
      </div>
      <div v-else-if="currentStep === 2">
        <StepDelivery :shipping="shipping" :billing="billing" :products="products" @next-step="checkout"/>
        <button @click="currentStep--" class="mt-4 px-4 py-2 rounded text-white font-bold bg-gray-300 hover:bg-gray-400 focus:outline-none">
          Voltar
        </button>
      </div>
      <div v-else-if="currentStep === 3">
      </div>
    </div>
    <div class="w-full lg:w-1/3">
      <OrderDetails :products="products" />
    </div>    
  </div>
</template>

<script lang="ts">
import CheckoutProgress from '../components/CheckoutProgress.vue';
import StepPersonalInfo from '../components/StepPersonalInfo.vue';
import StepBillingShipping from '../components/StepBillingShipping.vue';
import StepDelivery from '../components/StepDelivery.vue';
import OrderDetails from '../components/OrderDetails.vue';
import axios from 'axios';

export default {
  components: {
    OrderDetails,
    CheckoutProgress,
    StepPersonalInfo,
    StepBillingShipping,
    StepDelivery
  },
  data() {
    return {
      selectedShippingOption: null as any,
      totalPrice: 0, 
      paymentStatus: '',
      currentStep: 2,
      paymentLink: '',
      coupon: {} as any,
      steps: [
        'Informações',//'Informações do Cliente'
        'Endereço',//'Endereço e Envio',
        'Pedido',//Resumo do Pedido'
        'Pagamento'//'Pagamento e Confirmação'
      ],
      personalInfo: {
        name: '',
        email: '',
        tel: '',
        createAccount: false,
        password: '',
      },
      billing: {
        zipCode: '',
        address: '',
        number: "",
        complement: "",
        neiborhood: "",
        city: '',
        state: "",
      },
      shipping: {
        zipCode: '89216410',
        address: '',
        number: "",
        complement: "",
        neiborhood: "",
        city: '',
        state: "",
      },
      products: [] as any
    };
  },
  created() {
    this.coupon = JSON.parse(localStorage.getItem('coupon') || '[]');
    this.fetchUserDetails();
    this.fetchCartProducts();
  },
  methods: {
    handlePersonalInfo() {
      this.currentStep++;
    },
    handleBillingShipping(data: { billing: { zipCode: string; address: string; number: string; complement: string; neiborhood: string; city: string; state: string; }; shipping: { zipCode: string; address: string; number: string; complement: string; neiborhood: string; city: string; state: string; }; }){
      this.billing = data.billing
      this.shipping = data.shipping
      this.currentStep++;
    },
    async fetchUserDetails() {
      try {
        const response = await axios.get('/api/user/details');
        const userData = response.data;
        console.log(userData)
        //this.billing = { ...this.billing, ...userData };
        //this.shipping = { ...this.shipping, ...userData };
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    },
    async fetchCartProducts() {
      try {
        const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
        for (const item of cartItems) {
          const response = await axios.get(`https://product-catalog-service.deno.dev/api/products/${item.slug}`);
          const productDetails = response.data;
          this.products.push({
            name: productDetails.name,
            quantity: item.quantity,
            price: productDetails.price,
            weight: productDetails.weight,
            height: productDetails.height,
            width: productDetails.width,
            length: productDetails.length
          });
        }
      } catch (error) {
        console.error('Error fetching cart products:', error);
      }
    },
    async processOrder() {
      try {
      // Constrói o objeto contendo os detalhes do pedido
      const orderDetails = {
        personalInfo: this.personalInfo,
        billing: this.billing,
        shipping: this.shipping,
        products: this.products,
        total: this.totalPrice,
      };

      // Envia a requisição HTTP POST para fazer o pedido
      const response = await axios.post('/api/orders', orderDetails)

      const { data } = response
      
      this.paymentLink = data.paymentLink;
      localStorage.removeItem('cart');
      } catch (error) {
        console.error('Erro ao processar pagamento:', error);
        this.paymentStatus = 'error';
      }
    },
    calculateTotal() {
  let total = 0;

  // Adicione o preço de cada produto ao total
  this.products.forEach((product: { price: string; }) => {
    total += parseFloat(product.price);
  });

  // Adicione o custo do frete, se houver uma opção de entrega selecionada
  if (this.selectedShippingOption) {
    total += parseFloat(this.selectedShippingOption.price.replace(',', '.'));
  }

  // Subtraia o valor do desconto do cupom, se houver um cupom aplicado
  if (this.coupon) {
    if (this.coupon.type === 'fixed') {
      total -= parseFloat(this.coupon.value);
    } else if (this.coupon.type === 'percent') {
      total -= (parseFloat(this.coupon.value) / 100) * total;
    }
  }

  // Certifique-se de que o total não seja negativo
  total = Math.max(total, 0);

  // Salve o total calculado na variável totalPrice
  this.totalPrice = parseFloat(total.toFixed(2));
},
      validateOrderDetails() {
        if (
          !this.personalInfo.name ||
          !this.personalInfo.email ||
          !this.personalInfo.tel ||

          !this.billing.address ||
          !this.billing.city ||
          !this.billing.zipCode ||
          !this.billing.number ||
          !this.billing.neiborhood ||
          !this.billing.state ||

          this.products.length === 0
        ) {
          return false;
        }
        if(this.personalInfo.createAccount){
          if(!this.personalInfo.password){
            return false;
          }
        }

        return true;
      },
      async checkout(option: null) {
        this.selectedShippingOption = option;
    
        if (!this.validateOrderDetails()) {
        //  return;
        }
        
        this.calculateTotal();
        await this.processOrder();

      if (this.paymentLink) {
        this.$router.push({ path: '/confirmacao-pedido', query: { link: this.paymentLink } });
      }
    }
  },  
};
</script>