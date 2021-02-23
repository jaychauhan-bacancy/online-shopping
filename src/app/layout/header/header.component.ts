import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { authService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  public isAunthenticated : boolean=false;
  constructor(private authService:authService) { }

  ngOnInit(): void {
    this.userSub = this.authService.userSub.subscribe(user=>{
      this.isAunthenticated=!!user;
    });
  }

  ngOnDestroy():void{
    this.userSub.unsubscribe();
  }

  public onLogout(){
    this.authService.logout();
    this.isAunthenticated=false;
    // this.router.navigateByUrl('/');
  }
}
