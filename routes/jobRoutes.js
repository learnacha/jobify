import express from 'express';

import {createJob, deleteJob, getAllJobs, updateJob, showStats} from '../controllers/jobController.js';

const jobRoutes = express.Router();

jobRoutes.route('/').post(createJob).get(getAllJobs);
jobRoutes.route('/stats').get(showStats);
jobRoutes.route('/:id').delete(deleteJob).patch(updateJob);

export default jobRoutes;