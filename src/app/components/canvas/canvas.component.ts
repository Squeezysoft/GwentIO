import { AfterViewInit, Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-canvas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './canvas.component.html',
  styleUrl: './canvas.component.scss'
})
export class CanvasComponent implements AfterViewInit {
  context: CanvasRenderingContext2D;
  isBrowser: boolean;

  @ViewChild('canvas', { static: false }) canvas: ElementRef<HTMLCanvasElement>;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    console.log('platformId:', platformId);
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit(): void {
    const context = this.canvas.nativeElement.getContext('2d');

    console.log('context:', context);

    const width = context.canvas.width;
    const height = context.canvas.height;

    const gradient = context.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0.0, 'red');
    gradient.addColorStop(0.2, 'teal');
    gradient.addColorStop(0.4, 'green');
    gradient.addColorStop(0.6, 'magenta');
    gradient.addColorStop(0.8, 'yellow');
    gradient.addColorStop(1.0, 'blue');

    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);

    this.context = context;
  }
}
