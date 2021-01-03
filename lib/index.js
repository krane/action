"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const core = __importStar(require("@actions/core"));
const common_1 = require("@krane/common");
const config_1 = require("./config");
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    const url = core.getInput("url");
    const token = core.getInput("token");
    const file = core.getInput("file");
    const config = yield config_1.resolveConfig(file);
    const client = new common_1.KraneClient(url, token);
    core.startGroup(`Saving ${config.name} configuration`);
    core.info(` Deployment configuration:\n${JSON.stringify(config, null, 2)}`);
    yield client.saveDeployment(config);
    core.info(`Configuration for ${config.name} saved succesfully`);
    core.endGroup();
    core.startGroup(`Triggering deployment ${config.name}`);
    core.info(`Triggering new run for ${config.name}`);
    yield client.runDeployment(config.name);
    core.info(`Deployment ${config.name} triggered succesfully`);
    core.endGroup();
});
run().catch((error) => core.setFailed(error.message));
