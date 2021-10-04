import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vocales',
})
export class VocalesPipe implements PipeTransform {
  // RETO: Reemplazar cada vocal recibiada por un otra cosa,
  // es decir: a = @; e = 3 ; i = 1 ; o = 0 ; u = |_|
  transform(value: string): string {
    let newString = value.replace(/a/gi, '@');
    newString = newString.replace(/e/gi, '3');
    newString = newString.replace(/i/gi, '1');
    newString = newString.replace(/o/gi, '0');
    newString = newString.replace(/u/gi, '|_|');
    return newString;
  }
}
