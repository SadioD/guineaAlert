import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacListPage } from './pac-list.page';

describe('PacListPage', () => {
  let component: PacListPage;
  let fixture: ComponentFixture<PacListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
