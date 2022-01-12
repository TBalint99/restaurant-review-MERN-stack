import express from "express";
import cors from "cors"
import restaurants from "./api/restaurants.route.js"

const app = express()

app.use(cors())
app.use(express.json())

// setting up base url's
app.use("/api/v1/restaurants", restaurants)
// setting up 404 page
app.use("*", (req, res) => res.status(404).json({ error: "page not found" }))

export default app