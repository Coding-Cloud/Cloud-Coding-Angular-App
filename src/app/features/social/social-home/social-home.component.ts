import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-social-home',
  templateUrl: './social-home.component.html',
  styleUrls: ['./social-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SocialHomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
