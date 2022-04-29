import {
  selectRemoveDoneTodosDisabled,
  selectTodos,
  selectTodosFilter
} from '../todos.selectors';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { select, Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { Observable, of as observableOf } from 'rxjs';

import {
  NotificationService,
  ROUTE_ANIMATIONS_ELEMENTS
} from '../../../../core/core.module';

import * as todoActions from '../todos.actions';
import { Todo, TodosFilter } from '../todos.model';
import { State } from '../../examples.state';

@Component({
  selector: 'anms-todos',
  templateUrl: './todos-container.component.html',
  styleUrls: ['./todos-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosContainerComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  todos$: Observable<Todo[]> | undefined;
  filter$: Observable<TodosFilter> | undefined;
  removeDoneDisabled$: Observable<boolean> = observableOf(false);
  newTodo = '';

  constructor(
    public store: Store<State>,
    public snackBar: MatSnackBar,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.todos$ = this.store.pipe(select(selectTodos));
    this.filter$ = this.store.pipe(select(selectTodosFilter));
    this.removeDoneDisabled$ = this.store.pipe(
      select(selectRemoveDoneTodosDisabled)
    );
  }

  get isAddTodoDisabled() {
    return this.newTodo.length < 4;
  }

  onNewTodoChange(event: any) {
    this.newTodo = event.target.value;
  }

  onNewTodoClear() {
    this.newTodo = '';
  }

  onAddTodo() {
    this.store.dispatch(todoActions.actionTodosAdd(this.newTodo));
    const addedMessage = 'Notification : ' + this.newTodo;
    this.notificationService.info(addedMessage);
    this.newTodo = '';
  }

  onToggleTodo(todo: Todo) {
    this.store.dispatch(todoActions.actionTodosToggle({ id: todo.id }));
    const newStatus = 'New status : ' + todo.done ? 'active' : 'done';
    const undo = 'Annuler';
    const toggledMessage = 'Notification : ' + todo.name;

    this.snackBar
      .open(`${toggledMessage} ${newStatus}`, undo, {
        duration: 2500,
        panelClass: 'todos-notification-overlay'
      })
      .onAction()
      .pipe(take(1))
      .subscribe(() => this.onToggleTodo({ ...todo, done: !todo.done }));
  }

  onRemoveDoneTodos() {
    this.store.dispatch(todoActions.actionTodosRemoveDone());
    const removedMessage = 'Message retiré';
    this.notificationService.info(removedMessage);
  }

  onFilterTodos(filter: TodosFilter) {
    this.store.dispatch(todoActions.actionTodosFilter({ filter }));
    const filterToMessage = 'Filter notification';
    const filterMessage = 'Todo filter : ' + filter;
    this.notificationService.info(`${filterToMessage} ${filterMessage}`);
  }
}
