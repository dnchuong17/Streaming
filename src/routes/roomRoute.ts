import express from "express";
import {
    createLiveRoom,
    getAllRooms,
    getRoomById,
    updateRoom,
    deleteRoom
} from "../services/roomService";
import {CloudinaryUploader} from "../helper/cloudinary.config";

const roomRoute = express.Router();

// @ts-ignore
roomRoute.post('/', CloudinaryUploader.single("thumbnail"), createLiveRoom);

roomRoute.get("/", getAllRooms);

roomRoute.get("/:id", getRoomById);

roomRoute.put("/:id", updateRoom);

roomRoute.delete("/:id", deleteRoom);

export default roomRoute;
