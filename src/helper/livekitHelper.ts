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
            sub: identity.toString(),
            iat: now,
            exp: now + 3600,
            video: { roomJoin: true, room: roomName },
        };

        if (role === "publisher") {
            payload.video["canPublish"] = true;
            payload.video["canSubscribe"] = true;
        } else if (role === "subscriber") {
            payload.video["canPublish"] = false;
            payload.video["canSubscribe"] = true;
        } else {
            throw new Error("Invalid Role");
        }

        return jwt.sign(payload, this.apiSecret);
    }

    async createRoom(roomName: string, maxParticipants: number) {
        const token = this.generateToken(roomName, "admin", "publisher");
        const res = await axios.post(
            `${this.baseUrl}/v1/rooms`,
            { name: roomName, max_participants: maxParticipants },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return res.data;
    }

    generateEgressToken(): string {
        const now = Math.floor(Date.now() / 1000);
        return jwt.sign(
            {
                iss: this.apiKey,
                iat: now,
                exp: now + 3600,
            },
            this.apiSecret
        );
    }

    async startRecording(roomName: string) {
        const token = this.generateEgressToken();
        const startedAt = new Date();

        const filepath = `recordings/${roomName}-${Date.now()}.mp4`;

        const res = await axios.post(
            `${this.baseUrl}/egress/start`,
            {
                roomComposite: {
                    roomName,
                    layout: "grid",
                    fileOutputs: [
                        {
                            fileType: "mp4",
                            filepath,
                        },
                    ],
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        console.log("LiveKit response:", res.data);

        return {
            jobInfo: res.data,
            fileUrl: filepath,
            startedAt,
        };
    }

    async stopRecording(egressId: string) {
        const token = this.generateEgressToken(); // giống như startRecording

        const res = await axios.post(
            `${this.baseUrl}/egress/stop`,
            { egressId },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return res.data;
    }
}

export const liveKitHelper = new LiveKitHelper();
