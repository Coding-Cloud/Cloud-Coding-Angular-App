import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeEdtorComponent } from './code-edtor.component';

describe('CodeEdtorComponent', () => {
  let component: CodeEdtorComponent;
  let fixture: ComponentFixture<CodeEdtorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CodeEdtorComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeEdtorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
