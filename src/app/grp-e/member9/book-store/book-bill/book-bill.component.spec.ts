import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookBillComponent } from './book-bill.component';

describe('BookBillComponent', () => {
  let component: BookBillComponent;
  let fixture: ComponentFixture<BookBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookBillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
