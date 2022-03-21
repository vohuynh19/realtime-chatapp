import express from "express";
import loaders from "./loaders";

// Create Express server
const app = express();

loaders({ expressApp: app });

export default app;
