import { Component, Output, EventEmitter } from '@angular/core';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-start-menu',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './start-menu.component.html',
  styleUrls: ['./start-menu.component.css'],
})
export class StartMenuComponent {
  @Output() subjectSelected = new EventEmitter<string>();

  public selectSubject(subject: string): void {
    this.subjectSelected.emit(subject);
  }
}
