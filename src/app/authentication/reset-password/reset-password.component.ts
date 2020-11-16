import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor() { }

 
    ngOnInit(): void {
      document.body.classList.add('bg-reg');
    }
    ngOnDestroy(){
      document.body.classList.remove('bg-reg');
    }
  }

