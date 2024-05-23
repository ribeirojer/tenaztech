<template>
  <div>
    <div v-if="loading" class="text-center py-6">Loading...</div>
    <div v-else-if="error" class="text-center py-6 text-red-500">{{ error }}</div>
    <div v-else-if="product" class="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
      <ProductImages v-if="product.images" :images="product.images" />
      <div class="grid gap-4 md:gap-10 items-start">
        <ProductDetails :product="product" />
        <ProductForm v-if="product.form" />
      </div>
    </div>
    <div v-else class="text-center py-6">Product not found.</div>
    <div v-if="product && product.specifications" class="border-t py-6 px-4 md:px-6 max-w-6xl mx-auto">
      <ProductSpecifications :specs="product.specifications" :features="product.features" />
    </div>
  </div>
</template>

<script lang="ts">
import ProductImages from '../components/ProductImages.vue';
import ProductDetails from '../components/ProductDetails.vue';
import ProductForm from '../components/ProductForm.vue';
import ProductSpecifications from '../components/ProductSpecifications.vue';

export default {
  components: {
    ProductImages,
    ProductDetails,
    ProductForm,
    ProductSpecifications,
  },
  data() {
    return {
      product: null as any,
      loading: true,
      error: null,
    };
  },
  methods: {
    fetchProduct() {
      const productSlug = this.$route.params.slug;
      fetch(`https://product-catalog-service.deno.dev/api/products/${productSlug}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Error fetching product: ${response.statusText}`);
          }
          return response.json();
        })
        .then(data => {
          console.log(data)
          this.product = data;
          this.loading = false;
        })
        .catch(err => {
          this.error = err;
          this.loading = false;
        });
    },
  },
  mounted() {
    this.fetchProduct();
  },
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