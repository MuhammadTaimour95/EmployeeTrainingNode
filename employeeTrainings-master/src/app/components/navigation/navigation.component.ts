import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isLoggedIn = false;
  showList = false;
  constructor(private router: Router) { }

  ngOnInit() {
  }
  logoutUser(){
    //logout
  }
  routeTo(path){
    this.router.navigate([`${path}`]);
  }

}
