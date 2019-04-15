import { Component,Output,EventEmitter, OnInit } from '@angular/core';
import { AuthenticationService } from '@alfresco/adf-core';
import { Router, ActivatedRoute } from '@angular/router';
import { Action } from 'rxjs/internal/scheduler/Action';
import {FormControl} from '@angular/forms';
import {TooltipPosition} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent implements OnInit {
  appId:string='0';

  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  constructor(private authService:AuthenticationService,
              private router:Router,private route:ActivatedRoute){
                console.log(this.route);

  }

  ngOnInit(){
    this.route.params.subscribe((params) => {
      this.appId = params['appId'];
     });
  }
  

  onClickSignout(){
    this.onLogout();
  }

  onLogout():void {
    this.authService.logout().subscribe(()=>{this.navigateToLogin()})
    
  }
  navigateToLogin(): void {
    this.router.navigate(['/login']);
   
  }
  
}

