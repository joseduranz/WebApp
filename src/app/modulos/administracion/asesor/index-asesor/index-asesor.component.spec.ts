import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexAsesorComponent } from './index-asesor.component';

describe('IndexAsesorComponent', () => {
  let component: IndexAsesorComponent;
  let fixture: ComponentFixture<IndexAsesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexAsesorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexAsesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
