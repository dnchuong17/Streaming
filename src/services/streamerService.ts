import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const { streamer } = new PrismaClient({
    log: ["query", "info", "warn", "error"]
});

const createStreamer = async (req: Request, res: Response) => {
    const { name, email, avatarUrl } = req.body;
    try {
        const newStreamer = await streamer.create({
            data: { name, email, avatarUrl }
        });
        res.status(201).json(newStreamer);
    } catch (error) {
        res.status(500).json({ message: "Error creating streamer", error });
    }
};

const getAllStreamers = async (req: Request, res: Response) => {
    try {
        const streamers = await streamer.findMany();
        res.json(streamers);
    } catch (error) {
        res.status(500).json({ message: "Error fetching streamers", error });
    }
};

const getStreamerById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const foundStreamer = await streamer.findUnique({ where: { id } });
        if (foundStreamer) res.json(foundStreamer);
        else res.status(404).json({ message: "Streamer not found" });
    } catch (error) {
        res.status(500).json({ message: "Error fetching streamer", error });
    }
};

const getStreamerByEmail = async (req: Request, res: Response) => {
    const email = req.body;
    try {
        const foundStreamer = await streamer.findUnique({ where:  email });
        if (foundStreamer) res.json(foundStreamer);
        else res.status(404).json({ message: "Streamer not found" });
    } catch (error) {
        res.status(500).json({ message: "Error fetching streamer", error });
    }
};

const updateStreamer = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { name, email, avatarUrl } = req.body;
    try {
        const updatedStreamer = await streamer.update({
            where: { id },
            data: { name, email, avatarUrl }
        });
        res.json(updatedStreamer);
    } catch (error) {
        res.status(404).json({ message: "Streamer not found", error });
    }
};

const deleteStreamer = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        await streamer.delete({ where: { id } });
        res.json({ message: "Streamer deleted" });
    } catch (error) {
        res.status(404).json({ message: "Streamer not found", error });
    }
};

export {
    createStreamer,
    getAllStreamers,
    getStreamerById,
    getStreamerByEmail,
    updateStreamer,
    deleteStreamer,
};
