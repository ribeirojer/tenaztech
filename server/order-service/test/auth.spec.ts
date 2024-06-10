import { describe, it, expect } from "bun:test";
import { app } from "../src";
import { post } from "./utils";

describe("POST /preference", () => {
  it("Should create a preference", async () => {
    const body = {
      items: [
        {
          title: 'Test Item',
          quantity: 1,
          currency_id: 'BRL',
          unit_price: 100,
        },
      ],
    };
    const response = await app.handle(post("/preference", body))

    expect(response.status).toBe(200);
    console.log(await response.text())
    const { success, message, user, token } = JSON.parse(await response.text())

    expect(success).toBe(true);
    expect(message).toBe("Authentication successful");
    expect(token).toBeTruthy();
    expect(user).toBeTruthy();
  });
});
