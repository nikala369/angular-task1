import { Router } from '@angular/router';
import { TaskService } from './../../Services/task.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public formGroup!: FormGroup;
  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  loginProcess() {
    if (!this.formGroup.valid) {
      console.log('failed');
      this.router.navigate(['/']);
    } else {
      this.taskService.login(this.formGroup.value).subscribe(
        (res) => {
          console.log(res);
          localStorage.setItem('token', res.token);
          this.router.navigate(['/institutions']);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
