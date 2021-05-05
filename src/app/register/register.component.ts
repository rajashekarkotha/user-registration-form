import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MustMatch } from '../helpers/must-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})


export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
      private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          firstName: [null, [Validators.required, Validators.pattern("[a-zA-Z ]*")]],
          lastName: [null, [Validators.required, Validators.pattern("[a-zA-Z ]*")]],
          mobileNumber: [null, [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
          email: ['', [Validators.required, Validators.email]],
          dateOfBirth: [null, Validators.required],
          address: [null],
          city: [null],
          state: [null],
          password: [null, [Validators.required, Validators.minLength(8)]],
          confirmPassword: [null, [Validators.required]]
      },{
        validator: MustMatch('password', 'confirmPassword')
      });
  }

  // convenience getter for easy access to form fields
  get warn() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;
      console.log(this.registerForm)
      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }else{
        if(this.registerForm.status == "VALID"){
          alert('User registered Successfully' + JSON.stringify(this.registerForm.value, null, 4));
          this.onReset();
        }
      }
  }
  onReset() {
    this.submitted = false;
    this.registerForm.reset();
}
}
