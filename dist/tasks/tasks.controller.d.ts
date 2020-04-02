import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
export declare class TasksController {
    private tasksService;
    constructor(tasksService: TasksService);
    getTasks(filterDto: GetTaskFilterDto): Task[];
    getTaskById(ID: string): Task;
    deleteTaskByID(ID: string): void;
    updateTaskStatus(ID: string, STATUS: TaskStatus): Task;
    createTask(CreateTaskDto: CreateTaskDto): Task;
}
