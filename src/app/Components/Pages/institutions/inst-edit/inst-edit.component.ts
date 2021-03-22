import { EventService } from './../../../../Services/event.service';
import { DataService } from './../../../../Services/data.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-inst-edit',
  templateUrl: './inst-edit.component.html',
  styleUrls: ['./inst-edit.component.scss'],
})
export class InstEditComponent implements OnInit {
  public value = '';
  public valueNumber = '995';
  public mask = '000000000';

  isShow = false;
  textShow = true;

  constructor(
    public formBuilder: FormBuilder,
    private eventsService: EventService,
    private router: Router,
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

  ngOnInit(): void {
    this.dataService.branchSubject.subscribe((data: any) => {
      if (Object.keys(data).length > 0) {
        let dataIdent = data.pid;
        let dataName = data.name;
        let dataNumber = data.number;

        this.myFormTemplate.get('identification')?.setValue(dataIdent);
        this.myFormTemplate.get('name')?.setValue(dataName);
        this.myFormTemplate.get('number')?.setValue(dataNumber);
      }
    });
  }

  toggleDisplay() {
    this.isShow = true;
    this.textShow = false;
    this.router.navigate(['/institutions']);
    console.log('saved');
  }
}
