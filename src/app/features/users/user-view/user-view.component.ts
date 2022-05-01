import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/core.state';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'cc-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserViewComponent implements OnInit {
  userId = '';

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id') ?? '';
  }
}
