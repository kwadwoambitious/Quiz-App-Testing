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

  const mockQuizzes: Quiz[] = [
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
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [QuizService],
    });
    service = TestBed.inject(QuizService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getQuizzes', () => {
    it('should fetch quizzes from data.json', () => {
      service.getQuizzes().subscribe((response) => {
        expect(response.quizzes.length).toBe(2);
        expect(response.quizzes).toEqual(mockQuizzes);
      });
      const req = httpMock.expectOne('./data.json');
      req.flush({ quizzes: mockQuizzes });
    });
  });

  describe('filterQuizBySubject', () => {
    it('should return a quiz when subject matches', () => {
      const result = service.filterQuizBySubject(mockQuizzes, 'HTML');
      expect(result).toBeDefined();
      expect(result?.title).toBe('HTML');
      expect(result?.icon).toBe('/html.png');
    });

    it('should return undefined when no matching subject', () => {
      const result = service.filterQuizBySubject(mockQuizzes, 'JavaScript');
      expect(result).toBeUndefined();
    });

    it('should handle empty quiz array', () => {
      const result = service.filterQuizBySubject([], 'HTML');
      expect(result).toBeUndefined();
    });
  });
});
