const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const fs = require("fs");

const db = JSON.parse(fs.readFileSync("./db.json", "UTF-8"));

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.get("/echo", (req, res) => {
  res.jsonp(req.query);
});

// server.get("/blogs", (req, resp) => {
//   resp.status(500).jsonp({
//     error: "error message here",
//   });
// });

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  //   res.statusCode = 401;
  if (req.method === "POST") {
    // POSTでは通常新しいレスポンスを作成してしまうため、Mockの場合はgetに変更して固定内容を返却する。
    req.method = "GET";
    //req.body.createdAt = Date.now();
  }

  switch (req.originalUrl) {
    case "/blogs":
      res.statusCode = 400;
      break;
    case "/api":
      res.statusCode = 500;
      break;
  }

  // Continue to JSON Server router
  next();
});

// Use default router
server.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running");
});
