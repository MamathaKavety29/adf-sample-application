import { Component, OnInit } from '@angular/core';
import { AuthGuard, AuthenticationService } from '@alfresco/adf-core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authService:AuthenticationService,
    private router:Router) { }

  ngOnInit() {
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
