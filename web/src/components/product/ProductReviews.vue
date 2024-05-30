<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <!-- Rating -->
    <div class="">
      <div id="rating" class="p-4 bg-white rounded-lg shadow-md">
        <div class="rating-avg text-center">
          <span class="text-3xl font-bold">{{ rating }}</span>
          <div class="flex justify-center mt-2">
            <i v-for="star in 5" :key="star" class="fa" :class="star <= Math.round(rating) ? 'fa-star text-yellow-500' : 'fa-star-o text-gray-300'"></i>
          </div>
        </div>
        <ul class="rating mt-4">
          <li v-for="review in reviews" :key="review.id" class="flex items-center justify-between mb-2">
            <div class="flex">
              <i v-for="star in 5" :key="star" class="fa" :class="star <= review.stars ? 'fa-star text-yellow-500' : 'fa-star-o text-gray-300'"></i>
            </div>
            <div class="relative flex-1 mx-4">
              <div class="h-2 bg-gray-200 rounded-full">
                <div class="h-2 bg-yellow-500 rounded-full" :style="{ width: review.progress + '%' }"></div>
              </div>
            </div>
            <span class="text-sm">{{ review.count }}</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- /Rating -->

    <!-- Reviews -->
    <div class="">
      <div id="reviews" class="p-4 bg-white rounded-lg shadow-md">
        <ul class="reviews divide-y divide-gray-200">
          <li v-for="review in reviews" :key="review.id" class="py-4">
            <div class="review-heading mb-2">
              <h5 class="font-semibold">{{ review.name }}</h5>
              <p class="text-sm text-gray-500">{{ review.date }}</p>
              <div class="review-rating flex mt-1">
                <i v-for="star in 5" :key="star" class="fa" :class="star <= review.stars ? 'fa-star text-yellow-500' : 'fa-star-o text-gray-300'"></i>
              </div>
            </div>
            <div class="review-body">
              <p>{{ review.body }}</p>
            </div>
          </li>
        </ul>
        <ul class="reviews-pagination flex justify-center mt-4 space-x-2">
          <li v-for="page in pagination" :key="page" :class="{ 'font-bold': page === currentPage }" class="cursor-pointer" @click="currentPage = page">
            {{ page }}
          </li>
        </ul>
      </div>
    </div>
    <!-- /Reviews -->

    <!-- Review Form -->
    <div class="">
      <div id="review-form" class="p-4 bg-white rounded-lg shadow-md">
        <form class="review-form space-y-4" @submit.prevent="submitReview">
          <input class="input w-full p-2 border border-gray-300 rounded-md" type="text" v-model="newReview.name" placeholder="Your Name" required>
          <input class="input w-full p-2 border border-gray-300 rounded-md" type="email" v-model="newReview.email" placeholder="Your Email" required>
          <textarea class="input w-full p-2 border border-gray-300 rounded-md" v-model="newReview.body" placeholder="Your Review" required></textarea>
          <div class="input-rating">
            <span class="block mb-2">Your Rating:</span>
            <div class="stars flex space-x-1">
              <input v-for="star in 5" :key="star" :id="'star' + star" name="rating" type="radio" :value="star" v-model="newReview.rating" class="hidden">
              <label v-for="star in 5" :key="star" :for="'star' + star" class="cursor-pointer text-gray-300" :class="{ 'text-yellow-500': star <= newReview.rating }">
                <i class="fa fa-star"></i>
              </label>
            </div>
          </div>
          <button class="primary-btn w-full bg-blue-500 text-white py-2 rounded-md">Submit</button>
        </form>
      </div>
    </div>
    <!-- /Review Form -->
  </div>
</template>

<script lang="ts">
import axios from 'axios';

export default {
  props: {
    rating: {
      type: Number,
      required: true,
    },
    reviews: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      newReview: {
        name: '',
        email: '',
        body: '',
        rating: 0,
      },
      pagination: [1, 2, 3, 4],
      currentPage: 1,
    };
  },
  methods: {
    async submitReview() {
      try {
        const response = await axios.post('https://example.com/api/reviews', this.newReview);
        console.log('Review submitted successfully:', response.data);
        this.newReview = { name: '', email: '', body: '', rating: 0 };
      } catch (error) {
        console.error('Error submitting review:', error);
      }
    },
  },
};
</script>

<style scoped>
.input {
  border: 1px solid #ddd;
  padding: 0.5rem;
  width: 100%;
  border-radius: 0.25rem;
}

.primary-btn {
  background-color: #3490dc;
  color: #fff;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.primary-btn:hover {
  background-color: #2779bd;
}

.review-form .stars label {
  font-size: 1.5rem;
  transition: color 0.3s;
}

.review-form .stars label:hover,
.review-form .stars label:hover ~ label,
.review-form .stars input:checked ~ label {
  color: #ffcc00;
}
</style>
