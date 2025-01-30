import { Router } from "express";
import * as eventsController from '../controllers/eventsController';
import { authMiddleware } from "../middlewares/authJwt";

export const EventRouter = Router();

EventRouter.get('/', eventsController.getEvents);
EventRouter.get('/:id', eventsController.getEvent);
EventRouter.get('/location/:local', eventsController.getEventsByLocation);
EventRouter.get('/search/:name', eventsController.searchEvents);
EventRouter.post('/', authMiddleware, eventsController.createEvent);
EventRouter.put('/:id', authMiddleware, eventsController.updateEvent);
EventRouter.delete('/:id', authMiddleware, eventsController.deleteEvent);

