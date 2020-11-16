import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  url='http://localhost:4000/seller';
loggedin=false;
  constructor(private http:HttpClient,private router:Router) {
    if(sessionStorage.getItem('seller'))
    {
      this.loggedin=true;
    }
   }


addUser(registrationdata){
  return this.http.post(this.url+'/add',registrationdata);
}

getAllSellers(){
  return this.http.get(this.url+'/getall');
}

getUser(){
  return this.http.get(this.url+'/getall');
} 

getuserbyUsername(name){
return this.http.get(this.url+'/getbyuname/'+name);
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
  this.router.navigate(['/login']);
} 
}

  