import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss'],
})
export class ImgComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  img: string = 'img';

  // usando el "set" de Ts podemos detectar cuando cambie este @Input
  // y ejecutar cualquie codigo en respuesta a este evento.

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('img') set changeImg(img: string) {
    this.img = img;
    console.log('change img', img);
  }
  @Input() alt: string = '';

  @Output() loaded = new EventEmitter<string>();
  imgDefault: string = 'https://www.m2crowd.com/core/i/placeholder.png';
  // counter: number = 0;
  // counterFn: number | undefined;

  constructor() {
    // Before render
    // Nunca correr codigo asyncrono aqui
    // Solo corre una vez
    console.log('constructor', 'imgValue =>', this.img);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Before and during render
    // escucha los cambios de los @input
    // corre muchas veces
    console.log('ngOnChanges =>', changes);
  }

  ngOnInit(): void {
    // Before render
    // corre una vez
    // Permitido llamar cosas asyncronas
    console.log('ngOnInit', 'imgValue =>', this.img);

    // this.counterFn = window.setInterval(() => {
    //   ++this.counter;
    //   console.log('counter :>> ', this.counter);
    // }, 1000);
  }

  ngAfterViewInit(): void {
    // After render
    // normalmente nos ayuda a manejar los hijos de este componente
    // Las directivas se corren aqui
    console.log('ngAfterViewInit');
  }

  ngOnDestroy(): void {
    //  delete component
    console.log('ngOnDestroy');

    // Siempre debemos limpiar procesos que se esten ejecutando en segundo plano
    // Usamos el OnDestroy para eso
    // window.clearInterval(this.counterFn);
  }

  imgError() {
    this.img = this.imgDefault;
  }

  imgLoaded() {
    this.loaded.emit(this.img);
  }
}
