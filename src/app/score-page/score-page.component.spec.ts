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

  it('should handle input properties', () => {
    component.correctAnswers = 8;
    component.totalQuestions = 10;
    component.subjectName = 'HTML';
    component.subjectImage = '/html.png';
    fixture.detectChanges();

    expect(component.correctAnswers).toBe(8);
    expect(component.totalQuestions).toBe(10);
    expect(component.subjectName).toBe('HTML');
    expect(component.subjectImage).toBe('/html.png');
  });
});
