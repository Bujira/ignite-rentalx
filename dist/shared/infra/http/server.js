"use strict";

var _app = require("./app");

_app.app.listen(process.env.APP_PORT, () => console.log("Server is running..."));