import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  loading = false;

  signupForm!: FormGroup;

  constructor(private auth: AuthService, private fb: FormBuilder) {
    this.signupForm = this.fb.group({ email: [''], password: [''] });
  }

  ngOnInit() {}

  signup() {
    const { email, password } = this.signupForm.value;
    this.loading = true;
    this.auth.signup(email, password).subscribe((data) => {
      console.log('Signup successfull');
      console.log(data);
      this.loading = false;
    });
  }
}
