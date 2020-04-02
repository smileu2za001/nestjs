import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import * as uuid from 'uuid/v1';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];
    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTaskFilter(filterDto:GetTaskFilterDto): Task[]{
        const STATUS = filterDto.status;
        const SEARCH = filterDto.search;
        
        let tasks = this.getAllTasks(); 
        
        if(STATUS){
            tasks = tasks.filter(task => task.status ==STATUS);    
        }
        if(SEARCH){
            tasks = tasks.filter(task =>
                task.title.includes(SEARCH) || 
                task.description.includes(SEARCH)
            )
        }
        return tasks;

    }

    getTaskByID(ID: string): Task {
        return this.tasks.find(task => task.id == ID);
    }

    deleteTaskByID(ID: string): void {
        this.tasks = this.tasks.filter(task => task.id != ID);
    }

    updateTaskStatus(ID: string, STATUS: TaskStatus): Task {
        const task = this.getTaskByID(ID);
        task.status = STATUS;
        return task;
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto;
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN,
        };
        this.tasks.push(task);
        return task;
    }
}
