import express from "express";
import createUser from "../handlers/users/createUser";
import welcomeMessage from "../handlers/welcome/welcomeMessage";

const router = express.Router();

router.get("/", welcomeMessage);

router.post("/users", createUser);

export default router;
