const {sendResponse} = require('../helper');
const blogs = require('../blogsDB');

const CONTENT_TYPE_JSON = { "Content-Type": "application/json" };

const handleGetRequest = (req, res, parsedUrl) => {
  if (parsedUrl.path === "/") {
    sendResponse(res, 200, CONTENT_TYPE_JSON, {
      success: true,
      message: "Welcome to blogs app",
    })

  } else if (parsedUrl.path === "/getBlogs") {

    sendResponse(res, 200, CONTENT_TYPE_JSON, blogs)

  } else if (parsedUrl.path.startsWith("/blog")) {

    const blogId =
      parsedUrl.query.id || parseInt(parsedUrl.path.split("/").pop());
    const blog = getBlogById(blogId);

    if (blog) {
      sendResponse(res, 200, CONTENT_TYPE_JSON, blog);
    } else {
      sendResponse(res, 404, CONTENT_TYPE_JSON, { error: "Blog not found" });
    }
  } else {
    sendResponse(res, 404, CONTENT_TYPE_JSON, { error: "Endpoint not found" });
  }
};

// Function to get a blof by its id from blogs
const getBlogById = (blogId) => {
  return blogs.find((b) => b.id === parseInt(blogId));
}

module.exports = {
  handleGetRequest
}