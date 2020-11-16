import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssetService } from '../../services/asset.service';

@Component({
  selector: 'app-model-details',
  templateUrl: './model-details.component.html',
  styleUrls: ['./model-details.component.css']
})
export class ModelDetailsComponent implements OnInit {

  model_data;
  constructor(private activated: ActivatedRoute, private assetservice: AssetService) { }

  ngOnInit(): void {

    let model_id = this.activated.snapshot.paramMap.get('id');
    this.assetservice.getAssetByid(model_id).subscribe(data => {
      console.log(data);
      this.model_data = data;
    })

  }

}
