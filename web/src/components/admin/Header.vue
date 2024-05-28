<template>
    <header class="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
      <Link class="lg:hidden" href="#">
        <Package2Icon class="h-6 w-6" />
        <span class="sr-only">Home</span>
      </Link>
      <div class="flex-1">
        <h1 class="font-semibold text-lg">Recent Orders</h1>
      </div>
      <div class="flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form class="ml-auto flex-1 sm:flex-initial">
          <div class="relative">
            <SearchIcon class="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              class="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] bg-white"
              placeholder="Search orders..."
              type="search"
            />
          </div>
        </form>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button class="rounded-full" size="icon" variant="ghost">
              <img
                alt="Avatar"
                class="rounded-full"
                height="32"
                src="/motivation.svg"
                width="32"
              />
              <span class="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  </template>
  
  <script lang="ts">
  import { Link, Package2Icon, SearchIcon, Input, DropdownMenu, DropdownMenuTrigger, Button, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from '@/components' // adjust the import path
  
  export default {
    name: 'Header',
  }
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  