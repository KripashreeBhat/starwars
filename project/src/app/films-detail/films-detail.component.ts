import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataserviceService } from '../dataservice.service';
@Component({
  selector: 'app-films-detail',
  templateUrl: './films-detail.component.html',
  styleUrls: ['./films-detail.component.css']
})
export class FilmsDetailComponent implements OnInit {

  details :any;
  info:any;
  userSubs :any;
  list:any;
  // imageno=0;
  imageno:any;
  url:any;
  subscriptions: any = {};
  constructor(public service: DataserviceService) { 
    // this.subscriptions.data = this.service.getImg().subscribe(list => {
    //   console.log(list);
    //   this.list = list;
    // });
  }
 
  // ngOnDestroy(){
  //   // Object.keys(this.subscriptions).forEach(key => this.subscriptions[key].unsubscribe());
  // }

  ngOnInit(): void {
    this.getdetails();
    // Object.keys(this.subscriptions).forEach(key => this.subscriptions[key].unsubscribe());
   
  
}
getdetails(){
  this.details = JSON.parse(localStorage.getItem('details')as any);
  console.log(this.details);
  this.imageno=localStorage.getItem('indexno');
 this.url = `https://picsum.photos/500/300?random=${this.imageno+1}`;
//  this.imageno +=1;
  // console.log(this.details['name']);
}

}
