import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'employeesTraining';
  posts =[];

  onPostAdded(post){
    this.posts.push(post);
  }

}
