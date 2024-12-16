import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-score-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './score-page.component.html',
  styleUrl: './score-page.component.css',
})
export class ScorePageComponent {
  @Input() correctAnswers = 0;
  @Input() totalQuestions = 0;
  @Input() subjectName: string | undefined;
  @Input() subjectImage: string | undefined;
}
