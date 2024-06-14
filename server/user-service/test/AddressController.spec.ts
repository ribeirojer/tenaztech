import request from 'supertest';
import app from '../app';  // Assumindo que 'app' é a instância do seu aplicativo Express

describe("Address Routes", () => {
    describe("GET /api/addresses", () => {
        it("Should fetch all addresses", async () => {
            const response = await request(app).get("/api/addresses");
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });
    });

    describe("GET /api/addresses/:id", () => {
        it("Should fetch a specific address by ID", async () => {
            const addressId = "validAddressId"; // Substitua pelo ID de um endereço válido no seu banco de dados de teste
            const response = await request(app).get(`/api/addresses/${addressId}`);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('id', addressId);
        });

        it("Should return 404 if the address is not found", async () => {
            const addressId = "invalidAddressId";
            const response = await request(app).get(`/api/addresses/${addressId}`);
            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty('error', 'Address not found');
        });
    });

    describe("POST /api/addresses", () => {
        it("Should create a new address", async () => {
            const newAddress = {
                userId: "validUserId",
                street: "123 Main St",
                city: "Anytown",
                state: "Anystate",
                postalCode: "12345",
                country: "Anycountry"
            };
            const response = await request(app).post("/api/addresses").send(newAddress);
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('id');
            expect(response.body.street).toBe(newAddress.street);
            expect(response.body.city).toBe(newAddress.city);
        });

        it("Should return 400 if the request body is invalid", async () => {
            const invalidAddress = {
                street: "123 Main St"
            };
            const response = await request(app).post("/api/addresses").send(invalidAddress);
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error');
        });
    });

    describe("PUT /api/addresses/:id", () => {
        it("Should update an existing address", async () => {
            const addressId = "validAddressId"; // Substitua pelo ID de um endereço válido no seu banco de dados de teste
            const updatedData = {
                street: "456 Elm St",
                city: "Newtown",
                state: "Newstate",
                postalCode: "67890",
                country: "Newcountry"
            };
            const response = await request(app).put(`/api/addresses/${addressId}`).send(updatedData);
            expect(response.status).toBe(200);
            expect(response.body.street).toBe(updatedData.street);
            expect(response.body.city).toBe(updatedData.city);
        });

        it("Should return 404 if the address is not found", async () => {
            const addressId = "invalidAddressId";
            const updatedData = {
                street: "456 Elm St",
                city: "Newtown"
            };
            const response = await request(app).put(`/api/addresses/${addressId}`).send(updatedData);
            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty('error', 'Address not found');
        });
    });

    describe("DELETE /api/addresses/:id", () => {
        it("Should delete an address", async () => {
            const addressId = "validAddressId"; // Substitua pelo ID de um endereço válido no seu banco de dados de teste
            const response = await request(app).delete(`/api/addresses/${addressId}`);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message', 'Address deleted successfully');
        });

        it("Should return 404 if the address is not found", async () => {
            const addressId = "invalidAddressId";
            const response = await request(app).delete(`/api/addresses/${addressId}`);
            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty('error', 'Address not found');
        });
    });
});
