"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const livekitService_1 = require("../services/livekitService");
const livekitRoute = express_1.default.Router();
// @ts-ignore
livekitRoute.post("/generate-token", livekitService_1.generateToken);
// @ts-ignore
livekitRoute.post("/create-room", livekitService_1.createRoom);
exports.default = livekitRoute;
