import { TaskService } from './task.service';
import { HttpInterceptor } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(req: any, next: any) {
    let taskService = this.injector.get(TaskService);
    let retokenReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${taskService.getToken()}`,
      },
    });
    return next.handle(retokenReq);
  }
}
