import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  appId:string;
  constructor(private router:Router,
    private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const applicationId = params['appId'];
      if (applicationId && applicationId !== '0') {
          this.appId = params['appId'];
      }
    });
  }

  onTask()  {
    this.router.navigate(['/apps', this.appId, 'tasks']);
  }

  onProcess() {
    this.router.navigate(['/apps', this.appId, 'process']);
  }
}
