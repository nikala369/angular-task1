import { TaskService } from './Services/task.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'First Task';
  constructor(private taskService: TaskService) {}

  ngOnInit() {}

  loadApiData() {}
}
