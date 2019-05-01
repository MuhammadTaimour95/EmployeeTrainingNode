import { Component, EventEmitter ,Output} from '@angular/core';

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
  
})
export class PostCreateComponent {
    newPost = "";
    enteredContent="";
    enteredTitle="";
   onAddPost()
    {
        
       const post = {title: this.enteredTitle , content: this.enteredContent };
      
    }
}