import { Component, OnInit } from '@angular/core';
import { AppConfigService, AppsProcessService } from '@alfresco/adf-core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskDetailsModel, TaskListService, FilterRepresentationModel, TaskFilterService } from '@alfresco/adf-process-services';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { Pagination, AppDefinitionRepresentation } from '@alfresco/js-api';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  appId: number;
  color = "orange";
  title = "TaskList";
  appDetails: any;
  applicationName: string;



  constructor(private router: Router,
    private route: ActivatedRoute,
    private location: Location, private appProcessServices: AppsProcessService,
  ) { }

  ngOnInit() 
  {
    this.route.params.subscribe(params => {
      this.appId = params['appId'];
    });
  }

    onRowClick(taskId: string) 
    {
      console.log(this.route);
      console.log(taskId);
      if (taskId) 
      {
        this.router.navigate(['/app', this.appId || 0, 'task',taskId]);
      }
    }
}








