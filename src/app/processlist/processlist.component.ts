import { Component, OnInit, Input, Output, EventEmitter, ViewChild, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  ProcessInstance,
  ProcessService,
  TaskDetailsModel,
  TaskDetailsEvent
} from '@alfresco/adf-process-services';
import { LogService } from '@alfresco/adf-core';
import { MatDialog } from '@angular/material';
import { DatePipe } from '@angular/common';
import { share } from 'rxjs/operators';


@Component({
  selector: 'app-processlist',
  templateUrl: './processlist.component.html',
  styleUrls: ['./processlist.component.scss']
})
export class ProcesslistComponent implements OnInit {
  processInstanceDetails: ProcessInstance;
  processId: string;
  appId: string;
   task:any;

  activeTasks: TaskDetailsModel[] = [];
  completedTasks: TaskDetailsModel[] = [];

  displayedColumns: string[] = ['id','name', 'assignee', 'created'];


  constructor(private activitiProcess: ProcessService,
    private logService: LogService,
    private route: ActivatedRoute,
    private router: Router) {

  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      const processId = params['processInstanceId'];
      if (processId && processId !== '0') {
        this.processId = params['processInstanceId'];
        this.loadProcessDetails(this.processId);
        this.load(this.processId);
             }
    });
  }
  load(processId: string): void {
    this.loadActive(this.processId);
    this.loadCompleted(this.processId);
  }
  loadCompleted(processId: string) {
    this.completedTasks = [];
    if (processId) {
      this.activitiProcess.getProcessTasks(processId, 'completed').subscribe(
        (res: TaskDetailsModel[]) => {
          this.completedTasks = res;
          console.log("completed");
          console.log(this.completedTasks);
        }
      );
    }
  }

  loadActive(processId: string) {
    this.activeTasks = [];
    if (processId) {
      this.activitiProcess.getProcessTasks(processId, null).subscribe(
        (res: TaskDetailsModel[]) => {
          this.activeTasks = res;
        }
      );
    }
  }
  loadProcessDetails(processId: string) {
    if (processId) {
      this.activitiProcess.getProcess(processId).subscribe(
        (res: ProcessInstance) => {
          this.processInstanceDetails = res;
        }
      );
    }
  }
  onTaskClick(data: any) {
    console.log(data);
    this.task = data.value.obj;
    console.log(this.task);
    this.router.navigate(['/tasks', this.task.id, 'taskDetails']);
  }

  onMatTableRow(data:any){
    console.log(data);
    console.log(data.path);
    // const taskid=data.path[1];
    this.router.navigate(['/tasks', this.task.id, 'taskDetails']);
  }
}




