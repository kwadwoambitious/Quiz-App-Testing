import { Component } from '@angular/core';
import { StartMenuComponent } from './start-menu/start-menu.component';
import { QuestionsContainerComponent } from './questions-container/questions-container.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, StartMenuComponent, QuestionsContainerComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public subjectSelected: string = '';

  public onSubjectSelected(subject: string): void {
    this.subjectSelected = subject;
  }
}
