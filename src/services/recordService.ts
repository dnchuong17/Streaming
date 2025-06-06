import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import {liveKitHelper} from "../helper/livekitHelper";

const { record } = new PrismaClient({
    log: ["query", "info", "warn", "error"]
});

const createRecord = async (req: Request, res: Response) => {
    const { roomId, roomName } = req.body;

    if (!roomId || !roomName) {
        return res.status(400).json({ message: "Missing roomId or roomName" });
    }

    try {
        const { jobInfo, fileUrl, startedAt } = await liveKitHelper.startRecording(roomName);

        console.log("Egress job info:", jobInfo);

        const newRecord = await record.create({
            data: {
                fileUrl,
                startedAt,
                roomId,
                egressId: jobInfo.egressId
            },
        });

        res.status(201).json({ record: newRecord, jobInfo });
    } catch (error) {
        res.status(500).json({ message: "Failed to start and save recording", error });
    }
};

const stopRecording = async (req: Request, res: Response) => {
    const { recordId } = req.body;

    try {
        const found = await record.findUnique({ where: { id: recordId } });
        if (!found) return res.status(404).json({ message: "Record not found" });

        const result = await liveKitHelper.stopRecording(found.egressId);

        const updated = await record.update({
            where: { id: recordId },
            data: { endedAt: new Date() },
        });

        res.json({ stopped: result, updated });
    } catch (err) {
        res.status(500).json({ message: "Stop recording failed", error: err });
    }
};


const getAllRecords = async (_req: Request, res: Response) => {
    try {
        const records = await record.findMany();
        res.json(records);
    } catch (error) {
        res.status(500).json({ message: "Error fetching records", error });
    }
};

const getRecordById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const foundRecord = await record.findUnique({ where: { id } });
        if (foundRecord) res.json(foundRecord);
        else res.status(404).json({ message: "Record not found" });
    } catch (error) {
        res.status(500).json({ message: "Error fetching record", error });
    }
};

const updateRecord = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { fileUrl, startedAt, endedAt, roomId } = req.body;
    try {
        const updatedRecord = await record.update({
            where: { id },
            data: { fileUrl, startedAt, endedAt, roomId }
        });
        res.json(updatedRecord);
    } catch (error) {
        res.status(404).json({ message: "Record not found", error });
    }
};

const deleteRecord = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        await record.delete({ where: { id } });
        res.json({ message: "Record deleted" });
    } catch (error) {
        res.status(404).json({ message: "Record not found", error });
    }
};

export {
    createRecord,
    stopRecording,
    getAllRecords,
    getRecordById,
    updateRecord,
    deleteRecord,
};
