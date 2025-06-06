"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRoom = exports.getRoomById = exports.getAllRooms = exports.updateRoom = exports.createLiveRoom = void 0;
const client_1 = require("@prisma/client");
const livekitHelper_1 = require("../helper/livekitHelper");
const { room } = new client_1.PrismaClient({
    log: ["query", "info", "warn", "error"]
});
const createLiveRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { roomName, maxParticipants, streamerId } = req.body;
    try {
        const livekitRoom = yield livekitHelper_1.liveKitHelper.createRoom(roomName, maxParticipants);
        const roomData = yield room.create({
            data: {
                roomName,
                maxParticipants,
                status: "active",
                streamer: {
                    connect: { id: streamerId }
                }
            }
        });
        res.status(201).json({ roomData, livekitRoom });
    }
    catch (error) {
        res.status(500).json({ message: "Create Room Error: ", error });
    }
});
exports.createLiveRoom = createLiveRoom;
const getAllRooms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const rooms = yield room.findMany();
    res.json(rooms);
});
exports.getAllRooms = getAllRooms;
const getRoomById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const roomCreation = yield room.findUnique({ where: { id } });
    if (roomCreation)
        res.json(roomCreation);
    else
        res.status(404).json({ message: "Room not found" });
});
exports.getRoomById = getRoomById;
const updateRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { roomName, maxParticipants, status } = req.body;
    try {
        const updated = yield room.update({
            where: { id },
            data: { roomName, maxParticipants, status },
        });
        res.json(updated);
    }
    catch (err) {
        res.status(404).json({ message: "Room not found", error: err });
    }
});
exports.updateRoom = updateRoom;
const deleteRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        yield room.delete({ where: { id } });
        res.json({ message: "Room deleted" });
    }
    catch (err) {
        res.status(404).json({ message: "Room not found", error: err });
    }
});
exports.deleteRoom = deleteRoom;
