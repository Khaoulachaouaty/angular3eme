import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercheParEditeurComponent } from './recherche-par-editeur.component';

describe('RechercheParEditeurComponent', () => {
  let component: RechercheParEditeurComponent;
  let fixture: ComponentFixture<RechercheParEditeurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RechercheParEditeurComponent]
    });
    fixture = TestBed.createComponent(RechercheParEditeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
