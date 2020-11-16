import { Component, OnInit } from '@angular/core';
import { NbMenuItem, NbSidebarService } from '@nebular/theme';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {


  constructor(private sidebarservice: NbSidebarService, public userservice: UserServiceService) { }

  ngOnInit(): void {
  }

  toggleCompact() {
    this.sidebarservice.toggle(true, 'right');
  }

}
