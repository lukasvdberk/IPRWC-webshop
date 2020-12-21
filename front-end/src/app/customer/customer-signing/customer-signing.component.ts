import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-customer-signing',
  templateUrl: './customer-signing.component.html',
  styleUrls: ['./customer-signing.component.css']
})
export class CustomerSigningComponent implements OnInit {
  redirectUrl = '/'

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.redirectUrl = params['redirectUrl'];
    });
  }

  onSigning() {
    this.router.navigateByUrl(this.redirectUrl)
  }
}
