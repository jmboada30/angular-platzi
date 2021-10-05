import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss'],
})
export class ImgComponent {
  img: string = 'img';
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('img') set changeImg(img: string) {
    this.img = img;
  }
  @Input() alt: string = '';

  @Output() loaded = new EventEmitter<string>();
  imgDefault: string = 'https://www.m2crowd.com/core/i/placeholder.png';

  constructor() {}

  imgError() {
    this.img = this.imgDefault;
  }

  imgLoaded() {
    this.loaded.emit(this.img);
  }
}
