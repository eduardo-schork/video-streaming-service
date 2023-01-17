import express, { Router } from 'express';

import snapshotsPath from '@utils/paths/snapshots.path';

import movieRoutes from './movie.routes';
import commentRoutes from './comment.routes';
import categoryRoutes from './category.routes';

const router = Router();

router.use('/api', movieRoutes);

router.use('/api', categoryRoutes);

router.use('/api', commentRoutes);

router.use('/api/static', express.static(snapshotsPath));

export default router;
