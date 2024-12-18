import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionsContainerComponent } from './questions-container.component';
import { QuizService } from '../quiz.service';
import { Quiz } from '../interfaces';
import { of } from 'rxjs';

describe('QuestionsContainerComponent', () => {
  let component: QuestionsContainerComponent;
  let fixture: ComponentFixture<QuestionsContainerComponent>;
  let mockQuizService: jest.Mocked<QuizService>;

  const mockQuizzes = [
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
        {
          question:
            'Which of the following is the correct structure for an HTML document?',
          options: [
            '<html><head></head><body></body></html>',
            '<head><html></html><body></body></head>',
            '<body><head></head><html></html></body>',
            '<html><body></body><head></head></html>',
          ],
          answer: '<html><head></head><body></body></html>',
        },
      ],
    },
  ];

  beforeEach(async () => {
    mockQuizService = {
      getQuizzes: jest.fn(),
      filterQuizBySubject: jest.fn(),
    } as any;

    mockQuizService.getQuizzes.mockReturnValue(of({ quizzes: mockQuizzes }));
    mockQuizService.filterQuizBySubject.mockReturnValue(mockQuizzes[0]);

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

  describe('isLastQuestion', () => {
    it('should return true for the last question', () => {
      component.currentQuestionIndex = 1;

      expect(component.isLastQuestion).toBe(true);
    });

    it('should return false for non-last questions', () => {
      component.currentQuestionIndex = 0;

      expect(component.isLastQuestion).toBe(false);
    });
  });

  describe('selectOption', () => {
    it('should set selectedAnswer', () => {
      const testOption = 'Hyper Text Markup Language';
      component.selectOption(testOption);
      expect(component.selectedAnswer).toBe(testOption);
    });

    it('should clear error message', () => {
      component.errorMessage = 'Please select an answer';
      component.selectOption('Hyper Text Markup Language');
      expect(component.errorMessage).toBeNull();
    });

    it('should increment correctAnswers for correct answer', () => {
      const correctAnswer = 'Hyper Text Markup Language';
      component.correctAnswers = 0;
      component.selectOption(correctAnswer);
      expect(component.correctAnswers).toBe(1);
    });
  });

  describe('isCorrect', () => {
    it('should return true for correct answer', () => {
      const correctAnswer = 'Hyper Text Markup Language';
      const result = component.isCorrect(correctAnswer);
      expect(result).toBe(true);
    });

    it('should return false for incorrect answer', () => {
      const incorrectAnswer = 'Hyper Trainer Marking Language';
      const result = component.isCorrect(incorrectAnswer);
      expect(result).toBe(false);
    });
  });

  describe('getOptionLabel', () => {
    it('should return correct letter labels', () => {
      expect(component.getOptionLabel(0)).toBe('A');
      expect(component.getOptionLabel(1)).toBe('B');
      expect(component.getOptionLabel(2)).toBe('C');
      expect(component.getOptionLabel(3)).toBe('D');
    });
  });

  describe('isOptionDisabled', () => {
    it('should return true when an answer is selected', () => {
      component.selectedAnswer = 'Hyper Text Markup Language';
      expect(component.isOptionDisabled()).toBe(true);
    });

    it('should return false when no answer is selected', () => {
      component.selectedAnswer = null;
      expect(component.isOptionDisabled()).toBe(false);
    });
  });

  describe('handleSubmit', () => {
    it('should increment question index for non-last question', () => {
      component.selectedAnswer = 'Hyper Text Markup Language';
      component.currentQuestionIndex = 0;
      component.handleSubmit();
      expect(component.currentQuestionIndex).toBe(1);
    });

    it('should set quizCompleted to true for last question', () => {
      component.selectedAnswer = 'Hyper Text Markup Language';
      component.currentQuestionIndex = 1;
      component.handleSubmit();
      expect(component.quizCompleted).toBe(true);
    });

    it('should set error message when no answer is selected', () => {
      component.selectedAnswer = null;
      component.handleSubmit();
      expect(component.errorMessage).toBe('Please select an answer');
    });

    it('should reset selectedAnswer after moving to next question', () => {
      component.selectedAnswer = 'Hyper Text Markup Language';
      component.currentQuestionIndex = 0;
      component.handleSubmit();
      expect(component.selectedAnswer).toBeNull();
    });
  });
});
