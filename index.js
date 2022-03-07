const express = require("express");
const app = express();

app.use(logger);

// Route Handlers
app.get("/books", (req, res) => {
  res.send({ route: "/books" });
  console.log("run");
});

app.get("/libraries", checkPermission("librarian"), (req, res) => {
  res.send({
    route: "/libraries",
    permission: req.permission,
  });
});

app.get("/authors", checkPermission("authors"), (req, res) => {
  res.send({ route: "/authors", permission: req.permission });
});

// Middlewares
function logger(req, res, next) {
  if (req.path == "/books") {
    console.log("/books");
  } else if (req.path == "/libraries") {
    console.log("/libraries");
  } else if (req.path == "/authors") {
    console.log("/authors");
  }
  next();
}

function checkPermission(user) {
  return function logger2(req, res, next) {
    //check if path is library or author add true accordingly

    if (req.path == "/libraries") {
      req.permission = true;
      console.log("Permission  = true");
      //   req.role = "librarien";
    } else if (req.path == "/authors") {
      req.permission = true;
      console.log("Permission  = true");
    }

    //check if user is librarian or author and log the result accordingly.

    if (user == "librarian") {
      console.log("check Permission :librarian");
      return next();
      //   req.role = "librarien";
    } else if (user == "authors") {
      console.log("check Permission : authors");
      return next();
    }
  };
}

// listening port.
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
