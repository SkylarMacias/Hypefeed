import { Component, OnInit } from '@angular/core';
import { HttpService } from '.././http.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  constructor(private _httpService: HttpService){ }
  
  posts = [];
  successCount = 0;

  ngOnInit(){
    console.log("ngOnInit");
    this.getPosts().then(() => {this.bubbleSortPosts()});

  }

  getPosts(){
    console.log("getPosts");
    
    return new Promise((resolve, reject) => {
      this._httpService.getKith().subscribe(data => {
        
          this.pushDataToPosts(data);
      })
      
      this._httpService.getNike().subscribe(data => {
        
        this.pushDataToPosts(data);
      })
      
      this._httpService.getTheHundreds().subscribe(data => {
        
        this.pushDataToPosts(data);
      }) 
  
      this._httpService.getBape().subscribe(data => {
        
        this.pushDataToPosts(data);
      })
      
      this._httpService.getEnd().subscribe(data => {
        
        this.pushDataToPosts(data);
      })
  
      this._httpService.getAdidas().subscribe(data => {
        
        this.pushDataToPosts(data);
      })
      if(this.successCount == 6){
        resolve();
      }
    })
  }

  // Functions //

  pushDataToPosts = function (data) {
    console.log("data:", data);
    for(let i = 0; i<data['data'].length; i++){
      this.posts.push(data['data'][i]);
      console.log(data);
    }
    this.successCount++;
    this.bubbleSortPosts();
  }

  bubbleSortPosts = function() {
    var len = this.posts.length;
    
    for (var i = 0; i < len ; i++) {
      for(var j = 0 ; j < len - i - 1; j++){
        if (this.posts[j].dateInt < this.posts[j + 1].dateInt) {

          var temp = this.posts[j];
          this.posts[j] = this.posts[j+1];
          this.posts[j + 1] = temp;
        }
      }
    }
  }
}
