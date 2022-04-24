import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../shared/model/user";
import {AuthService} from "../../shared/auth.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private snackBar: MatSnackBar,
              private router: Router) {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      name: [null, Validators.required],
      password: [null, Validators.required],
      isAdmin: [null],
    });
  }

  ngOnInit(): void {
  }

  get emailFormControl(): AbstractControl {
    return this.form.controls['email'];
  }

  get passwordFormControl(): AbstractControl {
    return this.form.controls['password'];
  }

  get nameFormControl(): AbstractControl {
    return this.form.controls['name'];
  }

  getUser(): User {
    return {
      email: this.form.get('email')?.value,
      name: this.form.get('name')?.value,
      password: this.form.get('password')?.value,
      isAdmin: this.form.get('isAdmin')?.value,
    }
  }


  onSubmit() {
    if (this.form.valid) {
      this.authService.register(this.getUser()).subscribe({
        next: (res) => {
          console.log("User is logged in");
          this.router.navigateByUrl('/');
        }
        ,
        error: (error) => {
          this.form.controls['email'].setErrors({'incorrect': true});
          this.snackBar.open("Email existe déjà dans la base de donnée", "Fermer", {
            duration: 3000
          });
        }
      });
    }
  }

}
