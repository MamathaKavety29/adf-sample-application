import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProcessInstanceHeaderComponent, ProcessInstance, TaskDetailsEvent, ProcessService } from '@alfresco/adf-process-services';
import { LogService } from '@alfresco/adf-core';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss']
})
export class ProcessComponent implements OnInit{
  appId: string;
 
  constructor(private router:Router,
    private route:ActivatedRoute){}

  ngOnInit() {
    this.route.params.subscribe(params => {
    const applicationId = params['appId'];
    if (applicationId && applicationId !== '0') {
    this.appId = params['appId'];
    }
    });
    }

  onRowClick(processId: any) {
    console.log(processId);
   this.router.navigate(['/process',processId||0,'processDetails']);
  }
 
}
