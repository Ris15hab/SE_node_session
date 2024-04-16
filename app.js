const http = require("http");
const url = require("url");
const cors = require('cors')

const PORT = 5050;
const CONTENT_TYPE_JSON = { "Content-Type": "application/json" };
const CONTENT_TYPE_HTML = { "Content-Type": "text/html" };

const blogs = require("./blogsDB");
const { log } = require("console");

//helper
const {sendResponse} = require("./helper");

//cors
const corsMiddleware = cors();

// importing handle request methods
const {handlePostRequest} = require('./requests/post')
const {handleGetRequest} = require('./requests/get')
const {handlePutRequest} = require('./requests/put')
const {handleDeleteRequest} = require('./requests/delete')

const server = http.createServer((req, res) => {
  corsMiddleware(req, res, () => {
    const parsedUrl = url.parse(req.url, true);
    //   console.log(parsedUrl);
    if (req.method === "GET") {
      handleGetRequest(req, res, parsedUrl);
    } else if (req.method === "POST") {
      handlePostRequest(req, res, parsedUrl);
    } else if (req.method === "PUT") {
      handlePutRequest(req, res, parsedUrl);
    } else if (req.method === "DELETE") {
      handleDeleteRequest(req, res, parsedUrl);
    } else {
      sendResponse(res, 404, CONTENT_TYPE_JSON, { error: "Method not allowed" });
    }
  })
});

server.listen(PORT, () => {
  console.log(`Blog server listening on ${PORT}`);
});