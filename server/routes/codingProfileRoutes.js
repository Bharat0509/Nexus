const express = require("express");
const axios = require("axios");
// const Redis = require('ioredis');
const { getProfile, getPlatformProfile, getContest } = require("../controllers/codingProfileController");

const router = express.Router();

// Get API base URL from environment variables
const CODING_PROFILE_API = process.env.CODING_PROFILE_BASE_URL;


// const redis = new Redis(REDIS_URL);

// Check if Redis connection is successful
// redis.on('connect', () => {
//     console.log('Connected to Redis Cloud');
// });

// redis.on('error', (err) => {
//     console.error('Redis error:', err);
// });

// Route for getting user data
// router.get("/user/:platform/:id", async (req, res) => {
//     const cacheKey = `user:${req.params.platform}:${req.params.id}`;

//     // Check if data is already in Redis cache
//     // const cachedData = await redis.get(cacheKey);
//     // if (cachedData) {
//     //     // console.log("data from cached");
//     //     return res.json(JSON.parse(cachedData));  // Return cached data if available
//     // } else {



//         try {
//             // If data is not in cache, fetch from the external API
//             // console.log("data from api");
//             const response = await axios.get(`${CODING_PROFILE_API}/user/${req.params.platform}/${req.params.id}`);
//             // Cache the response for 3 days (259200 seconds)
//             // await redis.setex(cacheKey, 259200, JSON.stringify(response.data));  // Cache for 3 days
//             res.json(response.data);
//         } catch (error) {
//             res.status(500).json({ error: 'Failed to fetch user data' });
//         }
//     // }
// });

// Route for getting upcoming contests
// router.get("/contests/upcoming", async (req, res) => {
//     const cacheKey = `contests:upcoming`;

//     try {
//         // Check if contests data is already in Redis cache
//         const cachedData = await redis.get(cacheKey);
//         if (cachedData) {
//             console.log("Cache hit");
//             return res.json(JSON.parse(cachedData));
//         }

//         console.log("Cache miss");
//         // Fetch data from the external API
//         const response = await axios.get(`${CODING_PROFILE_API}/contests/upcoming`);

//         // Cache the contests data for 12 hours (43200 seconds)
//         await redis.setex(cacheKey, 43200, JSON.stringify(response.data));
//         res.json(response.data);
//     } catch (error) {
//         console.error("Error fetching upcoming contests:", error.message);
//         res.status(500).json({ error: "Failed to fetch contests" });
//     }
// });

router.get("/users/:platform", getPlatformProfile);
router.get("/user/:platform/:userId", getProfile);
router.get("/contests", getContest)

module.exports = router;
