import request from "supertest";
import { handler } from "../netlify/functions/recipes.js";

describe("Recipe Finder API", () => {
  it("should return recipes for valid ingredients", async () => {
    const res = await request(handler).get("/api/recipes?ingredients=tomato,cheese");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(10);  // Assumed number of recipes
  });

  it("should return an error for missing ingredients", async () => {
    const res = await request(handler).get("/api/recipes");
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Ingredients are required");
  });
});
