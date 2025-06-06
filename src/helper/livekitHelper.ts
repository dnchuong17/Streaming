import axios from "axios";
import jwt from "jsonwebtoken";

class LiveKitHelper {
    baseUrl: string;
    apiKey: string;
    apiSecret: string;

    constructor() {
        this.baseUrl = process.env.LIVEKIT_URL!;
        this.apiKey = process.env.LIVEKIT_API_KEY!;
        this.apiSecret = process.env.LIVEKIT_API_SECRET!;
    }

    generateToken(roomName: string, identity: string, role: string): string {
        const now = Math.floor(Date.now() / 1000);
        const payload: any = {
            iss: this.apiKey,
            sub: identity,
            iat: now,
            exp: now + 3600,
            video: { roomJoin: true, room: roomName },
        };

        if (role === "BROADCASTER") {
            payload.video["canPublish"] = true;
            payload.video["canSubscribe"] = true;
        } else if (role === "USER") {
            payload.video["canPublish"] = false;
            payload.video["canSubscribe"] = true;
        } else {
            throw new Error("Invalid Role");
        }

        return jwt.sign(payload, this.apiSecret);
    }

    async createRoom(roomName: string, maxParticipants: number) {
        const token = this.generateToken(roomName, "admin", "BROADCASTER");
        const res = await axios.post(
            `${this.baseUrl}/v1/rooms`,
            { name: roomName, max_participants: maxParticipants },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return res.data;
    }
}

export const liveKitHelper = new LiveKitHelper();
