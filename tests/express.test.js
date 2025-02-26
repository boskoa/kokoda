const supertest = require("supertest");
const app = require("../app");

describe("Testing the root path", () => {
  test("Correct staus code", async () => {
    const response = await supertest(app).get("/api");
    expect(response.statusCode).toBe(200);
  });
});

describe("Testing the chatsRouter", () => {
  test("Error if no token", async () => {
    const response = await supertest(app).get("/api/chats");
    expect(response.statusCode).toBe(401);
    expect(response.error.text).toContain("Token missing");
  });
});

describe("Testing the usersRouter", () => {
  test("Error if no token", async () => {
    const response = await supertest(app).get("/api/users");
    expect(response.statusCode).toBe(401);
    expect(response.error.text).toContain("Token missing");
  });
});

describe("Testing the contactsRouter", () => {
  test("Error if no token", async () => {
    const response = await supertest(app).get("/api/contacts");
    expect(response.statusCode).toBe(401);
    expect(response.error.text).toContain("Token missing");
  });
});
