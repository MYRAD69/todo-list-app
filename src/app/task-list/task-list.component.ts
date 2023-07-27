import { Component, Input, OnChanges, SimpleChanges, AfterContentInit } from '@angular/core';
import { getDatabase, ref, set, onValue } from "firebase/database";

class Task {
  constructor(public name: string, public completed: boolean) { }
}

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnChanges, AfterContentInit {
  taskList: Task[] = [];
  @Input() newTask: string = '';

  constructor() {
    const database = getDatabase();
    onValue(ref(database, 'tasks/'), (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        this.taskList.push(new Task(childSnapshot.val().name, childSnapshot.val().completed));
      });
    }, {
      onlyOnce: true
    });
  }

  ngOnChanges(changes: any): void {
    if (changes.newTask) {
      this.taskList.push(new Task(changes.newTask.currentValue, false));
    }
    console.log(this.taskList);
  }

  ngAfterContentInit(): void {
    this.taskList = [];
  }

  deleteTask(index: number) {
    let taskName = this.taskList[index].name;
    const database = getDatabase();
    onValue(ref(database, 'tasks/'), (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        if (childSnapshot.val().name === taskName) {
          const taskRef = ref(database, 'tasks/' + childSnapshot.key);
          set(taskRef, null);
        }
      });
    }, {
      onlyOnce: true
    });
    this.taskList.splice(index, 1);
  }

  toggleTask(index: number) {
    this.taskList[index].completed = !this.taskList[index].completed;
    const database = getDatabase();
    onValue(ref(database, 'tasks/'), (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        if (childSnapshot.val().name === this.taskList[index].name) {
          const taskRef = ref(database, 'tasks/' + childSnapshot.key);
          set(taskRef, {
            name: this.taskList[index].name,
            completed: this.taskList[index].completed
          });
        }
      });
    }, {
      onlyOnce: true
    });
  }
}
