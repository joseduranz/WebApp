import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexAdministradorComponent } from './index-administrador.component';

describe('IndexAdministradorComponent', () => {
  let component: IndexAdministradorComponent;
  let fixture: ComponentFixture<IndexAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexAdministradorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
