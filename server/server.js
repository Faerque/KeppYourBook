const express = require("express");
const app = express();
const dotenv = require("dotenv");
const usersRoute = require("./routes/usersRoute");
const booksRoute = require("./routes/booksRoute");
const error = require("./middlewares/errorMiddlewareHandler");

dotenv.config();
require("./config/dbConnect")();

// Passing Body Data

app.use(express.json());

// Routes

// Users
app.use("/api/users", usersRoute);

// Books
app.use("/api/books", booksRoute);

// Error Middleware
app.use(error.errorMiddlewareHandler);

// User Routes

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT} `);
});
