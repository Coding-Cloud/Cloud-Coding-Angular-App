import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { environment as env } from '../../../../environments/environment';
import { navigation } from 'src/app/app-routing.module';

@Component({
  selector: 'cc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  releaseButler = 'assets/release-butler.png';
  appName = env.appName;
  navigation = navigation;

  constructor() {}

  ngOnInit() {}
}
