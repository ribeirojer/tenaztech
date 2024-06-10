export const mapOrderData = (frontendData: any) => {
    return {
      customer_name: frontendData.personalInfo.name,
      customer_email: frontendData.personalInfo.email,
      customer_phone: frontendData.personalInfo.tel,
      address: {
        street: frontendData.billing.address,
        city: frontendData.billing.city,
        state: frontendData.billing.state,
        zip: frontendData.billing.zipCode,
        country: 'BR' // Assuming country is Brazil, you can modify this as needed
      },
      items: frontendData.products.map((product: any) => ({
        title: product.name,
        quantity: product.quantity,
        price: product.price,
        weight: product.weight,
        height: product.height,
        width: product.width,
        length: product.length
      })),
      total_amount: frontendData.total,
      currency: 'BRL', // Assuming currency is BRL, you can modify this as needed
      payment_method: 'credit_card', // This could be dynamic based on your frontend data
      payment_preference_id: '',
      shipping: {
        service: frontendData.selectedShippingOption.service,
        price: parseFloat(frontendData.selectedShippingOption.price.replace(',', '.')),
        estimated_days: frontendData.selectedShippingOption.days
      }
    };
  };
  