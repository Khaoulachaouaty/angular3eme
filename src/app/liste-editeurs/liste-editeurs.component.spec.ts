import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeEditeursComponent } from './liste-editeurs.component';

describe('ListeEditeursComponent', () => {
  let component: ListeEditeursComponent;
  let fixture: ComponentFixture<ListeEditeursComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeEditeursComponent]
    });
    fixture = TestBed.createComponent(ListeEditeursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
