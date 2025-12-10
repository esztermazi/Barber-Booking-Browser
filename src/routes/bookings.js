import express from "express";
import { readJSON } from "../utils/storage.js";
const router = express.Router()

const FILE_PATH = "./src/data/bookings.json";

router.get("/", (req, res) => {
    const bookings = readJSON(FILE_PATH);
    res.json(bookings);
});

export default router;