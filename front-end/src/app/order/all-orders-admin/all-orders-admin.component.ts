import { Component, OnInit } from '@angular/core';
import {Order} from "../order";

@Component({
  selector: 'app-all-orders-admin',
  templateUrl: './all-orders-admin.component.html',
  styleUrls: ['./all-orders-admin.component.css']
})
export class AllOrdersAdminComponent implements OnInit {
  orders: Order[] | undefined

  constructor() { }

  ngOnInit(): void {

  }

}
