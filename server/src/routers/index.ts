import express from "express";

const router = express.Router();

router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  console.log("url", req.url);
  next();
});

export default router;
