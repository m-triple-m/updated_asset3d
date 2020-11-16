import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import { AssetService } from '../../services/asset.service';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-manage-model',
  templateUrl: './manage-model.component.html',
  styleUrls: ['./manage-model.component.css']
})
export class ManageModelComponent implements OnInit {

  currentUser;
 assets;
  // loadingmodels = true;

  constructor(private userService: UserServiceService, private router: Router, private assetService: AssetService) { }

  ngOnInit(): void {
    this.currentUser=JSON.parse(sessionStorage.getItem("seller"));
    console.log(this.currentUser);
    document.body.classList.add('bg-reg');
    //this.initUser(this.currentuser);
    this.assetDetails();
  }
  ngOnDestroy(){
    document.body.classList.remove('bg-reg');
  }
  assetDetails(){
    this.assetService.getAssetBySeller(this.currentUser._id).subscribe(data=>{
    this.assets=data;
    console.log("Hello");
    console.log(this.assets);
    })
  }
  updateAsset(info){
    console.log("it works");
  }
  
  deleteModel(id){

    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete this 3D Model!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      
      if (result.isConfirmed) {
        this.assetService.deleteAsset(id).subscribe(data => {
          console.log(data);
          this.assetDetails();
          Swal.fire(
            'Deleted!',
            'Your Model has been deleted.',
            'success'
          )
        })
      }
    })
  }

}
