import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEditeurComponent } from './update-editeur.component';

describe('UpdateEditeurComponent', () => {
  let component: UpdateEditeurComponent;
  let fixture: ComponentFixture<UpdateEditeurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateEditeurComponent]
    });
    fixture = TestBed.createComponent(UpdateEditeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
