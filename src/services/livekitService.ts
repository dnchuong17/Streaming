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
    const { roomName, maxParticipants, identity, roles } = req.body;

    if (!roomName || !maxParticipants || !identity || !roles) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    if (!roles.some((r: any) => r.name === "BROADCASTER")) {
        return res.status(403).json({ message: "You are not allowed to create a room" });
    }

    try {
        const roomData = await liveKitHelper.createRoom(roomName, maxParticipants);

        const token = liveKitHelper.generateToken(roomName, identity, "BROADCASTER");

        return res.status(201).json({ roomData, token });
    } catch (error) {
        return res.status(500).json({ message: "Create Room Error", error });
    }
};

export { generateToken, createRoom };
