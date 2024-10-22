import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { UiService } from '../../core/ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
  });

  get username(): FormControl {
      return this.form.get('username') as FormControl;
  }

  get password(): FormControl {
      return this.form.get('password') as FormControl;
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  constructor(
      private authService: AuthService,
      private router: Router,
      private uiService: UiService
  ) {
      // this.authService.logout();
  }

  ngOnInit() {}

  login() {
      if (this.form.valid) {
          this.uiService.cargando(true);
          this.authService
              .login({email:this.form.value.email, password:this.form.value.password})
              .subscribe(
                  (value) => {
                      this.uiService.cargando(false).then(() => {
                          this.router.navigate([''], {skipLocationChange: true } );
                      });
                  },
                  (error) => {
                      this.uiService.cargando(false);
                      this.uiService.alerta(
                          'Credenciales incorrectas.',
                          'Error'
                      );
                  }
              );
      }
  }
}