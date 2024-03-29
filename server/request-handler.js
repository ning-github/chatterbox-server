var util = require('./utils');
// messages store
var messages = {
  results: [ {username: 'Barnabus', text: 'I like the circus', roomname: 'tent'}]
};

/*************************************************************
**************************************************************/
// Request and Response come from node's http module.
//
// They include information about both the incoming request, such as
// headers and URL, and about the outgoing response, such as its status
// and content.

var requestHandler = function(request, response) {
  // Do some basic logging.
  console.log("Serving request type " + request.method + " for url " + request.url);
  if (request.method === "OPTIONS"){  // handle options by responding normally.
    util.sendResponse(response, 200);   // following this, it should send that actual request
  }
  if (request.method === "GET") {    
    util.sendResponse(response, messages);
  }
  if (request.method === "POST") {
    util.collectData(request, function(data){
      messages.results.push(JSON.parse(data)); // updates the the array (needs to be parsed first)
      util.sendResponse(response, messages, 201);  // writes the response and ends
    })
  }
  // The outgoing status.
  // var statusCode = 200;
  // // var headers = defaultCorsHeaders;
  // // headers['Content-Type'] = "JSON";

  // // .writeHead() writes to the request line and headers of the response,
  // // which includes the status and all headers.
  // response.writeHead(statusCode, headers);

  // // Make sure to always call response.end() 
  // response.end(JSON.stringify(messages));

  //- Node may not send anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.

};

exports.requestHandler = requestHandler;



// // default headers
// var headers = {
//   "access-control-allow-origin": "*",
//   "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
//   "access-control-allow-headers": "content-type, accept",
//   "access-control-max-age": 10, // Seconds.
//   "Content-Type" :"text/plain"
// };
// /*************************************************************

// You should implement your request handler function in this file.

// requestHandler is already getting passed to http.createServer()
// in basic-server.js, but it won't work as is.

// You'll have to figure out a way to export this function from
// this file and include it in basic-server.js so that it actually works.

// *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

// **************************************************************/

// var requestHandler = function(request, response) {
//   // Request and Response come from node's http module.
//   //
//   // They include information about both the incoming request, such as
//   // headers and URL, and about the outgoing response, such as its status
//   // and content.
//   //
//   // Documentation for both request and response can be found in the HTTP section at
//   // http://nodejs.org/documentation/api/

//   // Do some basic logging.
//   //
//   // Adding more logging to your server can be an easy way to get passive
//   // debugging help, but you should always be careful about leaving stray
//   // console.logs in your code.
//   console.log("Serving request type " + request.method + " for url " + request.url);

//   // The outgoing status.
//   var statusCode = 200;

//   // See the note below about CORS headers.

//   // Tell the client we are sending them plain text.
//   //
//   // You will need to change this if you are sending something
//   // other than plain text, like JSON or HTML.

//   // .writeHead() writes to the request line and headers of the response,
//   // which includes the status and all headers.
//   response.writeHead(statusCode, headers);

//   // Make sure to always call response.end() - Node may not send
//   // anything back to the client until you do. The string you pass to
//   // response.end() will be the body of the response - i.e. what shows
//   // up in the browser.
//   //
//   // Calling .end "flushes" the response's internal buffer, forcing
//   // node to actually send all the data over to the client.
//   response.end("Hello, World!");
// };

// exports.requestHandler = requestHandler;

