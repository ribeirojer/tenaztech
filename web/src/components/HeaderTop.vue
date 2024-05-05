<template>
  <nav class="flex justify-between items-center py-4 px-6 bg-gray-900 text-white">
    <ul class="flex gap-4">
      <li class="notShow">
        <a href="https://api.whatsapp.com/send?phone=5512981580992&amp;text=Olá,%Tenaz!" target="_blank" class="flex items-center gap-2 hover:text-gray-300">
          <PhoneIcon class="w-5 h-5 fill-purple-500" />
          <p class="text-sm">+55 (12) 98158-0992</p>
        </a>
      </li>
      <li>
        <a href="mailto:contato@tenaztech.com" target="_blank" class="flex items-center gap-2 hover:text-gray-300">
          <EmailIcon class="w-5 h-5 fill-purple-500" />
          <p class="text-sm">contato@tenaztech.com</p>
        </a>
      </li>
      <li class="notShow">
        <a href="https://goo.gl/maps/hMDFQ3zoR9mZDF5b8" target="_blank" class="flex items-center gap-2 hover:text-gray-300">
          <MapPinIcon class="w-5 h-5 fill-purple-500" />
          <p class="text-sm">Rua Agrolândia, 325, Joinville - SC</p>
        </a>
      </li>
    </ul>
    <ul class="flex gap-4">
      <li>
        <RouterLink to="/login" class="flex items-center gap-2 hover:text-gray-300">
          <p class="text-sm font-bold">Entrar</p>
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/registro" class="flex items-center gap-2 hover:text-gray-300">
          <p class="text-sm font-bold">Cadastrar</p>
          <UserIcon class="w-5 h-5 fill-purple-500" />
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">

import { RouterLink } from 'vue-router'
import PhoneIcon from './svgs/PhoneIcon.vue'
import EmailIcon from './svgs/EmailIcon.vue'
import MapPinIcon from './svgs/MapPinIcon.vue'
import UserIcon from './svgs/UserIcon.vue'

  export default {
    name: 'HeaderTop',
    components: {
        PhoneIcon,
        EmailIcon,
        MapPinIcon,
        UserIcon
    }
  }
</script>