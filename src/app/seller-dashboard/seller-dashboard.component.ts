import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NbMenuItem, NbSidebarService } from '@nebular/theme';
import Swal from 'sweetalert2';
import { SellerService } from '../services/seller.service';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-seller-dashboard',
  templateUrl: './seller-dashboard.component.html',
  styleUrls: ['./seller-dashboard.component.css']
})
export class SellerDashboardComponent implements OnInit {

  users;
  @Input('userdata') currentuser;
  showeditform=false;
  showprofile=true;
  editform;

  items: NbMenuItem[] = [
    {
      title: 'Profile',
      icon: 'person-outline',
      link: 'profile'
    },
    {
      title: 'Manage 3D Models',
      icon: 'edit-2-outline',
      link: 'manageModel'
    },
    {
      title: 'Add new 3D Model',
      icon: 'plus-circle-outline',
      link: 'addAsset'
    },
  ];


  constructor(public userservice: UserServiceService, private sellerservice:SellerService, private fb:FormBuilder, private router: Router, private sidebarservice: NbSidebarService) { }

  ngOnInit(): void {
    
    this.currentuser=JSON.parse(sessionStorage.getItem('user'));
    document.body.classList.add('bg-reg');
    this.initUser(this.currentuser);
  }

  ngOnDestroy(){
    document.body.classList.remove('bg-reg');
  }
  initUser(user){
    this.editform=this.fb.group(user);
  }
  submitRegister(data){
    console.log(this.editform.value);
    this.sellerservice.updateUser(this.editform.value._id, data).subscribe ((data)=>{
      console.log(data);
      Swal.fire({
        icon:'success',
        title:'Success',
        timer:1000,
        timerProgressBar: true,
        text:'Changes updated !!'
      })
      this.showprofile=true;
      this.showeditform=false;
      sessionStorage.setItem('user',JSON.stringify(data));
      this.router.navigate(['/userdb']);
    })
    }
  updateUser(user){
    this.showeditform=true;
    this.showprofile=false;
    this.initUser(user);
    
  }

  toggleCompact() {
    this.sidebarservice.toggle(true, 'right');
  }
}