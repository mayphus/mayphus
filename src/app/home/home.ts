import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule, MatButtonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent { }
