import { TestBed } from '@angular/core/testing';

import { MenuCantiniereService } from './menu-cantiniere.service';

describe('MenuCantiniereService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MenuCantiniereService = TestBed.get(MenuCantiniereService);
    expect(service).toBeTruthy();
  });
});
