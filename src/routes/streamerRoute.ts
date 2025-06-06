import express from "express";
import {
    createStreamer,
    deleteStreamer,
    getAllStreamers, getStreamerByEmail,
    getStreamerById,
    updateStreamer
} from "../services/streamerService";


const router = express.Router();

router.post("/", createStreamer);
router.get("/", getAllStreamers);
router.get("/:id", getStreamerById);
router.post("/get/email", getStreamerByEmail);
router.put("/:id", updateStreamer);
router.delete("/:id", deleteStreamer);

export default router;
