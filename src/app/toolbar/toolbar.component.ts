import { Component, OnInit } from '@angular/core';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { map } from 'rxjs/operators';
import { AppDefinitionRepresentation } from '@alfresco/js-api';
import { ActivatedRoute, Router } from '@angular/router';
import { AppsProcessService } from '@alfresco/adf-core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  
  static TASKS = 'tasks'
  subtitle: string;
  
  
  appId: number;
  
  applicationName: any;
  subName: string;

  constructor(private route:ActivatedRoute,
    private router:Router,
    private appProcessServices:AppsProcessService) {
      console.log(this.route.snapshot.url[2].path);
     }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const applicationId = params['appId'];
      if (applicationId && applicationId !== '0') {
          this.appId = params['appId'];
      }
    this.subName=this.route.snapshot.url[2].path;
    });
    console.log("subName:", this.subName)
    console.log(this.route);
    this.loadAppDetails(this.appId);
    this.nameSubtitles(this.subName);
  }
    
  loadAppDetails(appId: number) {
    console.log(appId);
    if (appId) {
      this.appProcessServices.getApplicationDetailsById(+appId).pipe(
        map((res: any) => {
        return res.name;
      })
      ).subscribe((appName) => {
        this.applicationName=appName
      });
        }
  }
  nameSubtitles(subName:string){
   
    if(subName === 'tasks') 
    {
      this.subtitle  = 'Tasks';
    }
    else if(this.appId===0 || this.subName==='task')
    {
      this.applicationName="Apps";
      this.subtitle="TasksDetails";
    }
    else {
      this.applicationName="Process"
      this.subtitle  = 'ProcessessDetails';
    } 
    

 }

  }

  
  




