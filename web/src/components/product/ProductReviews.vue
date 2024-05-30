<template>
    <div class="row">
      <!-- Rating -->
      <div class="col-md-3">
        <div id="rating">
          <div class="rating-avg">
            <span>{{ rating }}</span>
            <div class="rating-stars">
              <i v-for="star in 5" :key="star" class="fa" :class="star <= Math.round(rating) ? 'fa-star' : 'fa-star-o'"></i>
            </div>
          </div>
          <ul class="rating">
            <li v-for="review in reviews" :key="review.id">
              <div class="rating-stars">
                <i v-for="star in 5" :key="star" class="fa" :class="star <= review.stars ? 'fa-star' : 'fa-star-o'"></i>
              </div>
              <div class="rating-progress">
                <div :style="{ width: review.progress + '%' }"></div>
              </div>
              <span class="sum">{{ review.count }}</span>
            </li>
          </ul>
        </div>
      </div>
      <!-- /Rating -->
  
      <!-- Reviews -->
      <div class="col-md-6">
        <div id="reviews">
          <ul class="reviews">
            <li v-for="review in reviews" :key="review.id">
              <div class="review-heading">
                <h5 class="name">{{ review.name }}</h5>
                <p class="date">{{ review.date }}</p>
                <div class="review-rating">
                  <i v-for="star in 5" :key="star" class="fa" :class="star <= review.stars ? 'fa-star' : 'fa-star-o empty'"></i>
                </div>
              </div>
              <div class="review-body">
                <p>{{ review.body }}</p>
              </div>
            </li>
          </ul>
          <ul class="reviews-pagination">
            <li v-for="page in pagination" :key="page" :class="{ active: page === currentPage }">{{ page }}</li>
          </ul>
        </div>
      </div>
      <!-- /Reviews -->
  
      <!-- Review Form -->
      <div class="col-md-3">
        <div id="review-form">
          <form class="review-form" @submit.prevent="submitReview">
            <input class="input" type="text" v-model="newReview.name" placeholder="Your Name">
            <input class="input" type="email" v-model="newReview.email" placeholder="Your Email">
            <textarea class="input" v-model="newReview.body" placeholder="Your Review"></textarea>
            <div class="input-rating">
              <span>Your Rating: </span>
              <div class="stars">
                <input v-for="star in 5" :key="star" :id="'star' + star" name="rating" type="radio" :value="star" v-model="newReview.rating">
                <label v-for="star in 5" :key="star" :for="'star' + star"></label>
              </div>
            </div>
            <button class="primary-btn">Submit</button>
          </form>
        </div>
      </div>
      <!-- /Review Form -->
    </div>
  </template>
  
  <script lang="ts">
  export default {
    props: {
      rating: {
        type: Number,
        require: true,
      } as any,
      reviews: Array as any,
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
      submitReview() {
        // Handle form submission
        console.log(this.newReview);
      },
    },
  };
  </script>
  