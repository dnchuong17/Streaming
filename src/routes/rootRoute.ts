import express from "express";
import streamerRoute from "./streamerRoute";
import categoryRoute from "./categoryRoute";
import recordRoute from "./recordRoute";
import livekitRoute from "./livekitRoute";

const rootRoutes = express.Router();

rootRoutes.use('/streamer', streamerRoute);
rootRoutes.use('/category', categoryRoute);
rootRoutes.use('/records', recordRoute)
rootRoutes.use('/livekit', livekitRoute);
rootRoutes.use('/room', rootRoutes);


export default rootRoutes;
