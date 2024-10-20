import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import jwt, { JwtPayload } from "jsonwebtoken";
import path from "path";
import dotenv from "dotenv";
import { PORT, JWT_SECRET, MONGODDBURL } from "./config/config";
import authRoutes from "./routes/authRoutes";
import protectedRoutes from "./routes/protectedRoutes";
import { connectDB } from "./connection/connect";
import { Server } from "socket.io";
import mongoose from "mongoose";

const app = express();
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
// app.use("/api", authRoutes);
app.use("/api", protectedRoutes);

connectDB(MONGODDBURL);

// //connection mongoose

// //creating schema
// const docSchema = new mongoose.Schema({
//   _id: String,
//   data: Object,
// });

// const Document = mongoose.model("Document", docSchema);

// // connecting server and client with sockket.io
// const io = new Server(3001, {
//   cors: {
//     origin: "http://localhost:5173", // your frontend URL
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   },
// });

// //cors mean- Cros Origin Request Source

// const defaultValue: any = "";

// io.on("connection", (socket) => {
//   socket.on("get-document", async (documentId) => {
//     const document = await findOrCreateDocument(documentId);
//     socket.join(documentId);
//     socket.emit("load-document", document!.data);

//     socket.on("send-chenges", (delta) => {
//       socket.broadcast.to(documentId).emit("receive-changes", delta); // broadcasting all the changes to everyone in the same documentId room
//       // console.log(delta)
//     });

//     socket.on("save-document", async (data) => {
//       console.log("saving document");
//       await Document.findByIdAndUpdate(documentId, { data }); //saving all the changes data coming from the client
//     });
//   });
// });

// // finding or creating an document
// const findOrCreateDocument = async (id: string) => {
//   if (id == null) return; // if id is null then return or skip this funcation
//   const document = await Document.findById(id); // finding a document by id
//   if (document) return document;

//   return await Document.create({ _id: id, data: defaultValue }); //creating a new document for storing data with empty string data
// };

// // const io = new Server(8000);
// const io = new Server(8000, {
//   cors: {
//     origin: "http://localhost:5173", // your frontend URL
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   },
// });

// const emailToSocketId = new Map<string, string>();
// const socketIdTOEmail = new Map<string, string>();

// io.on("connection", (socket) => {
//   console.log("Socket connected: ", socket.id);

//   // console.log("the socket: ", socket);
//   socket.on("room:join", (data) => {
//     console.log("data: ", data);
//     const { roomId, user } = data;
//     emailToSocketId.set(user.email, socket.id);
//     socketIdTOEmail.set(socket.id, user.email);

//     // emitting message of new user joining to allready present user
//     io.to(roomId).emit("user:joined", {
//       user,
//       socketUserId: socket.id,
//       message: "new user joined",
//     });

//     // joining new user to room
//     socket.join(roomId);

//     // pushing the user to the room
//     io.to(socket.id).emit("room:join", {
//       data,
//       message: "pushing user to room",
//     });
//   });
// });

// app.post("/signin", (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;
//   // do db validations, fetch id of user from db
//   const token = jwt.sign(
//     {
//       id: 1,
//     },
//     JWT_SECRET
//   );
//   res.cookie("token", token);
//   res.send("Logged in!");
// });

// app.get("/user", (req, res) => {
//   const token = req.cookies.token;
//   const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
//   // Get email of the user from the database
//   res.send({
//     userId: decoded.id,
//   });
// });

// app.post("/logout", (req, res) => {
//   res.cookie("token", "ads");
//   res.json({
//     message: "Logged out!",
//   });
// });

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
