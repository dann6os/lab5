import request from "supertest";
import { handler } from "../netlify/functions/api.js";

describe("Music API", () => {
    it("should return an error for missing artist", async () => {
        const res = await request(handler).get("/api/recommend");
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe("Artist is required");
    });
});
