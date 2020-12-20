import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AircraftStatusComponent } from './aircraft.status.component';

describe('AircraftStatusComponent', () => {
  let component: AircraftStatusComponent;
  let fixture: ComponentFixture<AircraftStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AircraftStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AircraftStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
