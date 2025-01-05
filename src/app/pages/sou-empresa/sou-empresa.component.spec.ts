import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SouEmpresaComponent } from './sou-empresa.component';

describe('SouEmpresaComponent', () => {
  let component: SouEmpresaComponent;
  let fixture: ComponentFixture<SouEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SouEmpresaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SouEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
