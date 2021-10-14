import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaesperaComponent } from './salaespera.component';

describe('SalaesperaComponent', () => {
  let component: SalaesperaComponent;
  let fixture: ComponentFixture<SalaesperaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaesperaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaesperaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
