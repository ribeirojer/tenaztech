<template>
    <div>
      <h1>Contact Us</h1>
      <form @submit.prevent="submitForm">
        <input type="text" v-model="name" placeholder="Name" required />
        <input type="email" v-model="email" placeholder="Email" required />
        <textarea v-model="message" placeholder="Message" required></textarea>
        <button type="submit">Send Message</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: '',
        email: '',
        message: ''
      };
    },
    methods: {
      submitForm() {
        // Implement form submission functionality
      }
    }
  };
  </script>
  