import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderContainerComponent } from './loader-container.component';

describe('LoaderComponent', () => {
  let component: LoaderContainerComponent;
  let fixture: ComponentFixture<LoaderContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoaderContainerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
