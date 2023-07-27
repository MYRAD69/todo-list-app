import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  newTask: string = '';
  @Input() taskList: any;

  @Output() addTaskEvent = new EventEmitter<string>();
  @Output() clearTasksEvent = new EventEmitter();

  addTask() {
    this.addTaskEvent.emit(this.newTask);
    this.newTask = '';
  }

  clearTasks() {
    this.clearTasksEvent.emit();
  }

}
