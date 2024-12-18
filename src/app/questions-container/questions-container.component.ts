import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { ScorePageComponent } from '../score-page/score-page.component';
import { QuizService } from '../quiz.service';
import { Quiz } from '../interfaces';

@Component({
  selector: 'app-questions-container',
  standalone: true,
  imports: [CommonModule, HeaderComponent, ScorePageComponent],
  templateUrl: './questions-container.component.html',
  styleUrls: ['./questions-container.component.css'],
})
export class QuestionsContainerComponent {
  @Input() subject = '';
  quizzes: Quiz[] = [];
  @Input() selectedQuiz: Quiz | undefined;
  currentQuestionIndex = 0;
  selectedAnswer: string | null = null;
  errorMessage: string | null = null;

  quizCompleted = false;
  correctAnswers = 0;

  constructor(private quizService: QuizService) {
    this.quizService.getQuizzes().subscribe((data) => {
      this.quizzes = data.quizzes;
      this.filterQuiz();
    });
  }

  ngOnChanges(): void {
    if (this.subject) {
      this.filterQuiz();
    }
  }

  private filterQuiz(): void {
    this.selectedQuiz = this.quizService.filterQuizBySubject(
      this.quizzes,
      this.subject
    );
  }

  public get isLastQuestion(): boolean {
    return (
      this.selectedQuiz?.questions.length === this.currentQuestionIndex + 1
    );
  }

  public selectOption(option: string): void {
    this.selectedAnswer = option;
    this.errorMessage = null;

    if (this.isCorrect(option)) {
      this.correctAnswers++;
    }
  }

  public isCorrect(option: string): boolean {
    return (
      this.selectedQuiz?.questions[this.currentQuestionIndex].answer === option
    );
  }

  public getOptionLabel(index: number): string {
    return String.fromCharCode(65 + index);
  }

  public isOptionDisabled(): boolean {
    return this.selectedAnswer !== null;
  }

  public handleSubmit(): void {
    if (this.selectedAnswer) {
      if (!this.isLastQuestion) {
        this.currentQuestionIndex++;
        this.selectedAnswer = null;
      } else {
        this.quizCompleted = true;
      }
    } else {
      this.errorMessage = 'Please select an answer';
    }
  }
}
