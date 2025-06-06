"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const streamerRoute_1 = __importDefault(require("./streamerRoute"));
const categoryRoute_1 = __importDefault(require("./categoryRoute"));
const recordRoute_1 = __importDefault(require("./recordRoute"));
const livekitRoute_1 = __importDefault(require("./livekitRoute"));
const rootRoutes = express_1.default.Router();
rootRoutes.use('/streamer', streamerRoute_1.default);
rootRoutes.use('/category', categoryRoute_1.default);
rootRoutes.use('/records', recordRoute_1.default);
rootRoutes.use('/livekit', livekitRoute_1.default);
exports.default = rootRoutes;
