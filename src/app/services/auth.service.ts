import { Injectable, inject } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup, signOut, user, User } from '@angular/fire/auth';
import { Observable, map, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private auth = inject(Auth);
    user$: Observable<User | null> = user(this.auth);

    readonly ALLOWED_EMAIL = 'tangmeifa@gmail.com';

    isAuthorized$: Observable<boolean> = this.user$.pipe(
        map(user => user?.email === this.ALLOWED_EMAIL)
    );

    async login() {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(this.auth, provider);
            if (result.user.email !== this.ALLOWED_EMAIL) {
                await this.logout();
                alert('Access denied. Only authorized users can log in.');
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    }

    async logout() {
        await signOut(this.auth);
    }
}
