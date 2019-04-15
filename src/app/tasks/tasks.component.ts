import { Component, OnInit } from '@angular/core';
import {AppConfigService} from '@alfresco/adf-core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskDetailsModel, TaskListService, FilterRepresentationModel, TaskFilterService } from '@alfresco/adf-process-services';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { Pagination } from '@alfresco/js-api';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  appId: string;
  color="orange";
  title="TaskList";

  
  

  constructor(private router: Router,
  private route: ActivatedRoute,
  private location:Location,private appConfig:AppConfigService) { }
  
  ngOnInit() {
  this.route.params.subscribe(params => {
  const applicationId = params['appId'];
  if (applicationId && applicationId !== '0') {
  this.appId = params['appId'];
  }
  });
  
  }
  
  onRowClick(taskId: string) {
  if (taskId) {
  this.router.navigate(['/apps',this.appId||0, 'task', taskId]);
  }
  }

  
  onBack(){
    this.location.back();
  }
  
  }
  



