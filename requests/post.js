// importing required functions 
const {sendResponse} = require('../helper');
const blogs = require('../blogsDB');

const CONTENT_TYPE_JSON = { "Content-Type": "application/json" };

const handlePostRequest = (req,res,parsedUrl) => {
    // console.log(parsedUrl)
    if(parsedUrl.path === '/addBlog'){
        let data='';
        req.on('data',chunk=>{
            data+=chunk.toString()
        })
        req.on('end',()=>{
            data = JSON.parse(data)
            const blogIndex = blogs.findIndex((b) => b.id === parseInt(data.id));
            if(blogIndex === -1){
                blogs.push(data)
                sendResponse(res, 201, CONTENT_TYPE_JSON, { message: "Blog successfully posted"});
            }else{
                sendResponse(res, 404, CONTENT_TYPE_JSON, { error: 'Blog with same id already exists' });
            }
        })
    }else{
        sendResponse(res, 404, CONTENT_TYPE_JSON, { error: 'Endpoint not found' });
    }
}

// exporting the function 
module.exports = {
    handlePostRequest
}

// CRUD
// C - CREATE
// R - READ 
// U - UPDATE 
// D - DELETE