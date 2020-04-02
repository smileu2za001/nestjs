import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get()
    getTasks(@Query() filterDto: GetTaskFilterDto): Task[] {
        if (Object.keys(filterDto).length) {
            return this.tasksService.getTaskFilter(filterDto);
        }
        else {
            return this.tasksService.getAllTasks();
        }
    }

    @Get('/:id')
    getTaskById(@Param('id') ID: string): Task {
        console.log("Search is " + ID);
        return this.tasksService.getTaskByID(ID);
    }

    @Delete('/:id')
    deleteTaskByID(@Param('id') ID: string): void {
        console.log(ID + " to Deleted");
        this.tasksService.deleteTaskByID(ID);
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') ID: string,
        @Body('status') STATUS: TaskStatus
    ): Task {
        console.log(ID + " to Update Status")
        return this.tasksService.updateTaskStatus(ID, STATUS);
    }

    @Post()
    createTask(@Body() CreateTaskDto: CreateTaskDto): Task {
        return this.tasksService.createTask(CreateTaskDto);
    }
}

/* ===== FUNCTION AND RETURN TYPE =====
FUNCTION
    @METHOD('PATH')
    function_on_service(Parameter => variable:type) : return type{
        return this.service.function_on_service(Param);
    }
EXAMPLE
    @Get('/:id')
    getTaskById(@Param('id') as:string) : Task{
       return this.tasksService.getTaskByID(as);
    }
*/


/* ===== POSTMAN POST METHOD =====
POSTMAN > Body
    KEY             VALUE
    title           Text of title
    descrtiption    Text of Description

Codeing
    @Post()
    createTask(@Body('title') temp){
        console.log('body is ',temp);
        // body is Text of title
    }

    @Post()
    createTask(@Body() temp){
        console.log('body is ',temp);
        // body is { title: 'Text of Title', description: 'Text of Description' }
    }
*/


/*  ===== ID PARAMETER =====
LINK
    localhost:3000/AllahuAbkar
Result
    as = AllahuAkbar
Coding
    getTaskById(@Param('id') as:string): Task{
        console.log(as)
   }
*/

/* ====== ID QUERY =======
DTO FILE
    export class GetTaskFilterDto{
        status : TaskStatus;
        search : string;
    }
LINK
    localhost:3000/status=open&search=akbar
RESULT
    status = 'open' , search = 'akbar';
Coding
    getAllTasks(@Query() filterDto: GetTaskFilterDto): Task[] {
        console.log(filterDto);
}
*/