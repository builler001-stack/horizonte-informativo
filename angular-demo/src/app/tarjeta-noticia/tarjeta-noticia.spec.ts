import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TarjetaNoticia } from './tarjeta-noticia';

describe('TarjetaNoticia', () => {
  let component: TarjetaNoticia;
  let fixture: ComponentFixture<TarjetaNoticia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarjetaNoticia],
    }).compileComponents();

    fixture = TestBed.createComponent(TarjetaNoticia);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
