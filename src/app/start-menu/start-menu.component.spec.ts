import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StartMenuComponent } from './start-menu.component';

describe('StartMenuComponent', () => {
  let component: StartMenuComponent;
  let fixture: ComponentFixture<StartMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StartMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit selected subject', () => {
    const testSubject = 'HTML';
    let emittedSubject: string | undefined;

    component.subjectSelected.subscribe((subject: string) => {
      emittedSubject = subject;
    });

    component.selectSubject(testSubject);

    expect(emittedSubject).toBe(testSubject);
  });
});
