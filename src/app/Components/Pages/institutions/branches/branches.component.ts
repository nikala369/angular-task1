import { DataService } from './../../../../Services/data.service';
import { EventService } from './../../../../Services/event.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss'],
})
export class BranchesComponent implements OnInit {
  public gridPersonal: any[] = [];

  public showEdit: Array<string> = ['რედაქტირება', 'ნახვა'];

  public institutionName = 'გელას აკადემია';
  public isDisabled = true;

  constructor(
    private route: ActivatedRoute,
    public eventService: EventService,
    public formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataService
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
    this.dataService.branchSubject.subscribe((data: any) => {
      if (Object.keys(data).length > 0) {
        let branchId = data.id;
        let institutionId = data.institution_id;

        this.branchForm.get('address')?.setValue(data.address);
        this.branchForm.get('name')?.setValue(data.manager_name);
      }
    });

    // this.route.params.subscribe((data) => {
    //   if (data) {
    //     let branchId = data.branchId;
    //     let institutionId = data.institutionId;

    //     this.eventService
    //       .getInstitutionBranch(institutionId, branchId)
    //       .subscribe((branch) => {
    //         console.log(branch);
    //       });
    //   }
    // });
    // let dataParam = this.route.snapshot.params;
    // console.log(dataParam);

    this.eventService.getOneInst().subscribe(
      (data: any) => {
        console.log(data);
        this.gridPersonal = data.personal;
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

  createPersonal() {}
}
