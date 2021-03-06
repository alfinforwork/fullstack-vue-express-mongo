const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Define routes
const posts = require("./routes/api/posts");

// Routes
app.use(`/api/posts`, posts);

// Handle production
if (process.env.NODE_ENV === "production") {
  // static folder
  app.use(express.static(`${__dirname}/public/`));

  // handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
}

// Port
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server listen att ${port}`);
});
