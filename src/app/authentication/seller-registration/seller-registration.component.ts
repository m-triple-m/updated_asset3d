import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SellerService } from '../../services/seller.service';

@Component({
  selector: 'app-seller-registration',
  templateUrl: './seller-registration.component.html',
  styleUrls: ['./seller-registration.component.css']
})
export class SellerRegistrationComponent implements OnInit {

  formdata;
  constructor(private fb: FormBuilder,private router:Router ,private sellerservice: SellerService,) { }

  ngOnInit(): void {
  
    document.body.classList.add('bg-reg');
    this.initRegister();
  }
  ngOnDestroy(){
    document.body.classList.remove('bg-reg');
  }

  initRegister(){
    this.formdata=this.fb.group({
      name:['',Validators.required],
      
      password:['',Validators.required],
      repassword:'',
      
      email:['',[Validators.required,Validators.email]],
      contactnum:['',Validators.required],
      
    },{validator : this.matchpassword('password','repassword')})
  }
  matchpassword(password, repassword)
  {   
    return (form) =>{
      let control1=form.controls[password];
      let control2= form.controls[repassword];

      if(control1.value !== control2.value){
        control2.setErrors({match :true})
      }
      else{
        control2.setErrors(null);
      }
    }
  }
  emailRequired(controlname){
    if(this.formdata.controls[controlname].errors){
      return this.formdata.controls[controlname].errors.required;
    }
    return false;
  }

  emailValid(controlname){
    if(this.formdata.controls[controlname].errors){
      return this.formdata.controls[controlname].errors.email;
    }
    return false;
  }

  submitRegister(data){
    if(this.formdata.invalid){
      alert('Please enter valid details');
      return;
    }
    console.log(data);
    this.sellerservice.addUser(this.formdata.value).subscribe((data)=>{
      console.log(data);
      Swal.fire({
        icon:'success',
        title:'Success',
        text:'You are  a registered member now !!'
      }).then(() => {
        this.router.navigate(['/app/sellerLogin']);
      })
    })
  }

}