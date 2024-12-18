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

  describe('selectSubject', () => {
    it('should emit the selected subject', () => {
      const emitSpy = jest.spyOn(component.subjectSelected, 'emit');
      const testSubjects = ['HTML', 'CSS', 'JavaScript', 'Accessibility'];

      testSubjects.forEach((subject) => {
        component.selectSubject(subject);
        expect(emitSpy).toHaveBeenCalledWith(subject);
      });
    });

    it('should emit only the last selected subject', () => {
      const emitSpy = jest.spyOn(component.subjectSelected, 'emit');
      component.selectSubject('HTML');
      component.selectSubject('CSS');
      component.selectSubject('JavaScript');
      expect(emitSpy).toHaveBeenLastCalledWith('JavaScript');
    });

    it('should handle empty string subject', () => {
      const emitSpy = jest.spyOn(component.subjectSelected, 'emit');
      component.selectSubject('');
      expect(emitSpy).toHaveBeenCalledWith('');
    });
  });

  describe('subjectSelected EventEmitter', () => {
    it('should be an instance of EventEmitter', () => {
      expect(component.subjectSelected).toBeTruthy();
      expect(component.subjectSelected.emit).toBeDefined();
    });

    it('should allow subscribing to emitted events', () => {
      const mockCallback = jest.fn();
      component.subjectSelected.subscribe(mockCallback);
      component.selectSubject('HTML');
      expect(mockCallback).toHaveBeenCalledWith('HTML');
    });
  });
});
