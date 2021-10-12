import { Component, OnInit } from '@angular/core';

import { UsersService } from './core/services/users.service';
import { FilesService } from './core/services/files.service';
import { AuthService } from './core/services/auth.service';
import { TokenService } from './core/services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  imgRta = '';

  constructor(
    private usersSvc: UsersService,
    private filesSvc: FilesService,
    private authSvc: AuthService,
    private tokenSvc: TokenService
  ) {}

  ngOnInit(): void {
    const token = this.tokenSvc.getToken();
    if (token) this.authSvc.getProfile().subscribe();
  }

  createUser() {
    this.usersSvc
      .create({
        name: 'Sebas',
        email: 'sebas@mail.com',
        password: '1212',
        role: 'customer',
      })
      .subscribe((rta) => {
        console.log(rta);
      });
  }

  downloadPdf() {
    this.filesSvc
      .getFile(
        'my.pdf',
        'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf',
        'application/pdf'
      )
      .subscribe();
  }

  onUpload(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (file) {
      this.filesSvc.uploadFile(file).subscribe((rta) => {
        this.imgRta = rta.location;
      });
    }
  }
}
