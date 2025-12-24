import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudioComponent } from './studio.ts';
import { AuthService } from '../../services/auth.service';
import { FirebaseApp } from '@angular/fire/app';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('StudioComponent', () => {
    let component: StudioComponent;
    let fixture: ComponentFixture<StudioComponent>;

    beforeEach(async () => {
        // Mock AuthService
        const authSpy = jasmine.createSpyObj('AuthService', ['login', 'logout']);
        authSpy.user$ = of(null);
        authSpy.isAuthorized$ = of(false);

        // Mock FirebaseApp (simplified)
        const firebaseAppMock = {
            name: '[DEFAULT]',
            options: {}
        };

        await TestBed.configureTestingModule({
            imports: [StudioComponent, NoopAnimationsModule],
            providers: [
                { provide: AuthService, useValue: authSpy },
                { provide: FirebaseApp, useValue: firebaseAppMock }
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(StudioComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
