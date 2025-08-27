import express from "express";
import axios from "axios";
import { registerPublicApi } from "./nodeTestPublic";
import { getPrivateMessage } from "./nodeTestPrivate";

const app = express();
const port = 3001;

// Register public API endpoint
registerPublicApi(app);

// Example usage of private API (not exposed as HTTP endpoint)
console.log(getPrivateMessage());

// Example: Use the public API from within your server code
async function usePublicApi() {
  try {
    const response = await axios.get(`http://localhost:${port}/api/public-test`);
    console.log("Public API responded:", response.data);
  } catch (err) {
    console.error("Error calling public API:", err);
  }
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  usePublicApi();
});