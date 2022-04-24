import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/auth.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;


  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private snackBar: MatSnackBar,
              private router: Router) {

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get emailFormControl(): AbstractControl {
    return this.form.controls['email'];
  }

  get passwordFormControl(): AbstractControl {
    return this.form.controls['password'];
  }

  login() {
    const val = this.form.value;

    if (val.email && val.password) {
      this.authService.login(val.email, val.password)
        .subscribe({
          next: (res) => {
            console.log("User is logged in");
            this.router.navigateByUrl('/home');
          }
          ,
          error: (error) => {
            this.form.controls['email'].setErrors({'incorrect': true});
            this.form.controls['password'].setErrors({'incorrect': true});
            this.snackBar.open("Mot de passe ou email incorrect!", "Fermer", {
              duration: 3000
            });
          }
        });
    }
  }

  ngOnInit(): void {
  }

}
