import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHoverEffect]',
  standalone: true
})
export class HoverEffectDirective {

  @Input() tooltipText: string = "";

  tooltip: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    // Initialisiere den Tooltip, aber mache ihn noch nicht sichtbar
    this.tooltip = this.renderer.createElement('span');
    this.renderer.addClass(this.tooltip, 'custom-tooltip'); // Stelle sicher, dass du entsprechende CSS-Styles hast
    this.renderer.appendChild(document.body, this.tooltip); // Füge den Tooltip zum body hinzu
    this.renderer.setStyle(this.tooltip, 'display', 'none');
  }

  @HostListener('mouseenter', ['$event'])
  onMouseEnter(event: MouseEvent) {
    if (!this.tooltipText) return; // Keine Aktion, wenn kein Tooltip-Text vorhanden ist

    // Setze den Text des Tooltips
    this.renderer.setProperty(this.tooltip, 'innerText', this.tooltipText);

    // Zeige den Tooltip an und positioniere ihn
    this.renderer.setStyle(this.tooltip, 'display', 'block');
    this.renderer.setStyle(this.tooltip, 'left', `${event.clientX + 10}px`);
    this.renderer.setStyle(this.tooltip, 'top', `${event.clientY + 10}px`);

    // Animation starten
    this.el.nativeElement.animate([
      { strokeDashoffset: 100 },
      { strokeDashoffset: 0 }
    ], {
      duration: 2000,
      iterations: Infinity
    });
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    // Verstecke den Tooltip
    this.renderer.setStyle(this.tooltip, 'display', 'none');
  }

}
