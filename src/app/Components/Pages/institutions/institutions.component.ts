import { TaskService } from './../../../Services/task.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-institutions',
  templateUrl: './institutions.component.html',
  styleUrls: ['./institutions.component.scss'],
})
export class InstitutionsComponent implements OnInit {
  public personal: any = [];

  constructor(public _taskservice: TaskService) {}

  ngOnInit(): void {}
}
