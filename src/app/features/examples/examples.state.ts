import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import { AppState } from '../../core/core.module';

import { todosReducer } from './todos/todos.reducer';
import { TodosState } from './todos/todos.model';
import { bookReducer } from './crud/books.reducer';
import { formReducer } from './form/form.reducer';
import { FormState } from './form/form.model';
import { BookState } from './crud/books.model';

export const EXAMPLE_STATE_NAME = 'examples';
export const selectExamples = createFeatureSelector<State, ExamplesState>(
  EXAMPLE_STATE_NAME
);
export const exampleReducer: ActionReducerMap<ExamplesState> = {
  todos: todosReducer,
  books: bookReducer,
  form: formReducer
};

export interface ExamplesState {
  todos: TodosState;
  form: FormState;
  books: BookState;
}

export interface State extends AppState {
  examples: ExamplesState;
}
