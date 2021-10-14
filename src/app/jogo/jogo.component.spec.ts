import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JogoComponent } from './jogo.component';

describe('JogoComponent', () => {
  let component: JogoComponent;
  let fixture: ComponentFixture<JogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
