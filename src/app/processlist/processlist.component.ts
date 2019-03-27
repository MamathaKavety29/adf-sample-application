import { Component, OnInit, Input, Output, EventEmitter, ViewChild, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {  
  ProcessInstance,
   ProcessService,
   TaskDetailsModel,
   TaskDetailsEvent} from '@alfresco/adf-process-services';
import { Observer, Observable } from 'rxjs';
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
appId:string;

private taskObserver: Observer<TaskDetailsModel>;
task: Observable<TaskDetailsModel>;
activeTasks: TaskDetailsModel[] = [];

constructor(private activitiProcess: ProcessService,
private logService:LogService,
private route: ActivatedRoute,
private router:Router) {
  
 }
ngOnInit() {
this.route.params.subscribe(params => {
const processId = params['processInstanceId'];
if (processId && processId !== '0') {
this.processId = params['processInstanceId'];
this.loadProcessDetails(this.processId);
this.load(this.processId);
}
})
}
  load(processId: string): void 
  {
    this.loadActive(this.processId);
  }
  loadActive(processId: string) 
  {
    this.activeTasks=[];
    if(processId){
      this.activitiProcess.getProcessTasks(processId,null).subscribe(
        (res:TaskDetailsModel[])=>{
          this.activeTasks=res;
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
onTaskClick(data:any) 
{
this.router.navigate(['/apps',this.processId||0,'tasks',data.value.id]);
}
}
  
 

