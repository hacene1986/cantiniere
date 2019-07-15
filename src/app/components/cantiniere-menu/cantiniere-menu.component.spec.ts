import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CantiniereMenuComponent } from './cantiniere-menu.component';

describe('CantiniereMenuComponent', () => {
  let component: CantiniereMenuComponent;
  let fixture: ComponentFixture<CantiniereMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CantiniereMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CantiniereMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
