import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent implements OnChanges {
  @Input() text?: string;

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes.text);
  }
}
