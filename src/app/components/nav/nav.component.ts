import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  showMenu = false;
  counter = 0;
  profile: User | null = null;

  constructor(private storeSvc: StoreService, private authSvc: AuthService) {}

  ngOnInit(): void {
    this.storeSvc.myCart$.subscribe((products) => {
      this.counter = products.length;
    });
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  loginAndGetProfile() {
    this.authSvc
      .loginAndGetProfile('jboada@gmail.com', '1212')
      .subscribe((profile) => {
        this.profile = profile;
      });
  }
}
