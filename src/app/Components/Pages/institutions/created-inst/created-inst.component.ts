import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { EventService } from './../../../../Services/event.service';
import { DataService } from './../../../../Services/data.service';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-created-inst',
  templateUrl: './created-inst.component.html',
  styleUrls: ['./created-inst.component.scss'],
})
export class CreatedInstComponent implements OnInit {
  public gridBranchData: any[] = [];

  public createinstitutions: any;
  public createbranch: any;

  public isDisabled = true;
  public value = '';
  public valueNumber = '995';
  public mask = '000-000000000';

  public showOptions: Array<string> = ['ნახვა', 'რედაქტირება'];

  constructor(
    public eventService: EventService,
    public formBuilder: FormBuilder,
    private eventsService: EventService,
    private router: Router,
    private dataService: DataService
  ) {
    this.myFormTemplate = new FormGroup({
      identification: new FormControl(''),
      name: new FormControl('გელას აკადემია', Validators.required),
      number: new FormControl('', Validators.required),
    });
  }

  myFormTemplate = this.formBuilder.group({
    identification: [''],
    name: [''],
    number: [],
  });

  ngOnInit(): void {
    this.eventService.getBranches().subscribe(
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

    this.dataService.branchSubject.subscribe((data: any) => {
      if (Object.keys(data).length > 0) {
        let identification = data.pid;
        let name = data.name;
        let number = data.number;

        this.myFormTemplate.get('identification')?.setValue(identification);
        this.myFormTemplate.get('name')?.setValue(name);
        this.myFormTemplate.get('number')?.setValue(number);
      }
    });
  }

  createBranch() {
    this.eventsService.getOneInst().subscribe((data: any) => {
      this.router.navigate(['/institutions', data.id, 'branches', 'create']);
      this.createbranch = data.branches;
      console.log(data.branches);
    });
  }

  onItemClick(item: any, dataItem: any) {
    if (item === 'ნახვა') {
      console.log(item, dataItem);
      this.dataService.branchSubject.next(dataItem);
      this.router.navigate(['/institutions', 1, 'branches', dataItem.id]);
    } else if (item === 'რედაქტირება') {
      console.log(item, dataItem);
      this.dataService.branchSubject.next(dataItem);
      this.router.navigate([
        '/institutions',
        1,
        'branches',
        dataItem.id,
        'edit',
      ]);
    }
  }
}
