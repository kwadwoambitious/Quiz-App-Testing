import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionsContainerComponent } from './questions-container.component';
import { QuizService } from '../quiz.service';
import { of } from 'rxjs';
import { Quiz } from '../interfaces';

describe('QuestionsContainerComponent', () => {
  let component: QuestionsContainerComponent;
  let fixture: ComponentFixture<QuestionsContainerComponent>;
  let mockQuizService: jasmine.SpyObj<QuizService>;

  const mockQuizzes: { quizzes: Quiz[] } = {
    quizzes: [
      {
        title: 'HTML',
        icon: '/html.png',
        questions: [
          {
            question: 'What does HTML stand for?',
            options: [
              'Hyper Trainer Marking Language',
              'Hyper Text Marketing Language',
              'Hyper Text Markup Language',
              'Hyper Text Markup Leveler',
            ],
            answer: 'Hyper Text Markup Language',
          },
        ],
      },
    ],
  };

  beforeEach(async () => {
    mockQuizService = jasmine.createSpyObj('QuizService', [
      'getQuizzes',
      'filterQuizBySubject',
    ]);

    mockQuizService.getQuizzes.and.returnValue(of(mockQuizzes));
    mockQuizService.filterQuizBySubject.and.returnValue(mockQuizzes.quizzes[0]);

    await TestBed.configureTestingModule({
      imports: [QuestionsContainerComponent],
      providers: [{ provide: QuizService, useValue: mockQuizService }],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionsContainerComponent);
    component = fixture.componentInstance;
    component.subject = 'HTML';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load quizzes on initialization', () => {
    expect(mockQuizService.getQuizzes).toHaveBeenCalled();
    expect(component.quizzes.length).toBe(1);
  });

  it('should filter quiz by subject', () => {
    expect(mockQuizService.filterQuizBySubject).toHaveBeenCalled();
    expect(component.selectedQuiz).toBeTruthy();
  });

  it('should handle option selection', () => {
    const testOption = 'Hyper Text Markup Language';
    component.selectedQuiz = mockQuizzes.quizzes[0];
    component.selectOption(testOption);

    expect(component.selectedAnswer).toBe(testOption);
    expect(component.isCorrect(testOption)).toBeTrue();
  });

  it('should handle quiz submission', () => {
    component.selectedQuiz = mockQuizzes.quizzes[0];
    component.selectOption('Hyper Text Markup Language');
    component.handleSubmit();

    expect(component.currentQuestionIndex).toBe(0);
    expect(component.quizCompleted).toBeFalse();
  });
});
