import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoute from "./routes/authRoutes.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
const corsOptions = {
    origin: "*",
}

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("MongoDB Connect True");
    } catch (error) {
        console.log("MongoDB Connect False", error);
    }
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(express.static("public"));
app.use("/api/v1/auth", authRoute);

app.get("/register", (req, res) => {
    res.sendFile("register.html", { root: "public" });
})

app.get("/login", (req, res) => {
    res.sendFile("login.html", { root: "public" });
})

app.get("/", (req, res) => {
    res.sendFile("index.html", { root: "public" });
})

app.listen(port, () => {
    connect();
    console.log(`Server listening on port: ${port}`);
})