import { CreateInstComponent } from './../create-inst/create-inst.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from './../../../../Services/task.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-create-branch',
  templateUrl: './create-branch.component.html',
  styleUrls: ['./create-branch.component.scss'],
})
export class CreateBranchComponent implements OnInit {
  hereDataId: any;
  createBranches: any[] = [];
  public gridBranchData: any[] = [];

  public showEdit: Array<string> = ['რედაქტირება', 'ნახვა'];
  // public institutionName = this.createInstComponent.myFormTemplate.value.name.observable.subscribe(
  //   (names: any) => console.log(names)
  // );

  // needs to receive data from create-inst, form name value

  public institutionName = 'გელას აკადემია';
  public value = '';
  isShow = false;
  textShow = true;

  constructor(
    public formBuilder: FormBuilder,
    private taskService: TaskService,
    private createInstComponent: CreateInstComponent,
    private route: ActivatedRoute
  ) {
    this.branchForm = new FormGroup({
      address: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
    });
  }

  branchForm = this.formBuilder.group({
    address: [''],
    name: [''],
  });

  ngOnInit(): void {
    let data = this.route.snapshot.params;
    this.route.params.subscribe((params) => {
      console.log(params);
    });
  }

  //on Submit
  createBranch() {
    this.taskService.createBranch(this.branchForm.value).subscribe(
      (data: any) => {
        this.createBranches = data.data;
        this.gridBranchData = data.data;
        console.log(data.data);
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            console.log(err);
          }
        }
      }
    );
    this.isShow = false;
    this.textShow = false;
  }
}
