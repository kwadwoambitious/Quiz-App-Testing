import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { QuizService } from './quiz.service';
import { Quiz } from './interfaces';

describe('QuizService', () => {
  let service: QuizService;
  let httpMock: HttpTestingController;

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
      {
        title: 'CSS',
        icon: '/css.png',
        questions: [
          {
            question: 'What does CSS stand for?',
            options: [
              'Colorful Style Sheets',
              'Computer Style Sheets',
              'Cascading Style Sheets',
              'Creative Style Sheets',
            ],
            answer: 'Cascading Style Sheets',
          },
        ],
      },
    ],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [QuizService],
    });

    service = TestBed.inject(QuizService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch quizzes', () => {
    service.getQuizzes().subscribe((result) => {
      expect(result.quizzes.length).toBe(2);
      expect(result.quizzes).toEqual(mockQuizzes.quizzes);
    });

    const req = httpMock.expectOne('./data.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockQuizzes);
  });

  describe('filterQuizBySubject', () => {
    it('should return correct quiz when subject exists', () => {
      const result = service.filterQuizBySubject(mockQuizzes.quizzes, 'HTML');

      expect(result).toBeTruthy();
      expect(result?.title).toBe('HTML');
      expect(result?.questions.length).toBe(1);
    });

    it('should return undefined when subject does not exist', () => {
      const result = service.filterQuizBySubject(mockQuizzes.quizzes, 'Java');

      expect(result).toBeUndefined();
    });

    it('should handle empty quizzes array', () => {
      const result = service.filterQuizBySubject([], 'HTML');

      expect(result).toBeUndefined();
    });
  });
});
