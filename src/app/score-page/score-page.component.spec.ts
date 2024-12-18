import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScorePageComponent } from './score-page.component';

describe('ScorePageComponent', () => {
  let component: ScorePageComponent;
  let fixture: ComponentFixture<ScorePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScorePageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ScorePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Input Properties', () => {
    it('should have default values for input properties', () => {
      expect(component.correctAnswers).toBe(0);
      expect(component.totalQuestions).toBe(0);
      expect(component.subjectName).toBeUndefined();
      expect(component.subjectImage).toBeUndefined();
    });

    it('should set correctAnswers input', () => {
      component.correctAnswers = 5;
      fixture.detectChanges();
      expect(component.correctAnswers).toBe(5);
    });

    it('should set totalQuestions input', () => {
      component.totalQuestions = 10;
      fixture.detectChanges();
      expect(component.totalQuestions).toBe(10);
    });

    it('should set subjectName input', () => {
      component.subjectName = 'HTML';
      fixture.detectChanges();
      expect(component.subjectName).toBe('HTML');
    });

    it('should set subjectImage input', () => {
      component.subjectImage = '/html.png';
      fixture.detectChanges();
      expect(component.subjectImage).toBe('/html.png');
    });
  });
});
