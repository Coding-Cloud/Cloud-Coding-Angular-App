import { TestBed } from '@angular/core/testing';

import { CodeSocketService } from './code-socket.service';

describe('CodeSocketService', () => {
  let service: CodeSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodeSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
