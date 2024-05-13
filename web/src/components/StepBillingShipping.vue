<template>
  <div class="flex flex-col">
    <div class="billing-details">
      <div class="section-title mb-4">
        <h3 class="text-lg font-semibold">Endereço de Cobrança</h3>
      </div>
      <div class="form-group mb-4">
        <input ref="zipCodeInput" :class="{'border-green-500': !errors.zipCode && billing.zipCode, 'border-red-500': errors.zipCode}" class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" v-model="billing.zipCode" name="zip-code" placeholder="CEP" @blur="handleCepSubmission('billing')">
        <p v-if="errors.zipCode" class="text-red-500 text-sm mt-1">{{ errors.zipCode }}</p>
      </div>
      <div class="flex flex-wrap -mx-2 mb-4 gap-4 md:gap-0">
        <div class="w-full md:w-1/2 px-2">
          <input ref="addressInput" :class="{'border-green-500': !errors.address && billing.address, 'border-red-500': errors.address}" class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" v-model="billing.address" name="address" placeholder="Endereço" @blur="validateField('address')">
          <p v-if="errors.address" class="text-red-500 text-sm mt-1">{{ errors.address }}</p>
        </div>
        <div class="w-full md:w-1/2 px-2">
          <input ref="numberInput" :class="{'border-green-500': !errors.number && billing.number, 'border-red-500': errors.number}" class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" v-model="billing.number" name="number" placeholder="Número" @blur="validateField('number')">
          <p v-if="errors.number" class="text-red-500 text-sm mt-1">{{ errors.number }}</p>
        </div>
      </div>
      <div class="flex flex-wrap -mx-2 mb-4 gap-4 md:gap-0">
        <div class="w-full md:w-1/2 px-2">
          <input ref="complementInput" :class="{'border-green-500': !errors.complement && billing.complement, 'border-red-500': errors.complement}" class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" v-model="billing.complement" name="complement" placeholder="Complemento">
          <p v-if="errors.complement" class="text-red-500 text-sm mt-1">{{ errors.complement }}</p>
        </div>
        <div class="w-full md:w-1/2 px-2">
          <input ref="neighborhoodInput" :class="{'border-green-500': !errors.neighborhood && billing.neighborhood, 'border-red-500': errors.neighborhood}" class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" v-model="billing.neighborhood" name="neighborhood" placeholder="Bairro" @blur="validateField('neighborhood')">
          <p v-if="errors.neighborhood" class="text-red-500 text-sm mt-1">{{ errors.neighborhood }}</p>
        </div>
      </div>
      <div class="flex flex-wrap -mx-2 mb-4 gap-4 md:gap-0">
        <div class="w-full md:w-1/2 px-2">
          <input ref="cityInput" :class="{'border-green-500': !errors.city && billing.city, 'border-red-500': errors.city}" class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" v-model="billing.city" name="city" placeholder="Cidade" @blur="validateField('city')">
          <p v-if="errors.city" class="text-red-500 text-sm mt-1">{{ errors.city }}</p>
        </div>
        <div class="w-full md:w-1/2 px-2">
          <input ref="stateInput" :class="{'border-green-500': !errors.state && billing.state, 'border-red-500': errors.state}" class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" v-model="billing.state" name="state" placeholder="Estado" @blur="validateField('state')">
          <p v-if="errors.state" class="text-red-500 text-sm mt-1">{{ errors.state }}</p>
        </div>
      </div>
    </div>
    <div class="form-group mb-4">
      <label for="deliverToDifferentAddress" class="block text-sm font-medium text-gray-700">
        <input id="deliverToDifferentAddress" v-model="deliverToDifferentAddress" type="checkbox" class="form-checkbox h-5 w-5 text-indigo-600"><span class="ml-2">Entregar em um endereço diferente?</span>
      </label>
    </div>
    <div v-if="deliverToDifferentAddress" class="billing-details">
      <div class="section-title mb-4">
        <h3 class="text-lg font-semibold">Endereço de Entrega</h3>
      </div>
      <div class="form-group mb-4">
        <input ref="zipCodeShippingInput" :class="{'border-green-500': !errors.zipCodeShipping && shipping.zipCode, 'border-red-500': errors.zipCodeShipping}" class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" v-model="shipping.zipCode" name="zip-code-shipping" placeholder="CEP" @blur="handleCepSubmission('shipping')">
        <p v-if="errors.zipCodeShipping" class="text-red-500 text-sm mt-1">{{ errors.zipCodeShipping }}</p>
      </div>
      <div class="flex flex-wrap -mx-2 mb-4 gap-4 md:gap-0">
        <div class="w-full md:w-1/2 px-2">
          <input ref="addressShippingInput" :class="{'border-green-500': !errors.addressShipping && shipping.address, 'border-red-500': errors.addressShipping}" class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" v-model="shipping.address" name="address-shipping" placeholder="Endereço" @blur="validateField('address-shipping')">
          <p v-if="errors.addressShipping" class="text-red-500 text-sm mt-1">{{ errors.addressShipping }}</p>
        </div>
        <div class="w-full md:w-1/2 px-2">
          <input ref="numberShippingInput" :class="{'border-green-500': !errors.numberShipping && shipping.number, 'border-red-500': errors.numberShipping}" class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" v-model="shipping.number" name="number-shipping" placeholder="Número" @blur="validateField('number-shipping')">
          <p v-if="errors.numberShipping" class="text-red-500 text-sm mt-1">{{ errors.numberShipping }}</p>
        </div>
      </div>
      <div class="flex flex-wrap -mx-2 mb-4 gap-4 md:gap-0">
        <div class="w-full md:w-1/2 px-2">
          <input ref="complementShippingInput" :class="{'border-green-500': !errors.complementShipping && shipping.complement, 'border-red-500': errors.complementShipping}" class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" v-model="shipping.complement" name="complement-shipping" placeholder="Complemento">
          <p v-if="errors.complementShipping" class="text-red-500 text-sm mt-1">{{ errors.complementShipping }}</p>
        </div>
        <div class="w-full md:w-1/2 px-2">
          <input ref="neighborhoodShippingInput" :class="{'border-green-500': !errors.neighborhoodShipping && shipping.neighborhood, 'border-red-500': errors.neighborhoodShipping}" class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" v-model="shipping.neighborhood" name="neighborhood-shipping" placeholder="Bairro" @blur="validateField('neighborhood-shipping')">
          <p v-if="errors.neighborhoodShipping" class="text-red-500 text-sm mt-1">{{ errors.neighborhoodShipping }}</p>
        </div>
      </div>
      <div class="flex flex-wrap -mx-2 mb-4 gap-4 md:gap-0">
        <div class="w-full md:w-1/2 px-2">
          <input ref="cityShippingInput" :class="{'border-green-500': !errors.cityShipping && shipping.city, 'border-red-500': errors.cityShipping}" class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" v-model="shipping.city" name="city-shipping" placeholder="Cidade" @blur="validateField('city-shipping')">
          <p v-if="errors.cityShipping" class="text-red-500 text-sm mt-1">{{ errors.cityShipping }}</p>
        </div>
        <div class="w-full md:w-1/2 px-2">
          <input ref="stateShippingInput" :class="{'border-green-500': !errors.stateShipping && shipping.state, 'border-red-500': errors.stateShipping}" class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" v-model="shipping.state" name="state-shipping" placeholder="Estado" @blur="validateField('state-shipping')">
          <p v-if="errors.stateShipping" class="text-red-500 text-sm mt-1">{{ errors.stateShipping }}</p>
        </div>
      </div>
    </div>
    <button @click="nextStep" class="px-4 py-2 rounded my-8 text-white font-bold bg-gradient-to-r from-sky-500 from-10% to-green-500 to-90%">Próximo</button>
  </div>
</template>

<script lang="ts">
import axios from 'axios';

export default {
  data() {
    return {
      deliverToDifferentAddress: false,
      billing: {
        zipCode: '',
        address: '',
        number: "",
        complement: "",
        neighborhood: "",
        city: '',
        state: "",
      },
      shipping: {
        zipCode: '',
        address: '',
        number: "",
        complement: "",
        neighborhood: "",
        city: '',
        state: "",
      },
      errors: {
        zipCode: '',
        address: '',
        number: "",
        complement: "",
        neighborhood: "",
        city: '',
        state: "",
        zipCodeShipping: '',
        addressShipping: '',
        numberShipping: "",
        complementShipping: "",
        neighborhoodShipping: "",
        cityShipping: '',
        stateShipping: "",
      }
    }
  },
  methods: {
    validateField(fieldName) {
      // Limpa o erro atual
      this.errors = {
        zipCode: '',
        address: '',
        number: "",
        complement: "",
        neighborhood: "",
        city: '',
        state: "",
        zipCodeShipping: '',
        addressShipping: '',
        numberShipping: "",
        complementShipping: "",
        neighborhoodShipping: "",
        cityShipping: '',
        stateShipping: "",
      }

      // Validação de campos
      switch (fieldName) {
        case 'zipCode':
          if (!this.billing.zipCode) {
            this.errors.zipCode = 'Por favor, insira o CEP.';
          }
          break;
        case 'address':
          if (!this.billing.address) {
            this.errors.address = 'Por favor, insira o endereço.';
          }
          break;
        case 'number':
          if (!this.billing.number) {
            this.errors.number = 'Por favor, insira o número.';
          }
          break;
        case 'complement':
          if (!this.billing.complement) {
            this.errors.complement = 'Por favor, insira o complemento.';
          }
          break;
        case 'neighborhood':
          if (!this.billing.neighborhood) {
            this.errors.neighborhood = 'Por favor, insira o bairro.';
          }
          break;
        case 'city':
          if (!this.billing.city) {
            this.errors.city = 'Por favor, insira a cidade.';
          }
          break;
        case 'state':
          if (!this.billing.state) {
            this.errors.state = 'Por favor, insira o estado.';
          }
          break;
        case 'zipCode-shipping':
          if (!this.shipping.zipCode) {
            this.errors.zipCodeShipping = 'Por favor, insira o CEP.';
          }
          break;
        case 'address-shipping':
          if (!this.shipping.address) {
            this.errors.addressShipping = 'Por favor, insira o endereço.';
          }
          break;
        case 'number-shipping':
          if (!this.shipping.number) {
            this.errors.numberShipping = 'Por favor, insira o número.';
          }
          break;
        case 'complement-shipping':
          if (!this.shipping.complement) {
            this.errors.complementShipping = 'Por favor, insira o complemento.';
          }
          break;
        case 'neighborhood-shipping':
          if (!this.shipping.neighborhood) {
            this.errors.neighborhoodShipping = 'Por favor, insira o bairro.';
          }
          break;
        case 'city-shipping':
          if (!this.shipping.city) {
            this.errors.cityShipping = 'Por favor, insira a cidade.';
          }
          break;
        case 'state-shipping':
          if (!this.shipping.state) {
            this.errors.stateShipping = 'Por favor, insira o estado.';
          }
          break;
        default:
          break;
      }
    },
    nextStep() {
      this.validateField('zipCode');
      this.validateField('address');
      this.validateField('number');
      this.validateField('neighborhood');
      this.validateField('city');
      this.validateField('state');

      if(this.deliverToDifferentAddress){
        this.validateField('zipCode-shipping');
        this.validateField('address-shipping');
        this.validateField('number-shipping');
        this.validateField('neighborhood-shipping');
        this.validateField('city-shipping');
        this.validateField('state-shipping');
      }
      
      if (Object.values(this.errors).every(error => !error)) {
        this.$emit('next-step', { billing: this.billing, shipping: this.shipping } );
      } else {
        this.focusOnErrorField();
      }
    },
    focusOnErrorField() {
      if (this.errors.zipCode) {
        this.$refs.zipCodeInput.focus();
      } else if (this.errors.address) {
        this.$refs.addressInput.focus();
      } else if (this.errors.number) {
        this.$refs.numberInput.focus();
      } else if (this.errors.neighborhood) {
        this.$refs.neighborhoodInput.focus();
      } else if (this.errors.city) {
        this.$refs.cityInput.focus();
      } else if (this.errors.state) {
        this.$refs.stateInput.focus();
      }
      
      if(this.deliverToDifferentAddress){
        if (this.errors.zipCodeShipping) {
          this.$refs.zipCodeShippingInput.focus();
        } else if (this.errors.addressShipping) {
          this.$refs.addressShippingInput.focus();
        } else if (this.errors.numberShipping) {
          this.$refs.numberShippingInput.focus();
        } else if (this.errors.neighborhoodShipping) {
          this.$refs.neighborhoodShippingInput.focus();
        } else if (this.errors.cityShipping) {
          this.$refs.cityShippingInput.focus();
        } else if (this.errors.stateShipping) {
          this.$refs.stateShippingInput.focus();
        }
      }
    },
    async handleCepSubmission(addressType) {
      const cep = addressType === 'billing' ? this.billing.zipCode : this.shipping.zipCode;
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        const address = response.data;
        if (addressType === 'billing') {
          this.billing = {
            ...this.billing,
            address: address.logradouro,
            complement: address.complemento,
            neighborhood: address.bairro,
            city: address.localidade,
            state: address.uf,
          };
          this.validateField('zipCode');
          this.validateField('address');
          this.validateField('number');
          this.validateField('neighborhood');
          this.validateField('city');
          this.validateField('state');
          this.$refs.numberInput.focus();
        } else {
          this.shipping = {
            ...this.shipping,
            address: address.logradouro,
            complement: address.complemento,
            neighborhood: address.bairro,
            city: address.localidade,
            state: address.uf,
          };
          this.$refs.numberShippingInput.focus();
        }
      } catch (error) {
        console.error('Error fetching address :', error);
      }
    },
  }
};
</script>
