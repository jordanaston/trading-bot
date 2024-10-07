"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes/routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5001;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/", routes_1.default);
const CONNECTION_URL = process.env.CONNECTION_URL;
console.log(CONNECTION_URL);
mongoose_1.default
    .connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
}))
    .catch((error) => console.error(error.message));
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});
