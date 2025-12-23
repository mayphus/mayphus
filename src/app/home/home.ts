import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule, MatDividerModule, MatChipsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
  projects = [
    {
      name: 'Mayphus.org',
      description: 'My personal digital garden and reflection of systematic minimalism. Built with Angular and Material.',
      link: 'https://mayphus.org',
      tags: ['Angular', 'Digital Garden', 'Systematic Minimalism']
    },
    {
      name: 'ESP32 Minimal',
      description: 'Minimal hardware design and software definitions for ESP32-S3-WROOM-1.',
      link: 'https://github.com/mayphus/esp32_minimal',
      tags: ['Hardware', 'ESP32', 'Embedded']
    }
  ];
}
