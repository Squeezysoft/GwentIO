import { AfterViewInit, Component, ElementRef, HostListener, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MathHelper } from '../../helpers';

@Component({
  selector: 'app-canvas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './canvas.component.html',
  styleUrl: './canvas.component.scss'
})
export class CanvasComponent implements AfterViewInit {
  isBrowser: boolean;
  context: CanvasRenderingContext2D;
  width: number;
  height: number;

  @ViewChild('canvas', { static: false }) canvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('color', { static: false }) color: ElementRef<HTMLDivElement>;

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

    const image = new Image();
    image.onload = () => {
      context.drawImage(image, 0, 0, image.width / 2, image.height / 2);
    };
    image.src = '../../assets/images/cards/djextra.png';

    this.context = context;
    this.width = width;
    this.height = height;
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    const x = MathHelper.clamp(event.offsetX, 0, this.width);
    const y = MathHelper.clamp(event.offsetY, 0, this.height);
    //console.log('onMouseMove:', event);
    console.log(`onMouseMove: (${x}, ${y})`);
    const image = this.context.getImageData(x, y, 1, 1);
    const [red, green, blue, alpha] = image.data;
    const color = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
    console.log(color);
    this.color.nativeElement.style.backgroundColor = color;
  }
}
