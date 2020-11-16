import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import Swal from 'sweetalert2';
import { UserServiceService } from '../../services/user-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;

  constructor(private fb : FormBuilder, private userService:UserServiceService, private router:Router) { 
    this.loginForm=this.fb.group({
      email :['',[Validators.required]],
      password :['',[Validators.required]]
  })
  }

  ngOnInit(): void {
    document.body.classList.add('bg-reg');
  }
  ngOnDestroy(){
    document.body.classList.remove('bg-reg');
  }
submitLogin()
{

  if(this.loginForm.invalid){
    alert('invalid form');
    return;
  }

  let formdata=this.loginForm.value;
  console.log(formdata);
 
  this.userService.getuserbyEmail(formdata.email).subscribe(data=>{
    console.log(data);
    
    if(data){
      console.log('Welcome User..!');
      if(data['password'] == formdata['password']){
        console.log('log in success...!');
        
        sessionStorage.setItem('user',JSON.stringify(data));
        this.userService.currentUser = data;
        this.userService.loggedin=true;
        Swal.fire({
          icon:'success',
          title:'Success',
          timer:1000,
          timerProgressBar: true,
          text:'Successfully logged in'
        }) 
        this.router.navigate(['/user']);
      }
      else{
        console.log('unknown user');
        Swal.fire({
          icon : "error",
          title : "Login fail",
          timer:2000,
          timerProgressBar: true,
          text :"Please enter correct username / password"
        })
      }
    }else{
      console.log('unknown user');
      Swal.fire({
        icon : "error",
        title : "Login fail",
        timer:2000,
        timerProgressBar: true,
        text :"Please enter correct username / password"
      })
    }
    
  })
 }
}
