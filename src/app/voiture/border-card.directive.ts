import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appBorderCard]'
})
export class BorderCardDirective {

  private initialColor: string = '#f5f5f5';
  private defaultColor: string = '#009688';
  private defaultHeight: number = 180;

  constructor(private el:ElementRef) {
    this.setBorder("#f5f5f5");
    this.setHeight(this.defaultHeight); 

  }

  setBorder(borderColor :string){
    this.el.nativeElement.style.border = `solid 4px ${borderColor}`; 
  }
  setHeight(height: number) {
    this.el.nativeElement.style.height = `${height}px`;
  }

  @Input('appBorderCard') borderColor : string;

  @HostListener('mouseenter') onMouseEnter() {
    this.setBorder(this.borderColor || this.defaultColor);
  }
  
  @HostListener('mouseleave') onMouseLeave() {
    this.setBorder(this.initialColor);
  }


}
