<template>
    <nav class="flex justify-between items-center py-4 px-6 bg-gray-900 text-white">
      <ul class="flex gap-4">
        <li class="notShow">
          <a href="https://api.whatsapp.com/send?phone=5512981580992&amp;text=Olá,%20Drácula!" target="_blank" class="flex items-center gap-2 hover:text-gray-300">
            <SvgsPhoneIcon class="w-5 h-5 fill-purple-500" />
            <p class="text-sm">+55 (12) 98158-0992</p>
          </a>
        </li>
        <li>
          <a href="mailto:contato@dracula.com" target="_blank" class="flex items-center gap-2 hover:text-gray-300">
            <SvgsEmailIcon class="w-5 h-5 fill-purple-500" />
            <p class="text-sm">contato@dracula.com</p>
          </a>
        </li>
        <li class="notShow">
          <a href="https://goo.gl/maps/hMDFQ3zoR9mZDF5b8" target="_blank" class="flex items-center gap-2 hover:text-gray-300">
            <SvgsMapPinIcon class="w-5 h-5 fill-purple-500" />
            <p class="text-sm">Rua Paulo Malschitzki, 240, Joinville - SC</p>
          </a>
        </li>
      </ul>
      <ul>
        <li>
          <NuxtLink to="/usuario" class="flex items-center gap-2 hover:text-gray-300">
            <p class="text-sm font-bold">Minha Conta</p>
            <SvgsUserIcon class="w-5 h-5 fill-purple-500" />
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </template>
  