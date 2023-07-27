import { TaskListComponent } from './task-list/task-list.component';
import { Component, ViewChild } from '@angular/core';
import { getDatabase, ref, set, onValue, push } from "firebase/database";
import { initializeApp } from "firebase/app";

var firebaseConfig = {
  apiKey: "AIzaSyDNdSCjw5-PQbnUHLCmj7W2aJ_Ncdf4xFI",
  authDomain: "word-cards-c564b.firebaseapp.com",
  databaseURL: "https://word-cards-c564b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "word-cards-c564b",
  storageBucket: "word-cards-c564b.appspot.com",
  messagingSenderId: "1010686458159",
  appId: "1:1010686458159:web:cc091f8b986cebd77ac9da",
  measurementId: "G-QBFTRR88X6"
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  newTask: string = '';



  constructor() {
    const app = initializeApp(firebaseConfig);
  }

  @ViewChild(TaskListComponent) taskListComponent: TaskListComponent;

  onAddTaskEvent($event: string) {
    this.newTask = $event;
    const database = getDatabase();
    const taskListRef = ref(database, 'tasks/');
    const newTaskRef = push(taskListRef);
    set(newTaskRef, {
      name: this.newTask,
      completed: false
    });
  }
  onClearTasksEvent() {
    this.taskListComponent.taskList = [];
    console.log(this.taskListComponent.taskList);
    const database = getDatabase();
    const taskListRef = ref(database, 'tasks/');
    onValue(taskListRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        set(childSnapshot.ref, null);
      });
    }, {
      onlyOnce: true
    });
  }
}
