import express from "express";
import { readJSON } from "../utils/storage.js";
const router = express.Router()

const BOOKINGS_PATH = "./src/data/bookings.json";

router.get("/", (req, res) => {
  const email = req.query.email;
  const bookings = readJSON(BOOKINGS_PATH);
  let result = bookings;

  if (email) {
    result = bookings.filter(b => b.email === email);
  }

  return res.json(result);
});

export default router;
