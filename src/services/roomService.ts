import {PrismaClient} from "@prisma/client";
import { Request, Response } from "express";
import {liveKitHelper} from "../helper/livekitHelper";
import {CloudinaryUploader} from "../helper/cloudinary.config";

const { room } = new PrismaClient({
    log: ["query", "info", "warn", "error"]
});

const createLiveRoom = async (req: Request, res: Response) => {
    const { roomName, maxParticipants, identity, roles, streamerId, categoryId } = req.body;
    const thumbnail = req.file;

    if (!roomName || !maxParticipants || !identity || !roles || !streamerId || !categoryId || !thumbnail) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const roleNames = roles.map((r: any) => r.name.toUpperCase());
    if (!roleNames.includes("BROADCASTER")) {
        return res.status(403).json({ message: "You are not allowed to create a room" });
    }

    try {
        CloudinaryUploader.single('thumbnail')(req, res, async (err) => {
            if (err) {
                return res.status(500).json({ message: "Failed to upload thumbnail", error: err });
            }

            const thumbnailUrl = req.file?.path;

            const livekitRoom = await liveKitHelper.createRoom(roomName, maxParticipants);

            const roomData = await room.create({
                data: {
                    roomName,
                    maxParticipants,
                    status: "active",
                    streamer: { connect: { id: streamerId } },
                    category: { connect: { id: categoryId } },
                    thumbnail: thumbnailUrl
                },
            });

            const token = liveKitHelper.generateToken(roomName, identity, "BROADCASTER");

            return res.status(201).json({ roomData, livekitRoom, token });
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Create Room Error", error });
    }
};

const getAllRooms = async (req: Request, res: Response) => {
    const rooms = await room.findMany();
    res.json(rooms);
};

const getRoomById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const roomCreation = await room.findUnique({ where: { id } });
    if (roomCreation) res.json(roomCreation);
    else res.status(404).json({ message: "Room not found" });
};

const updateRoom = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { roomName, maxParticipants, status } = req.body;
    try {
        const updated = await room.update({
            where: { id },
            data: { roomName, maxParticipants, status },
        });
        res.json(updated);
    } catch (err) {
        res.status(404).json({ message: "Room not found", error: err });
    }
};

const deleteRoom = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        await room.delete({ where: { id } });
        res.json({ message: "Room deleted" });
    } catch (err) {
        res.status(404).json({ message: "Room not found", error: err });
    }
};

export {
    createLiveRoom,
    updateRoom,
    getAllRooms,
    getRoomById,
    deleteRoom
}