import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { EventRouter } from './routers/eventsRouter';
import { AuthRouter } from './routers/authRouter';
import { CategoryRouter } from './routers/categoriesRouter';
import { UserRouter } from './routers/userRouter';
import { TicketRouter } from './routers/ticketRouter';

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static('public'));
server.use(helmet());
server.use(cors());


const port = process.env.PORT || 3000;

server.use('/events', EventRouter);
server.use('/', AuthRouter)
server.use('/categories', CategoryRouter)
server.use('/user', UserRouter)
server.use('/ticket', TicketRouter)

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})