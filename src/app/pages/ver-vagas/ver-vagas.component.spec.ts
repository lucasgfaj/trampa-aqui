import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerVagasComponent } from './ver-vagas.component';

describe('VerVagasComponent', () => {
  let component: VerVagasComponent;
  let fixture: ComponentFixture<VerVagasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerVagasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerVagasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
