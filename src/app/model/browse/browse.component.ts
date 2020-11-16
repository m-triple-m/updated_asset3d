import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AssetService } from '../../services/asset.service';



@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {

 
currentUser;
assets;
loading = true;

  constructor( private router: Router, private assetService: AssetService) { }

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
    this.assetService.getAllAsset().subscribe(data=>{
    this.assets=data;
    console.log(this.assets);
    this.loading = false;
    })
  }
}

