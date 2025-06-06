import express from "express";
import {createRoom, generateToken} from "../services/livekitService";

const livekitRoute = express.Router();

// @ts-ignore
livekitRoute.post("/generate-token", generateToken);

// @ts-ignore
livekitRoute.post("/create-room", createRoom);

export default livekitRoute;
