<template>
  <section class="relative z-20 overflow-hidden bg-white dark:bg-dark pt-20 pb-12 lg:pt-[120px] lg:pb-[90px]">
    <div class="container mx-auto">
      <div class="flex flex-wrap -mx-4">
        <div class="w-full px-4">
          <div class="mx-auto mb-[60px] max-w-[520px] text-center lg:mb-20">
            <span class="block mb-2 text-lg font-semibold text-primary">
              FAQ
            </span>
            <h2 class="text-dark dark:text-white mb-4 text-3xl font-bold sm:text-[40px]/[48px]">
              Any Questions? Look Here
            </h2>
            <p class="text-base text-body-color dark:text-dark-6">
              There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form.
            </p>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap -mx-4">
        <div class="w-full px-4 lg:w-1/2" v-for="(faq, index) in faqs" :key="index">
          <div class="w-full p-4 mb-8 bg-white rounded-lg shadow-[0px_20px_95px_0px_rgba(201,203,204,0.30)] dark:shadow-[0px_20px_95px_0px_rgba(0,0,0,0.30)] dark:bg-dark-2 sm:p-8 lg:px-6 xl:px-8">
            <button class="flex w-full text-left faq-btn" @click="toggleFaq(index)">
              <div class="bg-primary/5 dark:bg-white/5 text-primary mr-5 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg">
                <svg :class="[openFaqs[index] && 'rotate-180']" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 15.675C10.7937 15.675 10.6219 15.6062 10.45 15.4687L2.54374 7.69998C2.23436 7.3906 2.23436 6.90935 2.54374 6.59998C2.85311 6.2906 3.33436 6.2906 3.64374 6.59998L11 13.7844L18.3562 6.53123C18.6656 6.22185 19.1469 6.22185 19.4562 6.53123C19.7656 6.8406 19.7656 7.32185 19.4562 7.63123L11.55 15.4C11.3781 15.5719 11.2062 15.675 11 15.675Z" fill="currentColor"/>
                </svg>
              </div>
              <div class="w-full">
                <h4 class="mt-1 text-lg font-semibold text-dark dark:text-white">{{ faq.question }}</h4>
              </div>
            </button>
            <div v-show="openFaqs[index]" class="faq-content pl-[62px]">
              <p class="py-3 text-base leading-relaxed text-body-color dark:text-dark-6">{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
export default {
  name: 'FAQView',
  data() {
    return {
      openFaqs: [] as any,
      faqs: [
  {
    question: 'Quais são as opções de pagamento disponíveis?',
    answer: 'Oferecemos diversas opções de pagamento, incluindo cartão de crédito, débito, PayPal e transferência bancária. Você pode escolher a opção que melhor se adequa às suas necessidades.'
  },
  {
    question: 'Como faço para acompanhar meu pedido?',
    answer: 'Assim que seu pedido for despachado, você receberá um e-mail de confirmação com um link para rastrear o status da entrega. Você também pode acessar sua conta e verificar o status do pedido a qualquer momento.'
  },
  {
    question: 'Quanto tempo leva para a entrega?',
    answer: 'O prazo de entrega pode variar dependendo do seu local de entrega e do método de envio escolhido. Normalmente, os pedidos são entregues dentro de 3 a 7 dias úteis após a confirmação do pagamento.'
  },
  {
    question: 'Posso devolver um produto se não estiver satisfeito?',
    answer: 'Sim, aceitamos devoluções dentro de um prazo específico após a entrega do produto, desde que esteja nas condições originais e acompanhado da embalagem original. Consulte nossa política de devolução para obter mais informações.'
  },
  {
    question: 'Como faço para entrar em contato com o suporte ao cliente?',
    answer: 'Você pode entrar em contato com nosso suporte ao cliente por e-mail, telefone ou chat ao vivo. Nossa equipe de atendimento está disponível para ajudar com qualquer dúvida ou problema que você possa ter.'
  },
  // Adicione mais questões conforme necessário
      ]
    };
  },
  methods: {
    toggleFaq(index: number) {
  this.openFaqs[index] = !this.openFaqs[index];
}
  }
};
</script>

<style scoped>
/* Estilos para a página de FAQ */
</style>
