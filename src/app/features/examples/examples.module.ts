import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { LazyElementsModule } from '@angular-extensions/elements';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../../shared/shared.module';

import { EXAMPLE_STATE_NAME, exampleReducer } from './examples.state';
import { ExamplesRoutingModule } from './examples-routing.module';
import { ExamplesComponent } from './examples/examples.component';
import { TodosContainerComponent } from './todos/components/todos-container.component';
import { TodosEffects } from './todos/todos.effects';
import { CrudComponent } from './crud/components/crud.component';
import { BooksEffects } from './crud/books.effects';
import { FormComponent } from './form/components/form.component';
import { FormEffects } from './form/form.effects';
import { AuthenticatedComponent } from './authenticated/authenticated.component';
import { NotificationsComponent } from './notifications/components/notifications.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    LazyElementsModule,
    SharedModule,
    ExamplesRoutingModule,
    StoreModule.forFeature(EXAMPLE_STATE_NAME, exampleReducer),
    EffectsModule.forFeature([TodosEffects, BooksEffects, FormEffects])
  ],
  declarations: [
    ExamplesComponent,
    TodosContainerComponent,
    AuthenticatedComponent,
    CrudComponent,
    FormComponent,
    NotificationsComponent
  ],
  providers: []
})
export class ExamplesModule {
  constructor() {}
}
