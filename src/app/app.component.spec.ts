import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create component and render title', () => {
    fixture.detectChanges();
    const h1 = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(component).toBeTruthy();
    expect(h1.innerHTML).toEqual('Računi');
  });

  it('should display popover', fakeAsync(() => {
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();
    tick(50);

    const p = fixture.debugElement.queryAll(By.css('p'));

    expect(p[0].nativeElement.innerHTML.trim()).toEqual(
      'S klikom na vsrtico v tabeli računov lahko izberete račun in si pogledate njegove informacije na desnem delu ekrana.'
    );
    expect(p[1].nativeElement.innerHTML.trim()).toEqual('Računom, ki so označeni z rdečo je potekel rok.');
  }));
});
