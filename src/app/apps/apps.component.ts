import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppDefinitionRepresentationModel } from '@alfresco/adf-process-services';

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.css']
})
export class AppsComponent {
 appId:string;
  constructor(private router: Router,
    private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
    const applicationId = params['appId'];
    if (applicationId && applicationId !== '0') {
    this.appId = params['appId'];
    }
    });
    }

  onAppClicked(app: AppDefinitionRepresentationModel) 
  {
    console.log(app.id);
    this.router.navigate(['/apps', app.id || 0, 'tasks']);
  }

}
