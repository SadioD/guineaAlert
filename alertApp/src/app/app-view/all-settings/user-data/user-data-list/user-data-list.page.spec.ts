import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDataListPage } from './user-data-list.page';

describe('UserDataListPage', () => {
  let component: UserDataListPage;
  let fixture: ComponentFixture<UserDataListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDataListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDataListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
