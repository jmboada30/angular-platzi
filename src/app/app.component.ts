import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { FilesService } from './services/files.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  imgParent: string = 'https://www.w3schools.com/howto/img_avatar.png';
  showImg: boolean = true;
  imgUploaded: string = '';

  constructor(private userSvc: UserService, private fileSvc: FilesService) {}

  onLoaded(img: string) {
    console.log('Log padre', img);
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }

  createUser() {
    this.userSvc
      .create({
        name: 'Joel',
        email: 'jboada@gmail.com',
        password: '1212',
      })
      .subscribe(console.log);
  }

  downloadPDF() {
    this.fileSvc
      .getFile(
        'mipdf',
        'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf',
        'application/pdf'
      )
      .subscribe();
  }

  uploadFile(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element?.files?.item(0);

    if (!file) return;

    this.fileSvc
      .uploadFile(file)
      .subscribe((rta) => (this.imgUploaded = rta.location));
  }
}
