"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bull_1 = __importDefault(require("bull"));
const redis_1 = __importDefault(require("../config/redis"));
const ResetPasswordMail_1 = __importDefault(require("../app/jobs/ResetPasswordMail"));
const jobs = [ResetPasswordMail_1.default];
const queues = Object.values(jobs).map(job => ({
    bull: new bull_1.default(job.key, { redis: redis_1.default }),
    name: job.key,
    handle: job.handle
}));
exports.default = {
    queues,
    add(name, data) {
        const queue = this.queues.find((queue) => queue.name === name);
        if (queue)
            return queue.bull.add(data);
    },
    procces() {
        return this.queues.forEach((queue) => {
            queue.bull.process(queue.handle);
            queue.bull.on('failed', (job, error) => {
                console.error(`Job: ${job}, Failed: ${error}`);
            });
        });
    }
};
//# sourceMappingURL=Queue.js.map