"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const streamerService_1 = require("../services/streamerService");
const router = express_1.default.Router();
router.post("/streamers", streamerService_1.createStreamer);
router.get("/streamers", streamerService_1.getAllStreamers);
router.get("/streamers/:id", streamerService_1.getStreamerById);
router.put("/streamers/:id", streamerService_1.updateStreamer);
router.delete("/streamers/:id", streamerService_1.deleteStreamer);
exports.default = router;
