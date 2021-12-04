import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexPersonaComponent } from './index-persona.component';

describe('IndexPersonaComponent', () => {
  let component: IndexPersonaComponent;
  let fixture: ComponentFixture<IndexPersonaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexPersonaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
