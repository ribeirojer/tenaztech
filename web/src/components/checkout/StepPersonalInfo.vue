<template>
  <div>
    <div class="section-title mb-4">
      <h3 class="text-lg font-bold">Informações Pessoais</h3>
    </div>
    <div class="form-group mb-4" :class="{ 'border-green-500': !errors.name && personalInfo.name, 'border-red-500': errors.name }">
      <input ref="nameInput" :class="{ 'border-green-500': !errors.name && personalInfo.name, 'border-red-500': errors.name }" class="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="text" v-model="personalInfo.name" placeholder="Nome" @blur="validateField('name')">
      <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
    </div>
    <div class="form-group mb-4" :class="{ 'border-green-500': !errors.email && personalInfo.email, 'border-red-500': errors.email }">
      <input ref="emailInput" :class="{ 'border-green-500': !errors.email && personalInfo.email, 'border-red-500': errors.email }" class="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="email" v-model="personalInfo.email" placeholder="Seu melhor e-mail" @blur="validateField('email')">
      <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
    </div>
    <div class="form-group mb-4" :class="{ 'border-green-500': !errors.tel && personalInfo.tel, 'border-red-500': errors.tel }">
      <input ref="telInput" :class="{ 'border-green-500': !errors.tel && personalInfo.tel, 'border-red-500': errors.tel }" class="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="tel" v-model="personalInfo.tel" placeholder="Telefone" @blur="validateField('tel')">
      <p v-if="errors.tel" class="text-red-500 text-sm mt-1">{{ errors.tel }}</p>
    </div>
    <div class="form-group mb-4">
      <label class="flex items-center">
        <input type="checkbox" class="form-checkbox h-5 w-5 text-green-500" v-model="personalInfo.createAccount">
        <span class="ml-2 text-gray-700">Criar conta?</span>
      </label>
    </div>
    <div v-if="personalInfo.createAccount" class="form-group mb-4" :class="{ 'border-green-500': !errors.password && personalInfo.password, 'border-red-500': errors.password }">
      <input ref="passwordInput" :class="{ 'border-green-500': !errors.password && personalInfo.password, 'border-red-500': errors.password }" class="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="password" v-model="personalInfo.password" placeholder="Senha">
      <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
    </div>
    <button class="px-4 py-2 bg-green-500 text-white rounded" @click="nextStep">Próximo</button>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    personalInfo: Object as any
  },
  data() {
    return {
      errors: {} as any
    };
  },
  methods: {
    validateField(fieldName: string) {
  switch (fieldName) {
    case 'name':
      this.errors.name = this.personalInfo.name.trim() ? '' : 'O campo Nome é obrigatório.';
      break;
    case 'email':
      this.errors.email = this.validateEmail(this.personalInfo.email) ? '' : 'Por favor, insira um endereço de e-mail válido.';
      break;
    case 'tel':
      const phoneNumber = this.personalInfo.tel.replace(/\s+/g, ''); // Remover espaços em branco
      this.errors.tel = /^\d{10,14}$/.test(phoneNumber) ? '' : 'O campo Telefone deve ter entre 10 e 14 dígitos.';
      break;
    case 'password':
      const passwordStrength = this.validatePasswordStrength(this.personalInfo.password);
      if (passwordStrength === 'weak') {
        this.errors.password = 'A senha é fraca. Deve conter pelo menos 6 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial.';
      } else if (passwordStrength === 'medium') {
        this.errors.password = 'A senha é média. Recomendamos incluir caracteres especiais para aumentar a segurança.';
      } else {
        this.errors.password = '';
      }
      break;
  }
},
validateEmail(email: string) {
  // Verifica se o e-mail possui um formato válido
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
},
validatePasswordStrength(password: string) {
  // Verifica se a senha tem pelo menos 6 caracteres
  if (password.length < 6) {
    return 'weak';
  }

  // Verifica se a senha contém pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);

  if (hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar) {
    return 'strong';
  } else {
    return 'medium';
  }
},
    nextStep() {
      this.validateField('name');
      this.validateField('email');
      this.validateField('tel');
      if (this.personalInfo.createAccount) {
        this.validateField('password');
      }
      if (Object.values(this.errors).every(error => !error)) {
        this.$emit('next-step', this.personalInfo);
      } else {
        this.focusOnErrorField();
      }
    },
    focusOnErrorField(this: any) {
      if (this.errors.name) {
        this.$refs.nameInput.focus();
      } else if (this.errors.email) {
        this.$refs.emailInput.focus();
      } else if (this.errors.tel) {
        this.$refs.telInput.focus();
      } else if (this.errors.password) {
        this.$refs.passwordInput.focus();
      }
    }
  }
};
</script>
