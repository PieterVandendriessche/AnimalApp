import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalStoreComponent } from './animal-store.component';

describe('AnimalStoreComponent', () => {
  let component: AnimalStoreComponent;
  let fixture: ComponentFixture<AnimalStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimalStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
