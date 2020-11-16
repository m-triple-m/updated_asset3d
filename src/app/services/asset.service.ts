import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

url='http://localhost:4000/asset';

  constructor(private http:HttpClient) {
  }

getAssetByid(id){
  console.log(id);
  return this.http.get(this.url+'/getbyassetid/'+id);
}


addAsset(registrationdata){
  console.log(registrationdata);
  //console.log(JSON.parse(registrationdata));
  return this.http.post(this.url+'/addasset',registrationdata);
}
getAsset(){
  return this.http.get(this.url+'/getasset');
} 

getAssetbyAssetname(username){
return this.http.get(this.url+'/getbyassetname/'+username);
}
deleteAsset(id)
{
  return this.http.delete(this.url+'/deletebyassetid/'+id);
}
updateAsset(id, data){
  return this.http.put(this.url+'/updatebyassetid/'+id,data);
}
getAllAsset(){
  return this.http.get(this.url+'/getall');
}

getAssetBySeller(id){
  return this.http.get(this.url+'/getbyseller/'+id);
}
uploadImage(file)
  {
  return this.http.post(this.url+'/addimg',file)
  }

  uploadFile(file)
  {
  return this.http.post(this.url+'/addfile',file)
  }
}

