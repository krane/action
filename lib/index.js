"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
const common_1 = require("@krane/common");
const config_1 = require("./config");
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    const url = core_1.getInput("url");
    const token = core_1.getInput("token");
    const file = core_1.getInput("file");
    const config = yield config_1.resolveConfig(file);
    const client = new common_1.KraneClient(url, token);
    yield client.saveDeployment(config);
    yield client.runDeployment(config.name);
});
run().catch((error) => core_1.setFailed(error.message));
