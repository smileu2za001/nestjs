"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const tasks_model_1 = require("../tasks.model");
class TaskStatusValidationPipe {
    constructor() {
        this.allowedStatuses = [
            tasks_model_1.TaskStatus.OPEN,
            tasks_model_1.TaskStatus.IN_PROGESS,
            tasks_model_1.TaskStatus.DONE,
        ];
    }
    transform(value, metadata) {
        value = value.toUpperCase();
        if (!this.isStatusValid(value)) {
            throw new common_1.BadRequestException(value + " is an invalid status");
        }
        return value;
    }
    isStatusValid(status) {
        const idx = this.allowedStatuses.indexOf(status);
        console.log("Index = " + idx);
        return (idx !== -1);
    }
}
exports.TaskStatusValidationPipe = TaskStatusValidationPipe;
//# sourceMappingURL=task-status-validation.pipe.js.map