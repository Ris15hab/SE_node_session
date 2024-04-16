const {sendResponse} = require('../helper');
const blogs = require('../blogsDB');

const CONTENT_TYPE_JSON = { "Content-Type": "application/json" };

const handleDeleteRequest = (req,res,parsedUrl) => {
    if(parsedUrl.path.startsWith('/deleteBlog')){
        const blogId = parsedUrl.query.id || parseInt(parsedUrl.path.split('/').pop());
        const blogIndex = blogs.findIndex((b) => b.id === parseInt(blogId));
        if(blogIndex !== -1){
            blogs.splice(blogIndex,1)
            sendResponse(res, 200, CONTENT_TYPE_JSON, { message: "Blog successfully deleted"});
        }else{
            sendResponse(res, 404, CONTENT_TYPE_JSON, { error: 'Blog not found' });
        }
    }else{
        sendResponse(res, 404, CONTENT_TYPE_JSON, { error: 'Endpoint not found' });
    }
}

module.exports = {
    handleDeleteRequest
}