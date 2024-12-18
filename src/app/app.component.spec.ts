import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { StartMenuComponent } from './start-menu/start-menu.component';
import { QuestionsContainerComponent } from './questions-container/questions-container.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, StartMenuComponent, QuestionsContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Subject Selection', () => {
    it('should initialize with an empty subject', () => {
      expect(component.subjectSelected).toBe('');
    });

    it('should update subjectSelected when onSubjectSelected is called', () => {
      const testSubject = 'HTML';
      component.onSubjectSelected(testSubject);
      expect(component.subjectSelected).toBe(testSubject);
    });
  });
});
