import express from "express";
import createUser from "../controllers/users/createUser";
import welcomeMessage from "../controllers/welcome/welcomeMessage";

const router = express.Router();

router.get("/", welcomeMessage);

router.post("/users", createUser);

export default router;
