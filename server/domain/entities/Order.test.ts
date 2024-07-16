import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Order } from "./Order.ts";

Deno.test("Order entity should be created correctly", () => {
	const order = new Order(
		"1",
		"customer1",
		["product1", "product2"],
		"pending",
		100,
	);
	assertEquals(order.id, "1");
	assertEquals(order.customerId, "customer1");
	assertEquals(order.productIds, ["product1", "product2"]);
	assertEquals(order.status, "pending");
	assertEquals(order.totalAmount, 100);
});
