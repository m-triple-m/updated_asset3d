import { Component,Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AssetService } from '../../services/asset.service';
import { SellerService } from '../../services/seller.service';

@Component({
  selector: 'app-add-asset',
  templateUrl: './add-asset.component.html',
  styleUrls: ['./add-asset.component.css']
})
export class AddAssetComponent implements OnInit {
  form;
  currentuser;
  image;
  filename;
  uploaded;
  imgURL;
  message;
  constructor(private assetService: AssetService, private fb:FormBuilder, private router: Router, private sellerService: SellerService) { }
  ngOnInit(): void {
    
    this.currentuser=JSON.parse(sessionStorage.getItem('user'));
    document.body.classList.add('bg-reg');
    this.initUser();
  }

  ngOnDestroy(){
    document.body.classList.remove('bg-reg');
  }
  initUser(){
    this.form=this.fb.group({
      name:['',Validators.required],
      price:['',Validators.required],
      compatibility:['',Validators.required],
      imageformat:['',Validators.required],
      vertices:['',Validators.required],
      triangles:['',Validators.required],
      textures:['',Validators.required],
      category:['',Validators.required],
      created:new Date(),
      seller:this.currentuser._id
    })
  }
  
  submitRegister(info){
    // if(this.form.invalid){
    //   Swal.fire(
    //     'Error!',
    //     'Please the form properly',
    //     'error'
    //   )
    // }else{
      info.imgname=this.image;
      info.zipname=this.filename;
      console.log(info);
      console.log(this.form.value);
      this.assetService.addAsset(info).subscribe ((data)=>{
        console.log(data);
        Swal.fire({
          icon:'success',
          title:'Success',
          timer:1000,
          timerProgressBar: true,
          text:'Asset Uploaded Successfully !!'
        })
      })
    // }
  } 


    uploadImage(event)
  {
    let files = event.target.files;
    if(files.length===0)
      return;
 
    var mimeType=files[0].type;
    if(mimeType.match(/image\/*/)==null)
    { 
      Swal.fire("Images Only");
      return;
    }
    this.preview(event.target.files)
    let formData=new FormData();
    let selectedFile = files[0];
    this.image = selectedFile.name;

    formData.append('image',  selectedFile,  selectedFile.name);
    this.assetService.uploadImage(formData).subscribe(response=>
      {
      console.log(response['message'])
      })
  }
  uploadFile(event)
  {
    let files = event.target.files;
    if(files.length===0)
      return;
 
    
    let formData=new FormData();
    let selectedFile=files[0];
    this.filename= selectedFile.name;
    formData.append('file',  selectedFile,  selectedFile.name);
    this.assetService.uploadFile(formData).subscribe(response=>
      {
      console.log(response['message'])
      this.uploaded = true;
      })
  }
preview(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => { 
      this.imgURL = reader.result;
    }
  }
}
