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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.liveKitHelper = void 0;
const axios_1 = __importDefault(require("axios"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class LiveKitHelper {
    constructor() {
        this.baseUrl = process.env.LIVEKIT_URL;
        this.apiKey = process.env.LIVEKIT_API_KEY;
        this.apiSecret = process.env.LIVEKIT_API_SECRET;
    }
    generateToken(roomName, identity, role) {
        const now = Math.floor(Date.now() / 1000);
        const payload = {
            iss: this.apiKey,
            sub: identity,
            iat: now,
            exp: now + 3600,
            video: { roomJoin: true, room: roomName },
        };
        if (role === "BROADCASTER") {
            payload.video["canPublish"] = true;
            payload.video["canSubscribe"] = true;
        }
        else if (role === "USER") {
            payload.video["canPublish"] = false;
            payload.video["canSubscribe"] = true;
        }
        else {
            throw new Error("Invalid Role");
        }
        return jsonwebtoken_1.default.sign(payload, this.apiSecret);
    }
    // Method to create a room
    createRoom(roomName, maxParticipants) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = this.generateToken(roomName, "admin", "BROADCASTER");
            const res = yield axios_1.default.post(`${this.baseUrl}/v1/rooms`, { name: roomName, max_participants: maxParticipants }, { headers: { Authorization: `Bearer ${token}` } });
            return res.data;
        });
    }
}
exports.liveKitHelper = new LiveKitHelper();
