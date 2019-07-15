import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecapCantiniereComponent } from './recap-cantiniere.component';

describe('RecapCantiniereComponent', () => {
  let component: RecapCantiniereComponent;
  let fixture: ComponentFixture<RecapCantiniereComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecapCantiniereComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecapCantiniereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
