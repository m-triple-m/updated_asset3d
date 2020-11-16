import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';
import Swal from 'sweetalert2';
import { SellerService } from '../../services/seller.service';


@Component({
  selector: 'app-seller-login',
  templateUrl: './seller-login.component.html',
  styleUrls: ['./seller-login.component.css']
})
export class SellerLoginComponent implements OnInit {

  loginForm:FormGroup
  constructor(private fb : FormBuilder, private sellerservice: SellerService, private router:Router, private userservice: UserServiceService) { 
    this.loginForm=this.fb.group({
      name :['',[Validators.required]],
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
  let formdata=this.loginForm.value;
  console.log(formdata);
  //console.log(this.loginForm.controls.name.value);
  this.sellerservice.getuserbyUsername(formdata.name).subscribe(data=>{
    console.log(data);
    
    if(data){
      console.log('Welcome User..!');
      if(data['password'] == formdata['password']){
        console.log('log in success...!');
        console.log(data);
        
        sessionStorage.setItem('user',JSON.stringify(data));
        this.userservice.loggedin = true;
        this.sellerservice.loggedin=true;
        Swal.fire({
          icon:'success',
          title:'Success',
          timer:1000,
          timerProgressBar: true,
          text:'Successfully logged in'
        }) 
        this.router.navigate(['/sellerdb']);
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
