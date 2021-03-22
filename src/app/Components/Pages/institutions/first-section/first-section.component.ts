import { Router } from '@angular/router';
import { DataService } from './../../../../Services/data.service';
import { EventService } from '../../../../Services/event.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-first-section',
  templateUrl: './first-section.component.html',
  styleUrls: ['./first-section.component.scss'],
})
export class FirstSectionComponent implements OnInit {
  public myForm: FormGroup;

  institutions: any;
  public gridData: any[] = [];
  public showOptions: Array<string> = ['რედაქტირება', 'ნახვა'];

  constructor(
    public eventsService: EventService,
    public dataService: DataService,
    public router: Router
  ) {
    this.myForm = new FormGroup({
      name: new FormControl('', Validators.required),
      identification: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.eventsService.getInstitutionsAll().subscribe((data) => {
      this.gridData = data.data;
      this.institutions = data.data;
      console.log(data.data);
    });
  }

  onSubmit() {
    if (this.myForm.status == 'INVALID') {
      alert('ფორმა არ არის ვალიდური');
    } else {
      this.eventsService.searchInstitutions(this.myForm.value).subscribe(
        (data: any) => {
          console.log(data.data);
          this.institutions = data.data;
          this.gridData = data.data;
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              console.log(err);
            }
          }
        }
      );
    }
  }

  onItemClick(item: any, dataItem: any) {
    if (item === 'რედაქტირება') {
      console.log(item, dataItem);
      this.dataService.branchSubject.next(dataItem);
      this.router.navigate(['/institutions', dataItem.id, 'edit']);
    } else if (item === 'ნახვა') {
      console.log(item, dataItem);
      this.dataService.branchSubject.next(dataItem);
      this.router.navigate(['/institutions', dataItem.id, 'created']);
    }
  }
}
