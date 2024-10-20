import Document from "../models/Document";
const socketIo = require("socket.io");

// connecting server and client with sockket.io
const io = socketIo("3001", {
  cors: {
    origins: "http://localhost:5173",
    method: ["GET", "POST"],
  },
});
//cors mean- Cros Origin Request Source

const defaultValue = "";

io.on("connection", (socket: any) => {
  socket.on("get-document", async (documentId: string) => {
    const document = await findOrCreateDocument(documentId);
    socket.join(documentId);
    socket.emit("load-document", document.data);

    socket.on("send-chenges", (delta: any) => {
      socket.broadcast.to(documentId).emit("receive-changes", delta); // broadcasting all the changes to everyone in the same documentId room
      // console.log(delta)
    });

    socket.on("save-document", async (data: any) => {
      await Document.findByIdAndUpdate(documentId, { data }); //saving all the changes data coming from the client
    });
  });
});

// finding or creating an document
const findOrCreateDocument = async (id: string) => {
  if (id == null) return; // if id is null then return or skip this funcation
  const document = await Document.findById(id); // finding a document by id
  if (document != null) return document;

  return await Document.create({ _id: id, data: defaultValue }); //creating a new document for storing data with empty string data
};
