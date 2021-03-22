import { DataService } from './../../../../Services/data.service';
import { EventService } from './../../../../Services/event.service';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from './../../../../Services/task.service';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-inst',
  templateUrl: './create-inst.component.html',
  styleUrls: ['./create-inst.component.scss'],
})
export class CreateInstComponent implements OnInit {
  public createinstitutions: any;
  public createbranch: any;
  public gridBranchData: any[] = [];

  public showOptions: Array<string> = ['ნახვა', 'რედაქტირება'];

  public value = '';
  public valueNumber = '995';
  public mask = '000-000000000';

  isShow = false;
  gridShow = true;

  constructor(
    public formBuilder: FormBuilder,
    private taskService: TaskService,
    private eventsService: EventService,
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService
  ) {
    this.myFormTemplate = new FormGroup({
      identification: new FormControl(''),
      name: new FormControl('', Validators.required),
      number: new FormControl('', Validators.required),
    });
  }

  myFormTemplate = this.formBuilder.group({
    identification: [''],
    name: [''],
    number: [],
  });

  ngOnInit(): void {}

  onSubmit() {
    this.taskService.createinst(this.myFormTemplate.value).subscribe(
      (data: any) => {
        this.router.navigate(['/institutions', data.id]);
        this.createinstitutions = data;
        console.log(data);
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            console.log(err);
          }
        }
      }
    );

    this.eventsService.getBranches().subscribe(
      (data: any) => {
        this.gridBranchData = data.data;
      },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            console.log(err);
          }
        }
      }
    );
  }

  toggleDisplay() {
    this.isShow = true;
    this.gridShow = false;
  }

  createBranch() {
    this.eventsService.getOneInst().subscribe((data: any) => {
      this.router.navigate([
        '/institutions',
        this.createinstitutions.id,
        'branches',
        'create',
      ]);
      this.createbranch = data.branches;
      console.log(data.branches);
    });
  }

  onItemClick(item: any, dataItem: any) {
    if (item === 'ნახვა') {
      console.log(item, dataItem);
      this.dataService.branchSubject.next(dataItem);
      this.router.navigate([
        '/institutions',
        this.createinstitutions.id,
        'branches',
        dataItem.id,
      ]);
    } else if (item === 'რედაქტირება') {
      console.log(item, dataItem);
      this.dataService.branchSubject.next(dataItem);
      this.router.navigate([
        '/institutions',
        this.createinstitutions.id,
        'branches',
        dataItem.id,
        'edit',
      ]);
    }
  }
}
