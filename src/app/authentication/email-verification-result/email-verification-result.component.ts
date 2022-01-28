import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-email-verification-result',
  templateUrl: './email-verification-result.component.html',
  styleUrls: ['./email-verification-result.component.css']
})
export class EmailVerificationResultComponent implements OnInit {
  message : string = "";
  constructor(private ar : ActivatedRoute) { }

  ngOnInit(): void {
    this.message = this.ar.snapshot.queryParamMap.get('message') as string;
    const status = this.ar.snapshot.paramMap.get('status');
  }

}
