import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { AddUserReq } from '../../model/user/user.model';
import { addUser, editUser } from '../../store/action/dashboard.actions';
import {
  selectError,
  selectFormType,
  selectSelectedUser,
} from '../../store/selector/dashboard.selector';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  isEdit!: boolean;
  userForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
  });
  error = '';
  userId!: string;
  constructor(private store: Store, public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    this.store.select(selectError).subscribe((err) => {
      this.error = err as string;
    });
    this.store.select(selectFormType).subscribe((formType) => {
      this.isEdit = formType == 'EDIT';
    });
    if (this.isEdit) {
      this.store.select(selectSelectedUser).subscribe((user) => {
        this.userId = user?.id as string;
        this.userForm.patchValue({
          name: user?.name,
          email: user?.email,
          location: user?.location,
        });
      });
    }
  }
  save() {
    if (this.userForm.valid) {
      if (!this.isEdit) {
        this.store.dispatch(addUser({ user: this.userForm.value }));
        this.closeDialog();
      } else {
        this.store.dispatch(
          editUser({ user: { ...this.userForm.value, id: this.userId } })
        );
        this.closeDialog();
      }
    }
  }

  closeDialog() {
    this.activeModal.close();
  }
}
