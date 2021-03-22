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

  institutions: any[] = [];
  public gridData: any[] = [];
  public showEdit: Array<string> = ['რედაქტირება', 'ნახვა'];

  constructor(public eventsService: EventService) {
    this.myForm = new FormGroup({
      name: new FormControl('', Validators.required),
      identification: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.eventsService.getInstitutionsAll().subscribe((data) => {
      this.gridData = data.data;
      this.institutions = data.data;
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
}
