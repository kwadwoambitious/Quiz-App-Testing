import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quiz } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private http: HttpClient) {}

  public getQuizzes(): Observable<{ quizzes: Quiz[] }> {
    return this.http.get<{ quizzes: Quiz[] }>('./data.json');
  }

  public filterQuizBySubject(
    quizzes: Quiz[],
    subject: string
  ): Quiz | undefined {
    return quizzes.find((quiz) => quiz.title === subject);
  }
}
