import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CantinierePlatComponent } from './cantiniere-plat.component';

describe('CantinierePlatComponent', () => {
  let component: CantinierePlatComponent;
  let fixture: ComponentFixture<CantinierePlatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CantinierePlatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CantinierePlatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
