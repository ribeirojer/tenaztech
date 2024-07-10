import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';
import { superoak } from 'https://deno.land/x/superoak/mod.ts';
import { createApp } from '../setup.ts';

Deno.test('POST /orders should not create an order if product is out of stock', async () => {
    const app = createApp();
    const request = await superoak(app);
    await request.post('/orders')
        .send({ customerId: 'customer1', productIds: ['product1', 'product2'], totalAmount: 100 })
        .expect(400)
        .expect({ error: 'Product product2 is out of stock' });
});

Deno.test('POST /orders should create an order with discount if more than 3 products are ordered', async () => {
    const app = createApp();
    const request = await superoak(app);
    await request.post('/orders')
        .send({ customerId: 'customer1', productIds: ['product1', 'product3', 'product4', 'product1'], totalAmount: 200 })
        .expect(201);

    const request2 = await superoak(app);
    const response = await request2.get('/orders/1');
    assertEquals(response.body.totalAmount, 180); // Desconto de 20 unidades monetárias
});

Deno.test('POST /orders should create an order', async () => {
    const app = createApp();
    const request = await superoak(app);
    await request.post('/orders')
        .send({ customerId: 'customer1', productIds: ['product1'], totalAmount: 50 })
        .expect(201);

    const request2 = await superoak(app);
    const response = await request2.get('/orders/1');
    assertEquals(response.body.customerId, 'customer1');
    assertEquals(response.body.productIds, ['product1']);
    assertEquals(response.body.status, 'pending');
    assertEquals(response.body.totalAmount, 50);
});

Deno.test('PUT /orders/:id should update an order status', async () => {
    const app = createApp();
    const request = await superoak(app);
    await request.put('/orders/1')
        .send({ status: 'completed' })
        .expect(200);

    const request2 = await superoak(app);
    const response = await request2.get('/orders/1');
    assertEquals(response.body.status, 'completed');
});

Deno.test('POST /orders should not create an order if product is out of stock', async () => {
    const app = createApp();
    const request = await superoak(app);
    await request.post('/orders')
        .send({ customerId: 'customer1', productIds: ['product1', 'product2'], totalAmount: 100 })
        .expect(400)
        .expect({ error: 'Product product2 is out of stock' });
});

Deno.test('POST /orders should create an order with discount if more than 3 products are ordered', async () => {
    const app = createApp();
    const request = await superoak(app);
    await request.post('/orders')
        .send({ customerId: 'customer1', productIds: ['product1', 'product3', 'product4', 'product1'], totalAmount: 200 })
        .expect(201);

    const request2 = await superoak(app);
    const response = await request2.get('/orders/1');
    assertEquals(response.body.totalAmount, 180); // Desconto de 20 unidades monetárias
});
