const {sendResponse} = require('../helper');
const blogs = require('../blogsDB');

const CONTENT_TYPE_JSON = { "Content-Type": "application/json" };

const handlePutRequest = (req,res,parsedUrl) => {
    if(parsedUrl.path.startsWith('/updateBlog')){
        let data='';
        req.on('data',chunk=>{
            data+=chunk.toString()
        })
        req.on('end',()=>{
            const blogId = parsedUrl.query.id || parseInt(parsedUrl.path.split('/').pop());
            const blogIndex = blogs.findIndex((b) => b.id === parseInt(blogId));
            if(blogIndex !== -1){
                data = JSON.parse(data)
                blogs[blogIndex].title = data.title || blogs[blogIndex].title
                blogs[blogIndex].caption = data.caption || blogs[blogIndex].caption
                sendResponse(res, 200, CONTENT_TYPE_JSON, { message: "Blog successfully updated"});
            }else{
                sendResponse(res, 404, CONTENT_TYPE_JSON, { error: 'Blog not found' });
            }
        })
    }else{
        sendResponse(res, 404, CONTENT_TYPE_JSON, { error: 'Endpoint not found' });
    }
}

module.exports = {
    handlePutRequest
}