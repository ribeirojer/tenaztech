<template lang="">
    <div class="container">
        <div class="-mx-4 flex flex-wrap">
            <div class="w-full px-4">
                <div class="shadow-three mx-auto max-w-[500px] rounded bg-white px-6 py-10 dark:bg-dark sm:p-[60px]">
                    <h3 class="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">Crie sua conta</h3>
                    <p class="mb-11 text-center text-base font-medium text-body-color">É totalmente gratuito e super fácil</p>
                    <button class="border-stroke dark:text-body-color-dark dark:shadow-two mb-6 flex w-full items-center justify-center rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 hover:border-purple-500 hover:bg-purple-500/5 hover:text-purple-500 dark:border-transparent dark:bg-[#2C303B] dark:hover:border-purple-500 dark:hover:bg-purple-500/5 dark:hover:text-purple-500 dark:hover:shadow-none" @click="signInWithGoogle">
                        <span class="mr-3"><SvgsGoogleIcon /></span>Entrar com Google
                    </button>
                    <button class="border-stroke dark:text-body-color-dark dark:shadow-two mb-6 flex w-full items-center justify-center rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 hover:border-purple-500 hover:bg-purple-500/5 hover:text-purple-500 dark:border-transparent dark:bg-[#2C303B] dark:hover:border-purple-500 dark:hover:bg-purple-500/5 dark:hover:text-purple-500 dark:hover:shadow-none" @click="signInWithGithub">
                        <span class="mr-3"><SvgsGitHubIcon /></span>Entrar com Github
                    </button>
                    <div class="mb-8 flex items-center justify-center">
                        <span class="hidden h-[1px] w-full max-w-[60px] bg-gray-500 sm:block"></span>
                        <p class="w-full px-5 text-center text-base font-medium text-body-color">Ou, registre-se com seu email</p>
                        <span class="hidden h-[1px] w-full max-w-[60px] bg-gray-500 sm:block"></span>
                    </div>
                    <form @submit.prevent="submitForm">
                        <CoreInput v-model="formData.name" label="Nome completo" placeholder="Digite seu nome completo"              :class="{ 'border-red-500': formData.nameError }"               ref="nameInput" />
                        
                        <div v-if="formData.nameError" class="text-red-500 mb-4">
                            <span>{{ formData.nameError }}</span>
      </div>
                        <CoreInput v-model="formData.email" label="Email de trabalho" placeholder="Digite seu email"              :class="{ 'border-red-500': formData.nameError }"  />
                        
      <div v-if="formData.emailError" class="text-red-500 mb-4">
        <span>{{ formData.emailError }}</span>
      </div>
                        <CoreInput v-model="formData.password" label="Sua senha" placeholder="Digite sua senha"               :class="{ 'border-red-500': formData.nameError }" type="password" />
                        
      <div v-if="formData.passwordError" class="text-red-500 mb-4">
        <span>{{ formData.passwordError }}</span>
      </div>
                        <CoreCheckbox v-model="formData.agree">
                            <div>Ao criar uma conta, você concorda com os <a href="#0" class="text-purple-500 hover:underline">Termos e Condições</a>, e com a nossa <a href="#0" class="text-purple-500 hover:underline">Política de Privacidade</a></div>
                        </CoreCheckbox>
                        
      <div v-if="formData.agreeError" class="text-red-500 mb-4">
        <span>{{ formData.agreeError }}</span>
      </div>
                        <div class="mb-6">
                            <button type="submit" class="shadow-submit dark:shadow-submit-dark flex w-full items-center justify-center rounded-sm bg-purple-500 px-9 py-4 text-base font-medium text-white duration-300 hover:bg-purple-500/90">Registrar-se</button>
                        </div>
                    </form>
                    <p class="text-center text-base font-medium text-body-color">Já usa a Startup? <a class="text-purple-500 hover:underline" href="/signin">Entre</a></p>
                </div>
            </div>
        </div>
    </div>
</template>
  
  <script>
export default {
	data() {
		return {
			formData: {
				name: "",
				email: "",
				password: "",
				agree: false,
				nameError: "",
				emailError: "",
				passwordError: "",
				agreeError: "",
			},
		};
	},
	methods: {
		submitForm() {
			this.validateForm();
			if (this.hasErrors()) {
				// Encontrar o primeiro campo de entrada com erro
				const firstErrorInput = this.findFirstErrorInput();
				// Focar no primeiro campo de entrada com erro
				if (firstErrorInput) {
					firstErrorInput.focus();
				}
			} else {
				// Se não houver erros, prosseguir com a submissão do formulário
				this.registerUser();
			}
		},

		validateForm() {
			this.validateName();
			// Adicione aqui as outras funções de validação para os campos restantes
		},
		hasErrors() {
			return Object.values(this.formData).some(
				(value) => value !== false && value !== "" && value !== null,
			);
		},
		findFirstErrorInput() {
			const inputs = this.$refs;
			for (const input in inputs) {
				if (inputs[input]?.$el?.classList.contains("border-red-500")) {
					return inputs[input].$el;
				}
			}
			return null;
		},
		registerUser() {
			// Implementar a lógica de registro
		},
		validateName() {
			if (!this.formData.name) {
				this.formData.nameError = "Por favor, preencha o campo nome.";
			} else {
				this.formData.nameError = "";
			}
		},
		validatePassword() {
			if (!this.formData.password) {
				this.formData.passwordError = "Por favor, preencha o campo senha.";
			} else {
				this.formData.passwordError = "";
			}
		},
		validateEmail(email) {
			const re = /\S+@\S+\.\S+/;
			return re.test(email);
		},
	},
};
</script>
  