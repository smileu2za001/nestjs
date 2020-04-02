import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
export declare class TasksService {
    private tasks;
    getAllTasks(): Task[];
    getTaskFilter(filterDto: GetTaskFilterDto): Task[];
    getTaskByID(ID: string): Task;
    deleteTaskByID(ID: string): void;
    updateTaskStatus(ID: string, STATUS: TaskStatus): Task;
    createTask(createTaskDto: CreateTaskDto): Task;
}
