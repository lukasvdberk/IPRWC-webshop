import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-admin-signing',
  templateUrl: './admin-signing.component.html',
  styleUrls: ['./admin-signing.component.css']
})
export class AdminSigningComponent implements OnInit {
  private redirectUrl = '/';
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.redirectUrl = params['redirectUrl'];
    });
  }

  onSigning() {
    this.router.navigateByUrl(this.redirectUrl).then(() => {
      // So the navigation bar is correctly updated
      window.location.reload();
    })
  }
}
