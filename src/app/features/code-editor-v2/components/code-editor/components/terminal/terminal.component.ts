import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent implements OnChanges {
  @Input() text$: BehaviorSubject<string> | undefined;

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {}
}
