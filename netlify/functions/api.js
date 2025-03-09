import express from "express";
import serverless from "serverless-http";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const router = express.Router();

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

async function getSpotifyToken() {
    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString("base64")}`,
        },
        body: "grant_type=client_credentials",
    });

    const data = await response.json();
    return data.access_token;
}

router.get("/recommend", async (req, res) => {
    const { artist } = req.query;
    if (!artist) return res.status(400).json({ error: "Artist is required" });

    try {
        const token = await getSpotifyToken();
        const response = await fetch(
            `https://api.spotify.com/v1/search?q=${encodeURIComponent(artist)}&type=artist`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        const data = await response.json();
        if (!data.artists || data.artists.items.length === 0) {
            return res.status(404).json({ error: "Artist not found" });
        }

        const artistId = data.artists.items[0].id;
        const relatedArtistsResponse = await fetch(
            `https://api.spotify.com/v1/artists/${artistId}/related-artists`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        const relatedArtists = await relatedArtistsResponse.json();
        res.json({ recommendations: relatedArtists.artists.map(a => a.name) });

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

app.use("/api", router);
export const handler = serverless(app);
