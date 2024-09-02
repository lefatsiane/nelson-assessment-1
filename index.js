const express = require("express"); // Import the express module
const axios = require("axios"); // Import the axios module
const app = express(); // Create an instance of express
const port = process.env.PORT || 3001; // Define the port to run the server

app.use(express.json()); // Middleware to parse JSON bodies

let storedData = null; // store the result of the POST request

// POST request handler for the root URL
app.post("/", (req, res) => {
  const { data } = req.body; // Extract 'data' from the request body

  // Check if 'data' is a string
  if (typeof data !== "string") {
    return res.status(400).json({ error: "Invalid input" }); // Return error if 'data' is not a string
  }

  // Convert string to array of characters
  const charArray = data.split("");

  // Sort the array alphabetically
  charArray.sort();

  // Store the sorted array as a word
  storedData = { word: charArray.join("") };

  // Return the sorted array as a word
  res.json(storedData);
});

// GET request handler for '/api/data' URL
app.get("/api/data", (req, res) => {
  if (storedData) {
    res.status(200).json(storedData); // Return stored data if available
  } else {
    res.status(404).json({ error: "No data available" }); // Return error if no data is available
  }
});

// Start the server and listen on the defined port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);

  // Automatically send a POST request after the server starts
  axios
    .post(`http://localhost:${port}/`, { data: "" })
    .then((response) => {
      console.log("POST request sent successfully:", response.data);
    })
    .catch((error) => {
      console.error("Error sending POST request:", error);
    });
});
