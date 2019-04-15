import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceTaskService {
  taskId:string;

  constructor() { }

  getTaskId(taskId:string){
this.taskId=taskId;
  }
}
