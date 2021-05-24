/**
 * Pivate Routes are those API urls that require the user to be
 * logged in before they can be called from the front end.
 * 
 * Basically all HTTP requests to these endpoints must have an
 * Authorization header with the value "Bearer <token>"
 * being "<token>" a JWT token generated for the user using 
 * the POST /token endpoint
 * 
 * Please include in this file all your private URL endpoints.
 * 
 */

import { Router } from 'express';
import { safe } from './utils';
import * as actions from './actions';

// declare a new router to include all the endpoints
const router = Router();

router.get('/todos/user/:userId', safe(actions.getTarea));
router.post('/todos/user/:userId', safe(actions.createTarea));
router.put('/todos/user/:userId', safe(actions.putTarea));
/* router.delete('/todos/user/:userId', safe(actions.deleteTarea)); */
router.delete('/user/:userId', safe(actions.deleteTarea));

export default router;
