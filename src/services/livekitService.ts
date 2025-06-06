import { Request, Response } from "express";
import { liveKitHelper } from "../helper/livekitHelper";

function mapAppRoleToLiveKitRole(appRoles: { name: string }[]): "publisher" | "subscriber" {
    const roleNames = appRoles.map(r => r.name.toUpperCase());

    if (roleNames.includes("BROADCASTER") || roleNames.includes("MODERATOR")) {
        return "publisher";
    }

    return "subscriber";
}


const generateToken = (req: Request, res: Response) => {
    const { roomName, identity, roles } = req.body;

    if (!roomName || !identity || !roles) {
        return res.status(400).json({ message: "Missing fields" });
    }

    const role = mapAppRoleToLiveKitRole(roles);
    const token = liveKitHelper.generateToken(roomName, identity, role);
    res.json({ token });
};

const createRoom = async (req: Request, res: Response) => {
    const { roomName, maxParticipants } = req.body;

    if (!roomName || !maxParticipants) {
        return res.status(400).json({ message: "Missing required fields: roomName, maxParticipants" });
    }

    try {
        const roomData = await liveKitHelper.createRoom(roomName, maxParticipants);
        res.status(201).json({ roomData });
    } catch (error) {
        res.status(500).json({ message: "Error creating room", error });
    }
};

export { generateToken, createRoom };
