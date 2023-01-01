import { Request, Response, Router } from "express";
import movieRoutes from "./movie.routes";

const router = Router();

router.use("/api", movieRoutes);

// TODO: Test page, remove later
router.get("/", (_: Request, res: Response) =>
  res.sendFile("src/index.html", { root: process.cwd() })
);

export default router;
