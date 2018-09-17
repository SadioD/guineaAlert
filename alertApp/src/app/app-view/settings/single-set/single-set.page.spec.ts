import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleSetPage } from './single-set.page';

describe('SingleSetPage', () => {
  let component: SingleSetPage;
  let fixture: ComponentFixture<SingleSetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleSetPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleSetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
