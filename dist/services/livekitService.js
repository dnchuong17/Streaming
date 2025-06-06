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
exports.createRoom = exports.generateToken = void 0;
const livekitHelper_1 = require("../helper/livekitHelper");
const generateToken = (req, res) => {
    const { roomName, identity, role } = req.body;
    if (!roomName || !identity || !role) {
        return res.status(400).json({ message: "Missing required fields: roomName, identity, role" });
    }
    try {
        const token = livekitHelper_1.liveKitHelper.generateToken(roomName, identity, role);
        res.json({ token });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
};
exports.generateToken = generateToken;
const createRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { roomName, maxParticipants } = req.body;
    if (!roomName || !maxParticipants) {
        return res.status(400).json({ message: "Missing required fields: roomName, maxParticipants" });
    }
    try {
        const roomData = yield livekitHelper_1.liveKitHelper.createRoom(roomName, maxParticipants);
        res.status(201).json({ roomData });
    }
    catch (error) {
        res.status(500).json({ message: "Error creating room", error });
    }
});
exports.createRoom = createRoom;
