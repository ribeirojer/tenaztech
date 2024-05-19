<template>
  <div class="container mx-auto px-4 md:px-0" v-if="product">
    <div class="flex flex-col md:flex-row gap-8">
      <div class="w-full md:w-1/2 flex flex-col items-center">
        <ProductThumbImgs :images="productImages" :altTexts="altTexts" />
        <ProductMainImg :productImage="product.image" altText="Product Image" class="mt-4" />
      </div>
      <div class="w-full md:w-1/2">
        <h2 class="text-2xl font-bold mb-2">{{ product.name }}</h2>
        <div class="flex items-center mb-4">
          <div class="flex gap-1 text-yellow-400">
            <i v-for="star in 4" :key="star" class="fas fa-star"></i>
            <i class="fas fa-star-half"></i>
          </div>
          <a class="text-sm text-gray-600 ml-2" href="#">10 Review(s) | Add your review</a>
        </div>
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-2xl font-bold">{{ formatCurrency(product.price) }} <del class="text-gray-500 text-lg">{{ formatCurrency(product.oldprice) }}</del></h3>
          <span class="text-sm text-green-500">{{ product.availability }}</span>
        </div>
        <p class="text-gray-700 mb-4">{{ product.description }}</p>

        <ProductSizeSelector :sizes="product.sizes" :value="selectedSize" />
        <ProductColorSelector :colors="product.colors" :value="selectedColor" />
        <ProductQuantitySelector :value="quantity" />

        <ProductActions :product="product" :quantity="quantity" />

        <ul class="flex items-center gap-4 mt-4">
          <li v-for="(category, index) in product.categories" :key="index" class="text-sm text-gray-600">
            <span class="text-gray-500">Categoria:</span>
            <a href="#" class="text-green-500 hover:underline">{{ category }}</a>
          </li>
        </ul>

        <ul class="flex items-center gap-4 mt-4">
          <li class="text-gray-500">Compartilhar:</li>
          <li><a href="#" class="text-gray-700 hover:text-gray-900 transition"><i class="fab fa-facebook"></i></a></li>
          <li><a href="#" class="text-gray-700 hover:text-gray-900 transition"><i class="fab fa-twitter"></i></a></li>
          <li><a href="#" class="text-gray-700 hover:text-gray-900 transition"><i class="fab fa-google-plus"></i></a></li>
          <li><a href="#" class="text-gray-700 hover:text-gray-900 transition"><i class="fas fa-envelope"></i></a></li>
        </ul>
      </div>
    </div>
  </div>
  <div v-else class="text-gray-700 text-center py-10">Carregando...</div>
  <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
    <div className="grid gap-4">
      <div className="grid md:grid-cols-5 gap-3 items-start">
        <div className="hidden md:flex flex-col gap-3 items-start">
          <button className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50">
            <img
              alt="Preview thumbnail"
              className="aspect-[5/6] object-cover"
              height="120"
              src="/motivation.svg"
              width="100"
            />
            <span className="sr-only">View Image 1</span>
          </button>
          <button className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50">
            <img
              alt="Preview thumbnail"
              className="aspect-[5/6] object-cover"
              height="120"
              src="/motivation.svg"
              width="100"
            />
            StarIcon
            <span className="sr-only">View Image 2</span>
          </button>
          <button className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50">
            <img
              alt="Preview thumbnail"
              className="aspect-[5/6] object-cover"
              height="120"
              src="/motivation.svg"
              width="100"
            />
            <span className="sr-only">View Image 3</span>
          </button>
          <button className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50">
            <img
              alt="Preview thumbnail"
              className="aspect-[5/6] object-cover"
              height="120"
              src="/motivation.svg"
              width="100"
            />
            <span className="sr-only">View Image 4</span>
          </button>
        </div>
        <div className="md:col-span-4">
          <img
            alt="Product Image"
            className="aspect-[2/3] object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
            height="900"
            src="/motivation.svg"
            width="600"
          />
        </div>
      </div>
    </div>
    <div className="grid gap-4 md:gap-10 items-start">
      <div className="grid gap-4">
        <h1 className="font-bold text-3xl lg:text-4xl">Acme Prism Wireless Headphones</h1>
        <div>
          <p>
            Experience the ultimate in audio clarity and comfort with the Acme Prism Wireless Headphones. Crafted
            with premium materials and cutting-edge technology, these headphones deliver an unparalleled listening
            experience.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-0.5">
            <StarIcon className="w-5 h-5 fill-primary" />
            <StarIcon className="w-5 h-5 fill-primary" />
            <StarIcon className="w-5 h-5 fill-primary" />
            <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
            <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
          </div>
          <div className="text-4xl font-bold">$149.99</div>
        </div>
      </div>
      <form className="grid gap-4 md:gap-10">
        <div className="grid gap-2">
          <Label className="text-base" htmlFor="color">
            Color
          </Label>
          <RadioGroup className="flex items-center gap-2" defaultValue="black" id="color">
            <Label
              className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
              htmlFor="color-black"
            >
              <RadioGroupItem id="color-black" value="black" />
              Black
            </Label>
            <Label
              className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
              htmlFor="color-white"
            >
              <RadioGroupItem id="color-white" value="white" />
              White
            </Label>
            <Label
              className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
              htmlFor="color-blue"
            >
              <RadioGroupItem id="color-blue" value="blue" />
              Blue
            </Label>
          </RadioGroup>
        </div>
        <div className="grid gap-2">
          <Label className="text-base" htmlFor="quantity">
            Quantity
          </Label>
          <Select defaultValue="1">
            <SelectTrigger className="w-24">
              <SelectValue motivation="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
              <SelectItem value="5">5</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button size="lg">Add to cart</Button>
      </form>
    </div>
  </div>
  <div className="border-t py-6 px-4 md:px-6 max-w-6xl mx-auto">
    <div className="grid gap-6">
      <div>
        <h2 className="font-bold text-2xl">Product Details</h2>
        <div className="grid gap-4 md:grid-cols-2 mt-4">
          <div className="grid gap-2">
            <h3 className="font-semibold">Specifications</h3>
            <div className="grid gap-2">
              <div className="flex justify-between">
                <span>Bluetooth Version</span>
                <span>5.2</span>
              </div>
              <div className="flex justify-between">
                <span>Battery Life</span>
                <span>30 hours</span>
              </div>
              <div className="flex justify-between">
                <span>Charging Time</span>
                <span>2 hours</span>
              </div>
              <div className="flex justify-between">
                <span>Connectivity</span>
                <span>Wireless</span>
              </div>
            </div>
          </div>
          <div className="grid gap-2">
            <h3 className="font-semibold">Features</h3>
            <div className="grid gap-2">
              <div className="flex justify-between">
                <span>Noise Cancellation</span>
                <span>Yes</span>
              </div>
              <div className="flex justify-between">
                <span>Microphone</span>
                <span>Yes</span>
              </div>
              <div className="flex justify-between">
                <span>Touch Controls</span>
                <span>Yes</span>
              </div>
              <div className="flex justify-between">
                <span>Foldable Design</span>
                <span>Yes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2 className="font-bold text-2xl">Product Description</h2>
        <div className="grid gap-4 mt-4">
          <p>
            The Acme Prism Wireless Headphones are designed to deliver an unparalleled audio experience. Featuring
            advanced noise cancellation technology, these headphones block out external noise and immerse you in
            crystal-clear sound. With a long-lasting battery life of up to 30 hours, you can enjoy your music,
            podcasts, or audiobooks without interruption.
          </p>
          <p>
            The sleek and modern design of the Acme Prism Wireless Headphones is not only visually appealing but
            also highly functional. The foldable and lightweight construction makes them easy to carry and store,
            while the touch controls allow you to seamlessly manage your audio playback and take calls with the
            built-in microphone.
          </p>
          <p>
            Whether you're commuting, working, or simply enjoying your favorite entertainment, the Acme Prism
            Wireless Headphones will elevate your listening experience to new heights. Immerse yourself in the
            exceptional sound quality and enjoy the convenience of wireless connectivity.
          </p>
        </div>
      </div>
    </div>
  </div>
  <section className="py-12 md:py-20">
    <div className="container px-4 md:px-6">
      <div className="grid gap-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">What Our Customers Say</h2>
          <div className="grid gap-6">
            <div className="flex gap-4">
              <Avatar className="w-10 h-10 border">
                <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">Sarah Johnson</h3>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                    <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                  </div>
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                  "The Acme Smart Speaker has been a game-changer in my home. The audio quality is incredible, and the
                  voice assistant features make my life so much easier."
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Avatar className="w-10 h-10 border">
                <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">Alex Smith</h3>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                  </div>
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                  "I'm absolutely blown away by the Acme Smart Speaker. The design is sleek and modern, and the
                  features are incredibly useful. I highly recommend this product to anyone looking for a
                  top-of-the-line smart speaker."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import axios from 'axios';
import ProductThumbImgs from '../components/ProductThumbImgs.vue';
import ProductMainImg from '../components/ProductMainImg.vue';
import ProductSizeSelector from '../components/ProductSizeSelector.vue';
import ProductColorSelector from '../components/ProductColorSelector.vue';
import ProductQuantitySelector from '../components/ProductQuantitySelector.vue';
import ProductActions from '../components/ProductActions.vue';
import StarIcon from '../components/StarIcon.vue'
export default {
  data() {
    return {
      product: null as any,
      selectedSize: '',
      selectedColor: '',
      quantity: 1,
      productImages: ['product01.png', 'product08.png'],
      altTexts: ['Product 1', 'Product 2']
    };
  },
  components: {
    ProductThumbImgs,
    ProductMainImg,
    ProductSizeSelector,
    ProductColorSelector,
    ProductQuantitySelector,
    ProductActions
  },
  created() {
    const productSlug = this.$route.params.slug;
    axios.get(`https://product-catalog-service.deno.dev/api/products/${productSlug}`)
      .then(response => {
        this.product = response.data;
      })
      .catch(error => {
        console.error('Erro ao carregar os detalhes do produto:', error);
      });
  },
  methods: {
    formatCurrency(value: number) {
      // Função para formatar o valor monetário (pode variar dependendo do seu formato)
      return `$${value.toFixed(2)}`;
    }
  }
};
</script>

<!--
function BatteryIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="16" height="10" x="2" y="7" rx="2" ry="2" />
      <line x1="22" x2="22" y1="11" y2="13" />
    </svg>
  )
}


function CpuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="16" height="16" x="4" y="4" rx="2" />
      <rect width="6" height="6" x="9" y="9" rx="1" />
      <path d="M15 2v2" />
      <path d="M15 20v2" />
      <path d="M2 15h2" />
      <path d="M2 9h2" />
      <path d="M20 15h2" />
      <path d="M20 9h2" />
      <path d="M9 2v2" />
      <path d="M9 20v2" />
    </svg>
  )
}


function SpeakerIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="16" height="20" x="4" y="2" rx="2" />
      <path d="M12 6h.01" />
      <circle cx="12" cy="14" r="4" />
      <path d="M12 14h.01" />
    </svg>
  )
}


function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}


function WifiIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20h.01" />
      <path d="M2 8.82a15 15 0 0 1 20 0" />
      <path d="M5 12.859a10 10 0 0 1 14 0" />
      <path d="M8.5 16.429a5 5 0 0 1 7 0" />
    </svg>
  )
}


/**
 * v0 by Vercel.
 * @see https://v0.dev/t/wCklg8F7whV
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Label } from "@/components/ui/label"
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
        <div className="grid gap-4">
          <div className="grid md:grid-cols-5 gap-3 items-start">
            <div className="hidden md:flex flex-col gap-3 items-start">
              <button className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 dark:focus-visible:ring-gray-300">
                <img
                  alt="Preview thumbnail"
                  className="aspect-[5/6] object-cover"
                  height="120"
                  src="/placeholder.svg"
                  width="100"
                />
                <span className="sr-only">View Image 1</span>
              </button>
              <button className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 dark:focus-visible:ring-gray-300">
                <img
                  alt="Preview thumbnail"
                  className="aspect-[5/6] object-cover"
                  height="120"
                  src="/placeholder.svg"
                  width="100"
                />
                <span className="sr-only">View Image 2</span>
              </button>
              <button className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 dark:focus-visible:ring-gray-300">
                <img
                  alt="Preview thumbnail"
                  className="aspect-[5/6] object-cover"
                  height="120"
                  src="/placeholder.svg"
                  width="100"
                />
                <span className="sr-only">View Image 3</span>
              </button>
              <button className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 dark:focus-visible:ring-gray-300">
                <img
                  alt="Preview thumbnail"
                  className="aspect-[5/6] object-cover"
                  height="120"
                  src="/placeholder.svg"
                  width="100"
                />
                <span className="sr-only">View Image 4</span>
              </button>
            </div>
            <div className="md:col-span-4">
              <img
                alt="Product Image"
                className="aspect-[2/3] object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
                height="900"
                src="/placeholder.svg"
                width="600"
              />
            </div>
          </div>
        </div>
        <div className="grid gap-4 md:gap-10 items-start">
          <div className="grid gap-4">
            <h1 className="font-bold text-3xl lg:text-4xl">Acme Prism Wireless Headphones</h1>
            <div>
              <p className="text-gray-500 dark:text-gray-400">
                Experience the ultimate in audio clarity and comfort with the Acme Prism Wireless Headphones. Crafted
                with premium materials and cutting-edge technology, these headphones deliver an unparalleled listening
                experience.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-0.5">
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
              </div>
              <div className="text-4xl font-bold">$149.99</div>
            </div>
          </div>
          <form className="grid gap-4 md:gap-10">
            <div className="grid gap-2">
              <Label className="text-base font-medium" htmlFor="color">
                Color
              </Label>
              <RadioGroup className="flex items-center gap-2" defaultValue="black" id="color">
                <Label
                  className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 dark:focus-visible:ring-gray-300"
                  htmlFor="color-black"
                >
                  <RadioGroupItem id="color-black" value="black" />
                  Black
                </Label>
                <Label
                  className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 dark:focus-visible:ring-gray-300"
                  htmlFor="color-white"
                >
                  <RadioGroupItem id="color-white" value="white" />
                  White
                </Label>
                <Label
                  className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 dark:focus-visible:ring-gray-300"
                  htmlFor="color-blue"
                >
                  <RadioGroupItem id="color-blue" value="blue" />
                  Blue
                </Label>
              </RadioGroup>
            </div>
            <div className="grid gap-2">
              <Label className="text-base font-medium" htmlFor="quantity">
                Quantity
              </Label>
              <Select className="w-24" defaultValue="1">
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full md:w-auto" size="lg">
              Add to cart
            </Button>
          </form>
        </div>
      </div>
      <div className="border-t py-6 px-4 md:px-6 max-w-6xl mx-auto">
        <div className="grid gap-6">
          <div>
            <h2 className="font-bold text-2xl">Product Details</h2>
            <div className="grid gap-4 md:grid-cols-2 mt-4">
              <div className="grid gap-2">
                <h3 className="font-semibold">Specifications</h3>
                <div className="grid gap-2 text-gray-500 dark:text-gray-400">
                  <div className="flex justify-between">
                    <span>Bluetooth Version</span>
                    <span>5.2</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Battery Life</span>
                    <span>30 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Charging Time</span>
                    <span>2 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Connectivity</span>
                    <span>Wireless</span>
                  </div>
                </div>
              </div>
              <div className="grid gap-2">
                <h3 className="font-semibold">Features</h3>
                <div className="grid gap-2 text-gray-500 dark:text-gray-400">
                  <div className="flex justify-between">
                    <span>Noise Cancellation</span>
                    <span>Yes</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Microphone</span>
                    <span>Yes</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Touch Controls</span>
                    <span>Yes</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Foldable Design</span>
                    <span>Yes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="font-bold text-2xl">Product Description</h2>
            <div className="grid gap-4 mt-4 text-gray-500 dark:text-gray-400">
              <p>
                The Acme Prism Wireless Headphones are designed to deliver an unparalleled audio experience. Featuring
                advanced noise cancellation technology, these headphones block out external noise and immerse you in
                crystal-clear sound. With a long-lasting battery life of up to 30 hours, you can enjoy your music,
                podcasts, or audiobooks without interruption.
              </p>
              <p>
                The sleek and modern design of the Acme Prism Wireless Headphones is not only visually appealing but
                also highly functional. The foldable and lightweight construction makes them easy to carry and store,
                while the touch controls allow you to seamlessly manage your audio playback and take calls with the
                built-in microphone.
              </p>
              <p>
                Whether you're commuting, working, or simply enjoying your favorite entertainment, the Acme Prism
                Wireless Headphones will elevate your listening experience to new heights. Immerse yourself in the
                exceptional sound quality and enjoy the convenience of wireless connectivity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}




-->