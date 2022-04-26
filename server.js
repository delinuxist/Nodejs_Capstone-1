// importing the http module provided by nodejs
const http = require("http");
// importing the fs module provided by nodejs
const { readFile, writeFile } = require("fs");
// importing the os module provided by nodejs
const os = require("os");

// port
const port = 5000;

// host
const host = "127.0.0.1";

//server
const server = http.createServer((req, res) => {
  // getting reqUrl path
  const urlPath = req.url;

  // setting status code to 200 and content-type text/html
  res.writeHead(200, { "Content-Type": "text/html" });

  // checking if request url is /
  if (urlPath === "/") {
    // read html file
    readFile("./pages/index.html", (err, data) => {
      //checking if there's error
      if (err) {
        res.writeHead(404);
        res.end("Sorry File Not Found");
      } else {
        // display the file's data
        res.end(data);
      }
    });
    // checking if request url is /about
  } else if (urlPath === "/about") {
    // read html file
    readFile("./pages/about.html", (err, data) => {
      //checking if there's error
      if (err) {
        res.writeHead(404);
        res.end("Sorry File Not Found");
      } else {
        // display the file's data
        res.end(data);
      }
    });
    // checking if request url is /sys
  } else if (urlPath === "/sys") {
    //getting os information
    const osInfo = {
      hostname: os.hostname(),
      platform: os.platform(),
      architecture: os.arch(),
      numberOfCPUS: os.cpus().length,
      networkInterfaces: os.networkInterfaces(),
      uptime: os.uptime(),
    };

    // coverting object to JSON
    const data = JSON.stringify(osInfo);

    // write data into osinfo.json
    writeFile("osinfo.json", data, (err) => {
      // check if there's error
      if (err) {
        res.writeHead(404);
        res.end("Sorry Unable To Write File");
      } else {
        // display a message
        res.writeHead(201, { "Content-Type": "text/plain" });
        res.end("Your OS info has been saved successfully!");
      }
    });
    // if request url doesn't match any specified route
  } else {
    // read html file
    readFile("./pages/404.html", (err, data) => {
      //check if there's error
      if (err) {
        res.writeHead(404);
        res.write("Sorry File Not found");
      } else {
        // display the file's data
        res.end(data);
      }
    });
  }
});

server.listen(port, host, () => {
  console.log(`Server running on port: ${port}`);
});
