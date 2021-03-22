import { TaskService } from './Services/task.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private taskService: TaskService, private router: Router) {}

  canActivate(): boolean {
    if (this.taskService.loggedIn()) {
      return true
    } else {
      this.router.navigate(['/login'])
      return false
    }
  }

}
