import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../dataservice.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.css']
})
export class PlanetComponent implements OnInit {
  list = true;
  details = false;
 indexno=0;
  // array =['DARTH VADER','LUKE SKYWALKER','OBI-WAN KENOBI','YODA']
  // userSubs !: Subscription;
  userSubs : any;
  users : any[] = [];
  people :any;
  nextdata:any;
  name:any;
  disableprevious = true;
  disablenext = false;
  loading=true;
  notloading=false;
  constructor(private data: DataserviceService,  private route: ActivatedRoute, private router: Router ) { }

  ngOnInit(): void {
    sessionStorage.removeItem('character');
    sessionStorage.removeItem('species');
    sessionStorage.removeItem('starship');
    sessionStorage.removeItem('vehicles');
    sessionStorage.removeItem('films');
    // this.disableprevious = true;
    if( sessionStorage.getItem('planet')){
      this.people = JSON.parse((sessionStorage.getItem('planet')) as any)
      this.loading = false;
      this.notloading = true;
    }
    else {
    let url = 'https://swapi.dev/api/planets/'
    this.userSubs = this.data.getPeople(url).subscribe({
      next:(users)=> {
        console.log(users);
        this.loading = false;
        this.notloading = true;
        this.people = users;
        // this.people = this.people['results']

      },
      complete:()=> console.log('request fetched'),
      error:(err)=> console.log(err),
    });
  }
    // console.log(this.users);
    
  }


previous(){
  this.loading = true;
  this.notloading = false;
  this.data.getPeople(this.people?.previous).subscribe(data=>{
    this.people = data;  
    this.loading = false;
    this.notloading = true;
    if(this.people?.previous){
      this.disableprevious = false;
      this.disablenext = false;
      sessionStorage.setItem('planet',JSON.stringify(this.people)) ;
      console.log(this.people?.previous);
      
    }
    else{
      this.disableprevious = true;
      this.disablenext = false;
      console.log(this.people?.previous);
    }
  })
}
next(){
  this.loading = true;
  this.notloading = false;
  this.data.getPeople(this.people?.next).subscribe(data=>{
    this.people = data; 
    this.loading = false;
    this.notloading = true;
    if(this.people?.next){
      this.disableprevious = false;
      this.disablenext = false;
      sessionStorage.setItem('planet',JSON.stringify(this.people)) 
    }
    else{
      this.disableprevious = false;
      this.disablenext = true;
      console.log(this.people?.next);
      
    }
   
  })
}
 storename(name:any){
 console.log(name);
 this.indexno +=1
 localStorage.setItem('indexno',JSON.stringify(this.indexno));
 localStorage.setItem('details',JSON.stringify(name));
 this.router.navigate(['planetdetail'], {relativeTo:this.route});
 this.list = false;
 this.details = true;
 
 } 
  
 displaychild(){
  this.list = true;
  this.details = false;
  
}

}
