"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const environment_1 = require("../utils/environment");
exports.default = {
    private_secret: environment_1.PRIVATE_SECRET,
    public_secret: environment_1.PUBLIC_SECRET,
    expiresIn: '3d',
};
//# sourceMappingURL=auth.js.map