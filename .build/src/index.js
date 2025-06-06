"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const rootRoute_1 = __importDefault(require("./routes/rootRoute"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.static('.'));
app.use(express_1.default.json());
app.use(rootRoute_1.default);
const port = process.env.PORT || 3002;
app.listen(3002, () => {
    console.log(`Server is running on port: ${port}`);
});
