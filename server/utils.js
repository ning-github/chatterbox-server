// default headers
var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "application/json"
}; // ^--You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.

// this is what actually writes and responds to requests
//  -all requestHandler does is manage how sendResponse is called
exports.sendResponse = function(response, dataObj, statusCode){
  statusCode = statusCode || 200;
  response.writeHead(statusCode, headers);
  response.end(JSON.stringify(dataObj));
}

// this is for gathering POST data
exports.collectData = function(request, callback){
  var postData = "";
  request.on("data", function(chunk){
    postData+=chunk;
  });
  // the callback will act on the string of data once it's fully gathered
  request.on("end", function(){
    callback(postData);
  });
}