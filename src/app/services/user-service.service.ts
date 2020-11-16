import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

//   constructor() { }
//
url='http://localhost:4000/user';
loggedin=false;
currentUser;
  constructor(private http:HttpClient,private router:Router) {
    if(sessionStorage.getItem('user'))
    {
      this.loggedin=true;
      this.currentUser = JSON.parse(sessionStorage.getItem('user'));
    }
   }


addUser(registrationdata){
  return this.http.post(this.url+'/add',registrationdata);
}
getUser(){
  return this.http.get(this.url+'/getall');
} 

getuserbyEmail(email){
return this.http.get(this.url+'/getbyemail/'+email);
}
deleteUser(id)
{
  return this.http.delete(this.url+'/deletebyid/'+id);
}
updateUser(id, data){
  return this.http.put(this.url+'/update/'+id,data);
}

logout(){
  this.loggedin=false;
  sessionStorage.removeItem('user');
  
Swal.fire({
    icon:'success',
    title:'Logout done',
    timer:1000,
      timerProgressBar: true,
    text:'Thanks!!'
  }) 
  this.router.navigate(['/app/login']);
} 
}
