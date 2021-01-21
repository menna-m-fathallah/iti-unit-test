import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeroService } from '../hero.service';
import { HeroDetailComponent } from './hero-detail.component';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

describe('HeroDetail', () => {
    let fixture: ComponentFixture<HeroDetailComponent>, mockActivatedRoute,
        mockLocation, mockHeroService;

    beforeEach(() => {
        mockActivatedRoute = {
            snapshot: { paramMap: { get: () => '3' } }
        };
        mockLocation = jasmine.createSpyObj(['back']);
        mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);

        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [HeroDetailComponent],
            providers: [
                { provide: HeroService, useValue: mockHeroService },
                { provide: Location, useValue: mockLocation },
                { provide: ActivatedRoute, useValue: mockActivatedRoute }
            ]
        });
        fixture = TestBed.createComponent(HeroDetailComponent);

        mockHeroService.getHero.and.returnValue(of({ id: 3, name: 'SuperDude', strength: 11 }));
    });


    it('should render a hero name in h2 tag', () => {
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('h2')).nativeElement.textContent).toContain('SUPERDUDE');
    });
});
