import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListvalvesComponent } from './listvalves.component';

describe('ListvalvesComponent', () => {
  let component: ListvalvesComponent;
  let fixture: ComponentFixture<ListvalvesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListvalvesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListvalvesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
