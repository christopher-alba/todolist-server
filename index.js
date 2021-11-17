const server = require("./server");
require("./mongodb/connection");

const port = process.env.PORT || 3000;

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log("Listening on port", port);
});
