import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-studio',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule],
    templateUrl: './studio.html',
    styleUrl: './studio.css'
})
export class StudioComponent {
    authService = inject(AuthService);

    login() {
        this.authService.login();
    }

    logout() {
        this.authService.logout();
    }
}
