import { Directive, ElementRef, AfterViewChecked, Input } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

@Directive({
  selector: '[appEllipsis]'
})
export class EllipsisDirective implements AfterViewChecked {
  @Input('appEllipsis') maxLines: number = 3;
  @Input() readMoreButtonStyle!: Partial<CSSStyleDeclaration>;
  private element: HTMLElement;
  private readMoreButton: HTMLButtonElement | null = null;
  private matTooltip: MatTooltip | null = null;

  constructor(private el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngAfterViewChecked() {
    this.applyEllipsis();
    this.createReadMoreButton();
    this.toggleReadMoreButton();
  }

  private applyEllipsis() {
    this.element.style.display = '-webkit-box';
    this.element.style.webkitBoxOrient = 'vertical';
    this.element.style.webkitLineClamp = `${this.maxLines}`;
    this.element.style.overflow = 'hidden';
  }

  private createReadMoreButton() {
    if (!this.readMoreButton) {
      this.readMoreButton = document.createElement('button');
      this.readMoreButton.textContent = 'Xem thêm';
      this.readMoreButton.setAttribute('type', 'button');
      this.readMoreButton.classList.add('readmore');

      if (this.readMoreButtonStyle) {
        Object.assign(this.readMoreButton.style, this.readMoreButtonStyle);
      }

      this.readMoreButton.addEventListener('click', () => {
        this.element.style.webkitLineClamp = '';
        if (this.readMoreButton) {
          this.readMoreButton.style.display = 'none';
        }
        this.showTooltip();
      });
    }
  }

  private toggleReadMoreButton() {
    const isTextOverflowed = this.element.scrollHeight > this.element.clientHeight;
    if (isTextOverflowed && this.readMoreButton && !this.readMoreButton.parentNode) {
      if (this.element.parentNode) {
        this.element.parentNode.insertBefore(this.readMoreButton, this.element.nextSibling);
      }
    } else if (!isTextOverflowed && this.readMoreButton && this.readMoreButton.parentNode) {
      this.readMoreButton.parentNode.removeChild(this.readMoreButton);
    }
  }

  private showTooltip() {
    console.log("zooooo");
    this.element.title = this.element.innerText;
  }
}
