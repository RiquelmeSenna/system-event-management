import { Router } from "express";
import * as eventsController from '../controllers/eventsController';
import { authMiddleware } from "../middlewares/authJwt";
import { upload } from "../middlewares/multer";

export const EventRouter = Router();

EventRouter.get('/', eventsController.getEvents);
EventRouter.get('/:id', eventsController.getEvent);
EventRouter.get('/location/:local', eventsController.getEventsByLocation);
EventRouter.get('/search/:name', eventsController.searchEvents);
EventRouter.get('/ticket/:id', eventsController.getTicketsFromEvent)
EventRouter.get('/organizer/:id', authMiddleware, eventsController.getEventOrganizer);
EventRouter.get('/organizer', authMiddleware, eventsController.getEventsByOrganizer);
EventRouter.post('/', authMiddleware, upload.single('photo'), eventsController.createEvent);
EventRouter.put('/:id', authMiddleware, eventsController.updateEvent);
EventRouter.delete('/:id', authMiddleware, eventsController.deleteEvent);

