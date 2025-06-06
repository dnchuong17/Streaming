import express from "express";
import streamerRoute from "./streamerRoute";
import categoryRoute from "./categoryRoute";
import recordRoute from "./recordRoute";
import livekitRoute from "./livekitRoute";
import roomRoute from "./roomRoute";

const rootRoutes = express.Router();

rootRoutes.use('/streamer', streamerRoute);
rootRoutes.use('/category', categoryRoute);
rootRoutes.use('/records', recordRoute)
rootRoutes.use('/livekit', livekitRoute);
rootRoutes.use('/room', roomRoute);


export default rootRoutes;
