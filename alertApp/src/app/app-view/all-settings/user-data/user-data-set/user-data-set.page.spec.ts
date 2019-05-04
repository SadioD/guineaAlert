import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDataSetPage } from './user-data-set.page';

describe('UserDataSetPage', () => {
  let component: UserDataSetPage;
  let fixture: ComponentFixture<UserDataSetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDataSetPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDataSetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
