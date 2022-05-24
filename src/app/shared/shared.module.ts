import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatSliderModule } from '@angular/material/slider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';

import {
  FaIconLibrary,
  FontAwesomeModule
} from '@fortawesome/angular-fontawesome';
import {
  faBook,
  faCaretDown,
  faCaretUp,
  faCheck,
  faEdit,
  faExclamationTriangle,
  faFilter,
  faLanguage,
  faLightbulb,
  faPaintBrush,
  faPlus,
  faSquare,
  faStream,
  faTasks,
  faTimes,
  faTrash,
  faWindowMaximize
} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faMediumM } from '@fortawesome/free-brands-svg-icons';

import { BigInputComponent } from './big-input/big-input/big-input.component';
import { BigInputActionComponent } from './big-input/big-input-action/big-input-action.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ProjectLanguagePipe } from './pipes/project-language-pipe.pipe';
import { ProjectStatusPipe } from './pipes/project-status.pipe';
import { ProjectVisibilityPipe } from './pipes/project-visibility.pipe';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { EmptyStringPipe } from './pipes/empty-string.pipe';
import { BooleanYesNoPipe } from './pipes/boolean-yes-no.pipe';
import { UsernamePipe } from './pipes/username.pipe';
import { SpinnerComponent } from './spinner/spinner.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ProjectNamePipe } from './pipes/project-name.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    MatTabsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatCardModule,
    MatCheckboxModule,
    MatListModule,
    MatMenuModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatDialogModule,
    MatAutocompleteModule,
    FontAwesomeModule,
    MatDialogModule,
    MatTableModule,
    MatProgressBarModule,
    MatPaginatorModule
  ],
  declarations: [
    BigInputComponent,
    BigInputActionComponent,
    ConfirmDialogComponent,
    ProjectLanguagePipe,
    ProjectStatusPipe,
    ProjectVisibilityPipe,
    DateFormatPipe,
    EmptyStringPipe,
    BooleanYesNoPipe,
    UsernamePipe,
    SpinnerComponent,
    ProjectNamePipe
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatMenuModule,
    MatTabsModule,
    MatChipsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatCardModule,
    MatListModule,
    MatSelectModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatExpansionModule,
    MatSliderModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FontAwesomeModule,
    MatTableModule,
    MatProgressBarModule,
    MatPaginatorModule,
    BigInputComponent,
    BigInputActionComponent,
    ConfirmDialogComponent,
    MatDialogModule,
    MatAutocompleteModule,
    ProjectLanguagePipe,
    ProjectStatusPipe,
    ProjectVisibilityPipe,
    EmptyStringPipe,
    BooleanYesNoPipe,
    UsernamePipe,
    SpinnerComponent
  ]
})
export class SharedModule {
  constructor(faIconLibrary: FaIconLibrary) {
    faIconLibrary.addIcons(
      faGithub,
      faMediumM,
      faPlus,
      faEdit,
      faTrash,
      faTimes,
      faCaretUp,
      faCaretDown,
      faExclamationTriangle,
      faFilter,
      faTasks,
      faCheck,
      faSquare,
      faLanguage,
      faPaintBrush,
      faLightbulb,
      faWindowMaximize,
      faStream,
      faBook
    );
  }
}
