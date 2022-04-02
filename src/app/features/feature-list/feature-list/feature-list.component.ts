import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Feature, features } from '../feature-list.data';
import { navigation } from '../../../app-routing.module';

@Component({
  selector: 'anms-feature-list',
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureListComponent implements OnInit {
  features: Feature[] = features;
  featureLink = navigation.features;

  ngOnInit() {}
}
