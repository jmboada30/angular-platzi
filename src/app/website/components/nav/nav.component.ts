import { Component, OnInit } from '@angular/core';

import { StoreService } from '../../../core/services/store.service';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user.model';
import { CategoriesService } from '../../../core/services/categories.service';
import { Category } from '../../../core/models/category.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  activeMenu = false;
  counter = 0;
  profile: User | null = null;
  categories: Category[] = [];

  constructor(
    private storeSvc: StoreService,
    private authSvc: AuthService,
    private categoriesSvc: CategoriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.storeSvc.myCart$.subscribe(
      (products) => (this.counter = products.length)
    );
    this.authSvc.user$.subscribe((user) => (this.profile = user));
    this.getAllCategories();
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login() {
    this.authSvc.loginAndGet('admin@mail.com', 'admin123').subscribe((_) => {
      this.router.navigate(['/profile']);
    });
  }

  getAllCategories() {
    this.categoriesSvc
      .getAll()
      .subscribe((categories) => (this.categories = categories));
  }

  logout() {
    this.authSvc.logout();
    this.profile = null;
    this.router.navigate(['/home']);
  }
}
