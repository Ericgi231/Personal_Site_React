import express from "express";
import cors from "cors";
import axios from "axios";
import { registerPublicApi } from "./nodeTestPublic";
import { getPrivateMessage } from "./nodeTestPrivate";

const app = express();
const port = 3001;
app.use(cors());

const BOX_COUNT = 4;
const BOX_SIZE = 80;
const BOX_SPEED = 3; // or whatever speed you want
const COLORS = ["#646cff", "#ffc107", "#dc3545", "#28a745"];
const containerSize = { w: 800, h: 600 }; // Set a fixed size or make configurable

function getRandom(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function getRandomDirection(speed: number) {
  const angle = Math.random() * 2 * Math.PI;
  return {
    dx: Math.cos(angle) * speed,
    dy: Math.sin(angle) * speed,
  };
}

// Box state
const boxes = Array.from({ length: BOX_COUNT }).map((_, i) => {
  const { dx, dy } = getRandomDirection(BOX_SPEED);
  return {
    x: getRandom(0, containerSize.w - BOX_SIZE),
    y: getRandom(0, containerSize.h - BOX_SIZE),
    dx,
    dy,
    color: COLORS[i % COLORS.length],
  };
});

function normalizeVelocity(box: { dx: number; dy: number }, speed: number) {
  const len = Math.sqrt(box.dx * box.dx + box.dy * box.dy);
  if (len === 0) {
    // Assign a random direction if stopped
    const { dx, dy } = getRandomDirection(speed);
    box.dx = dx;
    box.dy = dy;
  } else {
    box.dx = (box.dx / len) * speed;
    box.dy = (box.dy / len) * speed;
  }
}

// Animation loop (updates box positions)
setInterval(() => {
  for (let i = 0; i < BOX_COUNT; i++) {
    let b = boxes[i];
    b.x += b.dx;
    b.y += b.dy;
    if (b.x <= 0 || b.x >= containerSize.w - BOX_SIZE) {
      b.dx *= -1;
      normalizeVelocity(b, BOX_SPEED);
    }
    if (b.y <= 0 || b.y >= containerSize.h - BOX_SIZE) {
      b.dy *= -1;
      normalizeVelocity(b, BOX_SPEED);
    }
    b.x = Math.max(0, Math.min(b.x, containerSize.w - BOX_SIZE));
    b.y = Math.max(0, Math.min(b.y, containerSize.h - BOX_SIZE));
  }

  // After updating positions and wall collisions
  for (let i = 0; i < BOX_COUNT; i++) {
    for (let j = i + 1; j < BOX_COUNT; j++) {
      const a = boxes[i];
      const b = boxes[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < BOX_SIZE) {
        // Simple elastic collision: swap directions
        [a.dx, b.dx] = [b.dx, a.dx];
        [a.dy, b.dy] = [b.dy, a.dy];
        normalizeVelocity(a, BOX_SPEED);
        normalizeVelocity(b, BOX_SPEED);
        // Move them apart to prevent sticking
        const overlap = BOX_SIZE - dist;
        const adjustX = (dx / dist) * (overlap / 2);
        const adjustY = (dy / dist) * (overlap / 2);
        a.x += adjustX;
        a.y += adjustY;
        b.x -= adjustX;
        b.y -= adjustY;
      }
    }
  }
}, 100);

// API endpoint to get box states
app.get("/node-api/boxes", (req, res) => {
  res.json({ boxes, containerSize, boxSize: BOX_SIZE });
});

// Register public API endpoint
registerPublicApi(app);

// Example usage of private API (not exposed as HTTP endpoint)
console.log(getPrivateMessage());

// Example: Use the public API from within your server code
async function usePublicApi() {
  try {
    const response = await axios.get(`http://localhost:${port}/node-api/public-test`);
    console.log("Public API responded:", response.data);
  } catch (err) {
    console.error("Error calling public API:", err);
  }
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  usePublicApi();
});