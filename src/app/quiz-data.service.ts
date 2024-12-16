import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quiz } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class QuizDataService {
  quizzes: Quiz[] = [];

  constructor(readonly http: HttpClient) {}

  getQuizData(): Observable<Quiz> {
    return this.http.get<Quiz>('/data.json');
  }
}
