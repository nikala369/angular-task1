import { EventService } from './../../../../Services/event.service';
import { ActivatedRoute } from '@angular/router';
import { DataService } from './../../../../Services/data.service';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-edit-branch',
  templateUrl: './edit-branch.component.html',
  styleUrls: ['./edit-branch.component.scss'],
})
export class EditBranchComponent implements OnInit {
  public institutionName = 'გელას აკადემია';

  isShow = false;
  textShow = true;

  constructor(
    public formBuilder: FormBuilder,
    public dataService: DataService,
    public route: ActivatedRoute,
    public eventService: EventService
  ) {
    this.branchFormEdit = new FormGroup({
      address: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
    });
  }

  branchFormEdit = this.formBuilder.group({
    address: [''],
    name: [''],
  });

  ngOnInit(): void {
    this.dataService.branchSubject.subscribe((data: any) => {
      if (Object.keys(data).length > 0) {
        let branchId = data.id;
        let institutionId = data.institution_id;

        this.branchFormEdit.get('address')?.setValue(data.address);
        this.branchFormEdit.get('name')?.setValue(data.manager_name);
      }
    });
  }

  clickSave() {
    this.isShow = true;
    this.textShow = false;
  }
}
