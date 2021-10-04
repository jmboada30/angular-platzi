import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  // con Host Listener escucho cualquier evento del Element que tenga la directiva
  @HostListener('mouseenter') onMouseEnter() {
    this.element.nativeElement.style.backgroundColor = 'red';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.element.nativeElement.style.backgroundColor = '';
  }
  constructor(private element: ElementRef) {
    // this.element.nativeElement.style.backgroundColor = 'red';
  }
}
