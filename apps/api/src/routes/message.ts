import { Router } from "express";
const messageRouter = Router();

messageRouter.get("/", (req, res) => {
  res.send("Hello, messageRoute!");
});

export default messageRouter;