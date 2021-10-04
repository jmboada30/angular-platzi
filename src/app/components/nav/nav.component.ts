import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  showMenu = false;
  counter = 0;
  constructor(private storeSvc: StoreService) {}

  ngOnInit(): void {
    this.storeSvc.myCart$.subscribe((products) => {
      this.counter = products.length;
    });
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
}
