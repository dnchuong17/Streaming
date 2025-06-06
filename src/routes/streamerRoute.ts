import express from "express";
import {
    createStreamer,
    deleteStreamer,
    getAllStreamers,
    getStreamerById,
    updateStreamer
} from "../services/streamerService";


const router = express.Router();

router.post("/", createStreamer);
router.get("/", getAllStreamers);
router.get("/:id", getStreamerById);
router.put("/:id", updateStreamer);
router.delete("/:id", deleteStreamer);

export default router;
