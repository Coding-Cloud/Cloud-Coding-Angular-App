import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorPictureComponent } from './editor-picture.component';

describe('EditorPictureComponent', () => {
  let component: EditorPictureComponent;
  let fixture: ComponentFixture<EditorPictureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditorPictureComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
