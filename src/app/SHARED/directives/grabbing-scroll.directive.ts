import { Directive, ElementRef, HostBinding, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[exscGrabbingScroll]',
  standalone: true,
  host: {
    '[style.overflow]': '"auto"',
    'class': 'exscGrabbingScroll'
  }
})
export class GrabbingScrollDirective implements OnInit {
  private pos = { top: 0, left: 0, x: 0, y: 0 };
  @HostBinding('style.cursor') cursor: string = 'grab';
  @HostBinding('style.userSelect') userSelect: string = 'none';
  @HostBinding('scrollLeft') scrollLeft!: number;
  @HostBinding('scrollTop') scrollTop!: number;
  boundMouseMoveHandler: (e: MouseEvent) => void;
  boundMouseUpHandler: (e: MouseEvent) => void;

  constructor(
    // private elem: ElementRef
    private elem: ElementRef,
    private renderer: Renderer2,
  ) {
    this.boundMouseMoveHandler = this.onMouseMoveHandler.bind(this);
    this.boundMouseUpHandler = this.onMouseUpHandler.bind(this);


  }
  ngOnInit(): void {

    this.setStyle()
  }

  private setStyle() {
    const styles = `
    [exscGrabbingScroll]::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }
    [exscGrabbingScroll]::-webkit-scrollbar-track {
      background:rgba(241, 241, 241, 0.28);
      border-radius: 10px;
    }
    [exscGrabbingScroll]::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 10px;
    }
    [exscGrabbingScroll]::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  `;

    const styleElement = this.renderer.createElement('style');
    this.renderer.appendChild(styleElement, this.renderer.createText(styles));
    this.renderer.appendChild(this.elem.nativeElement, styleElement);

  }


  @HostListener('mousedown', ['$event']) onMouseDownHandler(e: MouseEvent) {
    console.log(e, this)
    // e.stopPropagation();
    this.cursor = "grabbing";
    this.userSelect = "none";

    this.pos = {
      // left: this.scrollLeft,
      // top: this.scrollTop,
      left: this.elem.nativeElement.scrollLeft,
      top: this.elem.nativeElement.scrollTop,
      // Get the current mouse position
      x: e.clientX,
      y: e.clientY
    };

    document.addEventListener("mousemove", this.boundMouseMoveHandler);
    document.addEventListener("mouseup", this.boundMouseUpHandler);
  }

  private onMouseMoveHandler(e: MouseEvent) {

    console.log(e, this.pos)
    const dx = e.clientX - this.pos.x;
    const dy = e.clientY - this.pos.y;

    // Scroll the element
    // this.scrollLeft = this.pos.left - dx;
    // this.scrollTop = this.pos.top - dy;
    this.renderer.setProperty(this.elem.nativeElement, 'scrollLeft', this.pos.left - dx);
    this.renderer.setProperty(this.elem.nativeElement, 'scrollTop', this.pos.top - dy);
  }

  private onMouseUpHandler(e: MouseEvent) {
    console.log(e, this)
    this.cursor = "grab";
    this.userSelect = 'auto';

    document.removeEventListener("mousemove", this.boundMouseMoveHandler);
    document.removeEventListener("mouseup", this.boundMouseUpHandler);
    // this.pos = { top: 0, left: 0, x: 0, y: 0 }
  }
}
