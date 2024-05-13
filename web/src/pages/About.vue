<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-4">Sobre Nós</h1>
    <p class="text-lg mb-6">Conheça mais sobre a TenazTech, sua história, visão e compromissos.</p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h2 class="text-2xl font-semibold mb-2">Nossa História</h2>
        <p class="mb-4">A TenazTech é um e-commerce recém-inaugurado, nascido da paixão por tecnologia e inovação. Embora recente, nossa equipe está empenhada em oferecer uma experiência de compra excepcional para entusiastas da tecnologia em todo o mundo.</p>
        <p class="mb-4">Nosso objetivo é crescer e nos tornarmos uma referência no mercado de e-commerce de produtos eletrônicos, sempre mantendo nosso compromisso com a qualidade, inovação e satisfação do cliente.</p>
      </div>
      <div>
        <h2 class="text-2xl font-semibold mb-2">Nossa Visão</h2>
        <p class="mb-4">Na TenazTech, temos uma visão clara: tornar-se a escolha número um para os consumidores em busca de produtos eletrônicos de qualidade a preços acessíveis. Estamos comprometidos em construir uma marca confiável e em estabelecer relacionamentos sólidos com nossos clientes, fornecedores e parceiros.</p>
        <p class="mb-4">Acreditamos que, com dedicação, trabalho árduo e compromisso com a excelência, podemos alcançar nossos objetivos e contribuir de forma significativa para o mundo da tecnologia.</p>
      </div>
    </div>

    <div class="mt-8">
      <h2 class="text-2xl font-semibold mb-2">Nossos Compromissos</h2>
      <ul class="list-disc pl-4">
        <li class="mb-2"><span class="font-semibold">Qualidade:</span> Comprometemo-nos a oferecer apenas produtos eletrônicos de alta qualidade, garantindo a satisfação de nossos clientes.</li>
        <li class="mb-2"><span class="font-semibold">Atendimento ao Cliente:</span> Estamos aqui para você. Nosso objetivo é proporcionar uma experiência de compra excepcional, com suporte personalizado e atencioso em todos os momentos.</li>
        <li class="mb-2"><span class="font-semibold">Transparência:</span> Valorizamos a transparência em todas as nossas operações, desde preços até políticas de envio e devolução.</li>
        <li class="mb-2"><span class="font-semibold">Inovação:</span> Estamos sempre em busca das últimas inovações tecnológicas para oferecer aos nossos clientes produtos modernos e atualizados.</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'AboutView',
};
</script>

<style scoped>
/* Estilos para a página sobre */
/* Adicione estilos conforme necessário */

/* Estilos para os compromissos */
ul {
  color: #555;
}

ul li {
  margin-bottom: 0.5rem;
}
</style>
