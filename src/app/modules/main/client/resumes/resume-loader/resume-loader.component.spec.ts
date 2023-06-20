import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeLoaderComponent } from './resume-loader.component';

describe('ResumeLoaderComponent', () => {
  let component: ResumeLoaderComponent;
  let fixture: ComponentFixture<ResumeLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResumeLoaderComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ResumeLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
