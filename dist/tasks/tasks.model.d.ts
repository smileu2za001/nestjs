export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
}
export declare enum TaskStatus {
    OPEN = "OPEN",
    IN_PROGESS = "IN_PROGESS",
    DONE = "DONE"
}
