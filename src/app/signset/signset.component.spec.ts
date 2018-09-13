import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignsetComponent } from './signset.component';

describe('SignsetComponent', () => {
  let component: SignsetComponent;
  let fixture: ComponentFixture<SignsetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignsetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
