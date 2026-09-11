require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";

const io = new Server(server, {
  cors: {
    origin: CLIENT_ORIGIN,
    methods: ["GET", "POST"],
  },
});

app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json());

// Health check — confirms the API is up before we wire real routes to it.
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "feed-me-server",
    time: new Date().toISOString(),
  });
});

// Socket.IO connection log — replace with real room join logic
// (order:<id> rooms, driver rooms) as the order/delivery routes come online.
io.on("connection", (socket) => {
  console.log(`socket connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`socket disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`feed-me server listening on http://localhost:${PORT}`);
});
