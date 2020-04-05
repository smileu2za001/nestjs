# Welcome to NestJS#1 SQL DB Connecting
<p align="center">
<img src="https://cdn.britannica.com/93/153593-050-15D2B42F/Osama-bin-Laden.jpg" width="320" />
  <h4><a href="https://github.com/smileu2za001/nestjs">PART1 - SQL DB Connecting</a></h4>
  <h4><a href="https://github.com/smileu2za001/nestjs-auth">PART2 - User Authentication</a></h4>
</p>

## Create Serv, Ctrl and Module

- first terminal
```bash
$ nest g module task
$ nest g controller task --no-spec
$ nest g service task --no-spec
```
## Config

```bash
import {TypeOrmModuleOptions} from '@nestjs/typeorm'

export const typeOrmConfig : TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'manager',
  database: 'taskmanagement',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
```
ในไฟล์ ormconfig.json ก็จะเป็น Config ต่างๆเพื่อเชื่อมกับ SQL สังเกตุตรง "entities" สำคัญมากครับเพื่อบอกให้ TypeORM อ่านไฟล์ .entity ทุกไฟล์เมื่อเรา Run Server


## AppModule and Other Moduke
จากนั้นเราต้องไป Import TypeOrmModule.forRoot() เข้าไปในไฟล์ AppModule 
```bash
    TypeOrmModule.forRoot(typeOrmConfig), //config SQLServer on typeorm.config
```
จากนั้นเราต้องไป Import     TypeOrmModule.forFeature([TaskRepository]), เข้าไปในไฟล์ TaskModulele
ปล. ต้องสร้าง class TaskRepository ก่อนนะ
```bash
  @EntityRepository(Task)
  export class TaskRepository extends Repository<Task>{ 
```
Tasks Module
```bash
    TypeOrmModule.forFeature([TaskRepository]),
```

## Create Entity
เสร็จแล้วจึงไปสร้าง Class Entity ดังนี้

```bash
  @Entity()                       //This Class Entity
```
```bash
  @PrimaryGeneratedColumn()   //จะเป็นการสร้าง Column นั้นให้เป็น key
```
```bash
  @Column()                   //จะเป็นการสร้าง Column ธรรมดา
```
```bash
  export class Task extends BaseEntity{           
      /* Export to Task Module
      imports: [
      TypeOrmModule.forFeature([TaskRepository]),
      */
```

- create new file on auth 'tasks.entity.ts'
```bash
@Entity()
export class Task extends BaseEntity{           
    @PrimaryGeneratedColumn()   
    id: number;

    @Column() 
    title: string;

    @Column()
    description: string; 

    @Column()
    status : TaskStatus;
}
```



## Service.ts
Import @InjectRepository , @Repository , @Photo มาไว้นะครับ ตามโค้ดด้านล่าง @InjectRepository(TaskRepository) จะเป็นการบอกให้ Inject ตัว Photo Repository เข้ามาตามที่เราได้ประกาศไว้ใน PhotoModule ครับ

```bash
@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
    ) { }
```

เขียนอีกรูปแบบนึง
```bash
@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
    ) { }
```


## Pipe
####GLOBAL PIPE
```bash
    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() CreateTaskDto: CreateTaskDto): Task {
```
####PARAM PIPE
```bash
    @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto): Task[]{
```
####MANUAL PIPE
```bash
    @Patch('/:id/status')
    updateTaskStatus(@Body('status', TaskStatusValidationPipe) STATUS: TaskStatus ): Task {
        #look on pipes/folders
```
