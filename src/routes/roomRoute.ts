import express from "express";
import {
    createLiveRoom,
    getAllRooms,
    getRoomById,
    updateRoom,
    deleteRoom
} from "../services/roomService";

const roomRoute = express.Router();

roomRoute.post("/", createLiveRoom);

roomRoute.get("/", getAllRooms);

roomRoute.get("/:id", getRoomById);

roomRoute.put("/:id", updateRoom);

roomRoute.delete("/:id", deleteRoom);

export default roomRoute;
