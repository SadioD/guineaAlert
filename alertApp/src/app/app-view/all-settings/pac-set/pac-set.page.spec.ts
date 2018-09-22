import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacSetPage } from './pac-set.page';

describe('PacSetPage', () => {
  let component: PacSetPage;
  let fixture: ComponentFixture<PacSetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacSetPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacSetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
