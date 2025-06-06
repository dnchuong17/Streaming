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
exports.deleteStreamer = exports.updateStreamer = exports.getStreamerById = exports.getAllStreamers = exports.createStreamer = void 0;
const client_1 = require("@prisma/client");
const { streamer } = new client_1.PrismaClient({
    log: ["query", "info", "warn", "error"]
});
const createStreamer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, avatarUrl } = req.body;
    try {
        const newStreamer = yield streamer.create({
            data: { name, email, avatarUrl }
        });
        res.status(201).json(newStreamer);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating streamer", error });
    }
});
exports.createStreamer = createStreamer;
const getAllStreamers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const streamers = yield streamer.findMany();
        res.json(streamers);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching streamers", error });
    }
});
exports.getAllStreamers = getAllStreamers;
const getStreamerById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const foundStreamer = yield streamer.findUnique({ where: { id } });
        if (foundStreamer)
            res.json(foundStreamer);
        else
            res.status(404).json({ message: "Streamer not found" });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching streamer", error });
    }
});
exports.getStreamerById = getStreamerById;
const updateStreamer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { name, email, avatarUrl } = req.body;
    try {
        const updatedStreamer = yield streamer.update({
            where: { id },
            data: { name, email, avatarUrl }
        });
        res.json(updatedStreamer);
    }
    catch (error) {
        res.status(404).json({ message: "Streamer not found", error });
    }
});
exports.updateStreamer = updateStreamer;
const deleteStreamer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        yield streamer.delete({ where: { id } });
        res.json({ message: "Streamer deleted" });
    }
    catch (error) {
        res.status(404).json({ message: "Streamer not found", error });
    }
});
exports.deleteStreamer = deleteStreamer;
