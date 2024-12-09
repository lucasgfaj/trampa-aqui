import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { FormValidatorComponent } from './pages/form-validator/form-validator.component';
import { EntityListComponent } from './pages/entity-list/entity-list.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [EntityListComponent, FormValidatorComponent, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'trampa-aqui';
  
}
