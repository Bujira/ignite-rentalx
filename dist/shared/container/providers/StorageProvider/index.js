"use strict";

var _tsyringe = require("tsyringe");

var _LocalStorageProvider = require("./implementations/LocalStorageProvider");

var _S3StorageProvider = require("./implementations/S3StorageProvider");

const storageDisk = {
  local: _LocalStorageProvider.LocalStorageProvider,
  s3: _S3StorageProvider.S3StorageProvider
};

_tsyringe.container.registerSingleton("StorageProvider", storageDisk[process.env.disk]);