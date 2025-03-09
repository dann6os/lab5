import request from "supertest";
import { handler } from "../netlify/functions/api.js";

describe("Diet Recommendation API", () => {
    it("should return an error for missing diet", async () => {
        const res = await request(handler).get("/api/recommend-diet");
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe("Invalid or missing diet category");
    });

    it("should return recipes for a valid diet", async () => {
        const res = await request(handler).get("/api/recommend-diet?diet=Vegetarian");
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("recipes");
    });
});
