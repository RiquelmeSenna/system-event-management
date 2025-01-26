import { Router } from "express";
import * as eventsController from '../controllers/eventsController';
import { authMiddleware } from "../middlewares/authJwt";

export const EventRouter = Router();

EventRouter.get('/', eventsController.getEvents);
EventRouter.get('/:id', eventsController.getEvent);
EventRouter.get('/location/:local', eventsController.getEventsByLocation);
EventRouter.post('/', eventsController.createEvent);
EventRouter.put('/:id', eventsController.updateEvent);
EventRouter.delete('/:id', eventsController.deleteEvent);
EventRouter.get('/search/:name', eventsController.searchEvents);

