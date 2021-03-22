import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-branch',
  templateUrl: './edit-branch.component.html',
  styleUrls: ['./edit-branch.component.scss'],
})
export class EditBranchComponent implements OnInit {
  public institutionName = 'გელას აკადემია';

  isShow = false;
  textShow = true;

  constructor(public formBuilder: FormBuilder) {
    this.branchFormEdit = new FormGroup({
      address: new FormControl('ჩოლოყაშვილის ქუჩა'),
      name: new FormControl('გელა'),
    });
  }

  ngOnInit(): void {}

  branchFormEdit = this.formBuilder.group({
    address: [''],
    name: [''],
  });
}
