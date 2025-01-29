import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'voitureCarburantColor'
})
export class VoitureCarburantColorPipe implements PipeTransform {

  transform(type:string): string {
    let color: string;
    switch (type) {
      case 'essence' :
        color = 'blue lighten-3';
        break;
      default:
        color = '#eeeeee grey lighten-3';
        break;

    }
    return 'chip ' + color;
  }

}
