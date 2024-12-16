import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { ThemeService } from '../theme.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockThemeService: jasmine.SpyObj<ThemeService>;

  beforeEach(async () => {
    mockThemeService = jasmine.createSpyObj('ThemeService', [
      'toggleTheme',
      'getTheme',
      'applyTheme',
    ]);

    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [{ provide: ThemeService, useValue: mockThemeService }],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with inputs', () => {
    component.subjectName = 'HTML';
    component.subjectImage = '/html.png';
    fixture.detectChanges();

    expect(component.subjectName).toBe('HTML');
    expect(component.subjectImage).toBe('/html.png');
  });

  it('should toggle theme', () => {
    component.toggleTheme();

    expect(component.isDarkMode).toBeFalsy();
  });
});
