import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { QuizDataService } from './quiz-data.service';

describe('QuizDataService', () => {
  let service: QuizDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [QuizDataService],
    });

    service = TestBed.inject(QuizDataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch quiz data', () => {
    const mockQuizData = {
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
    };

    service.getQuizData().subscribe((data) => {
      expect(data).toEqual(mockQuizData);
    });

    const req = httpMock.expectOne('/data.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockQuizData);
  });
});
