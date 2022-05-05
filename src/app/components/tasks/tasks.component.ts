import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe({
      next: (tasks) => (this.tasks = tasks),
      error: (error) => console.log(error),
    });
  }
  deleteTask(task: Task): void {
    this.taskService.deleteTask(task).subscribe({
      next: () =>
        (this.tasks = this.tasks.filter((item) => item.id !== task.id)),
      error: (error) => console.log(error),
    });
  }
  toggleReminder(task: Task): void {
    task.reminder = !task.reminder;
    this.taskService.updateTaskReminder(task).subscribe();
  }
  addTask(task: Task) {
    this.taskService.addTask(task).subscribe({
      next: (task) => this.tasks.push(task),
      error: (error) => console.log(error),
    });
  }
}
