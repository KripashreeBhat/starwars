import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../dataservice.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-starship',
  templateUrl: './starship.component.html',
  styleUrls: ['./starship.component.css']
})
export class StarshipComponent implements OnInit {

  list = true;
  details = false;
  // array =['DARTH VADER','LUKE SKYWALKER','OBI-WAN KENOBI','YODA']
  // userSubs !: Subscription;
  userSubs : any;
  users : any[] = [];
  people :any;
  nextdata:any;
  name:any;
  disableprevious = true;
  disablenext = false;
  indexno=0;
  loading=true;
  notloading=false;
  constructor(private data: DataserviceService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    sessionStorage.removeItem('character');
    sessionStorage.removeItem('planet');
    sessionStorage.removeItem('vehicles');
    sessionStorage.removeItem('species');
    sessionStorage.removeItem('films');
     
    if( sessionStorage.getItem('starship')){
      this.loading = false;
      this.notloading = true;
      this.people = JSON.parse((sessionStorage.getItem('starship')) as any)
    }
    else{
      this.loading = false;
      this.notloading = true;
    
    let url = ' https://swapi.dev/api/starships/'
    this.userSubs = this.data.getPeople(url).subscribe({
      next:(users)=> {
        console.log(users);
        
        this.people = users;
        // this.people = this.people['results']

      },
      complete:()=> console.log('request fetched'),
      error:(err)=> console.log(err),
    });
  }
    // console.log(this.users);
    
  }
// getdetail(){
//   let url = 'https://swapi.dev/api/people/'
//     this.userSubs = this.data.getPeople(url).subscribe({
//       next:(users)=> console.log('data reciceved',users),
//       complete:()=> console.log('request fetched'),
//       error:(err)=> console.log(err),
//       });
      
      
// }
  
display(){
  this.details = true;
  this.list = false;
}
displist(){
  this.details = false;
  this.list = true;
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
    sessionStorage.setItem('starship',JSON.stringify(this.people))
    }
    else{
      this.disableprevious = true;
      this.disablenext = false;
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
    sessionStorage.setItem('starship',JSON.stringify(this.people))
    }
    else{
      this.disableprevious = false;
      this.disablenext = true;
    } 
  })
}
 storename(name:any){
 console.log(name);
 localStorage.setItem('details',JSON.stringify(name))
 this.router.navigate(['starshipdetail'], {relativeTo:this.route});
 this.list = false;
 this.details = true;
 this.indexno +=1
 localStorage.setItem('indexno',JSON.stringify(this.indexno));
 
 } 
 displaychild(){
  this.list = true;
  this.details = false;
  
} 
 
}
