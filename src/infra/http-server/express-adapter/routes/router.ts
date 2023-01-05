import express, { Router } from "express";

import movieRoutes from "./movie.routes";
import categoryRoutes from "./category.routes";

import snapshotsPath from "@utils/paths/snapshots.path";

const router = Router();

router.use("/api", movieRoutes);

router.use("/api", categoryRoutes);

router.use("/api/static", express.static(snapshotsPath));

export default router;
