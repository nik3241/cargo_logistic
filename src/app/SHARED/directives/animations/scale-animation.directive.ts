import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[exscScaleAnimation]',
  standalone: true,
  host: {
    'class': "animation"
  }
})
export class ScaleAnimationDirective implements OnInit {

  constructor(
    private elem: ElementRef,
    private renderer: Renderer2,
  ) { }
  ngOnInit(): void {
    this.setStyle()
  }

  private setStyle() {
    const styles = `
    [exscScaleAnimation]:hover {
      box-shadow: 0 4px 4px 2px rgba(29, 79, 139, .3);
      transform: scale(1.01);
      transition: all 500ms ease-in-out;
    }
  `;

    const styleElement = this.renderer.createElement('style');
    this.renderer.appendChild(styleElement, this.renderer.createText(styles));
    this.renderer.appendChild(this.elem.nativeElement, styleElement);
  }
}
