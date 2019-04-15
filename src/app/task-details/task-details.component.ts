import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormRenderingService, UserProcessModel, UpdateNotification, CardViewUpdateService, ClickNotification, PeopleProcessService } from '@alfresco/adf-core';
import { CustomEditorComponent } from '../stencils.module';
import { PreviewService } from '../services/preview.service';
import { Location } from '@angular/common';


import { TaskDetailsModel } from '@alfresco/adf-process-services/task-list/models/task-details.model';
import { TaskListService } from '@alfresco/adf-process-services';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Observable } from 'rxjs';
import { Observer } from 'rxjs/Observer';


@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {

  appId: string = null;
  taskId: string = null;
  fileShowed: any = null;
  content: any = null;
  contentName: any = null;
  taskDetails: TaskDetailsModel;
  userDetails: any;
  assignDetails: any;
  clickMessage: any;
  hidePeopleSearch: boolean = false;
  updateTask: TaskDetailsModel;
  updateNotification: UpdateNotification;
  peopleSearch$: any;
  private peopleSearchObserver: any;
  
  constructor(private route: ActivatedRoute,
    private router: Router,
    formRenderingService: FormRenderingService,
    private location: Location,
    private preview: PreviewService,
    private taskService: TaskListService,
    private cardViewUpdateService: CardViewUpdateService,
    private peopleProcessService: PeopleProcessService) {
    formRenderingService.setComponentTypeResolver('testole_01',
      () => CustomEditorComponent, true);
      this.peopleSearch$=Observable.create(
        (observer:Observer<UserProcessModel[]>)=>
        {this.peopleSearchObserver = observer});
  
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.appId && params.appId !== '0') {
        this.appId = params.appId;
      }
      if (params.taskId) {
        this.taskId = params.taskId;
      }
    });

    this.cardViewUpdateService.itemClicked$.subscribe(this.respondTocardClick.bind(this));
    this.loadTaskDetails(this.taskId);
  }

  respondTocardClick(cn: ClickNotification) {
    this.hidePeopleSearch = true;
    this.clickMessage = cn.target.label + "was just clicked";
    console.log(this.clickMessage);
  
  }

  loadTaskDetails(taskId: string): void {
    this.taskService.getTaskDetails(taskId).subscribe(
      (res: TaskDetailsModel) => {
        this.taskDetails = res;
        console.log(this.taskDetails);
      });

  }

  onContentClick(content: any): void {
    if (content.contentBlob) {
      this.preview.showBlob(content.name, content.contentBlob);
    } else {
      this.preview.showResource(content.sourceId.split(';')[0]);
    }
  }
  searchUser(searchedWord: string) {
    this.peopleProcessService.getWorkflowUsers(null, searchedWord)
    .subscribe((users)=>
    {
      if(this.taskDetails.assignee!==null){
        users=users.filter((user)=>user.id!== this.taskDetails.assignee.id);
        this.peopleSearchObserver.next(users);
      }
    });
  }

  onCloseSearch(){
    this.hidePeopleSearch=false;
  }

  assignTaskToUser(selectedUser:UserProcessModel){
    this.taskService.assignTask(this.taskDetails.id,selectedUser).subscribe(
      (res:any)=>{
        this.taskDetails=res;
      }
    );
    this.hidePeopleSearch=false;
  }
}
