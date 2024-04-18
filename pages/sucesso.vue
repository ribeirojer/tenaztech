<template>
    <div>
      <h1>Order Successful!</h1>
      <p>Thank you for your purchase. Your order has been placed successfully.</p>
      <h2>Order Details</h2>
      <p>Order ID: {{ orderId }}</p>
      <p>Total Amount: {{ totalAmount }}</p>
      <!-- Additional order details -->
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        orderId: '123456', // Replace with actual order ID
        totalAmount: '$200' // Replace with actual total amount
      };
    }
  };
  </script>
  