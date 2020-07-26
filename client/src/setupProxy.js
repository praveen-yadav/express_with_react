/*
Create a setupProxy.js file in the client/src/ directory. There is no need to import this file anywhere, 
CRA looks for a file by this name and loads it.

This proxy is only needed in development mode. Reason is that we have 2 separate server running on Dev environment. What we want to do below is :
If the request came to react server at localhost:3000:
1. If it ask for HTML CSS JS, it will return the resource
2. If it wants to access /api or /auth/google , forward the request to our Node Server which is running at localhost port 5000.
*/

/* In production mode, we will have only one server which will return both bundled HTML JS CSS as well as DB access */
const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    ["/api", "/auth/google"],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};