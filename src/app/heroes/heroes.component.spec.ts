import { HeroesComponent } from './heroes.component';
import { of } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroService } from '../hero.service';
import { NO_ERRORS_SCHEMA, Component, Input, Directive } from '@angular/core';
import { Hero } from '../hero';
import { By } from '@angular/platform-browser';
import { HeroComponent } from '../hero/hero.component';


describe('HeroesComponent', () => {
    let component: HeroesComponent;
    let HEROES;
    let mockService;

    beforeEach(() => {
        HEROES = [
            { id: 1, name: 'SpiderDude', strength: 8 },
            { id: 2, name: 'Wonderful Woman', strength: 24 },
            { id: 3, name: 'SuperDude', strength: 55 }
        ];

        mockService = jasmine.createSpyObj(['getHeroes', 'deleteHero', 'addHero']);

        component = new HeroesComponent(mockService);
    });

    describe('delete', () => {
        it('should remove the indicated hero from the heroes list', () => {
            // arrange
            mockService.deleteHero.and.returnValue(of(true));
            component.heroes = HEROES;
            component.showAlert = jasmine.createSpy()

            // act
            component.delete(HEROES[2]);

            // assert
            expect(component.heroes.length).toBe(2);
            expect(component.showAlert).toHaveBeenCalled();
        });

        it('should call deleteHere method', () => {
            // arrange
            mockService.deleteHero.and.returnValue(of(true));
            component.heroes = HEROES;

            // act
            component.delete(HEROES[2]);

            // assert
            expect(mockService.deleteHero).toHaveBeenCalled();
            expect(mockService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
        });
    });
});

describe('HeroesComponent (shallow test)', () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROES;

    beforeEach(() => {

        HEROES = [
            { id: 1, name: 'SpiderDude', strength: 8 },
            { id: 2, name: 'Wonderful Woman', strength: 24 },
            { id: 3, name: 'SuperDude', strength: 55 }
        ];

        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'DeleteHero']);

        TestBed.configureTestingModule({
            declarations: [HeroesComponent],
            providers: [
                { provide: HeroService, useValue: mockHeroService }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        });

        fixture = TestBed.createComponent(HeroesComponent);
    });

    it('should set heroes correctly from the service', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        expect(fixture.componentInstance.heroes.length).toBe(3);
    });

    it('should create one li for each hero', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        let deLI = fixture.debugElement.queryAll(By.css('li'));
        expect(deLI.length).toBe(3);
    });
});

describe('HeroesComponent (shallow test 2)', () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROES;

    @Component({
        selector: 'app-hero',
        template: `<div></div>`
    })
    class FakeHeroComponent {
        @Input() hero: Hero;
    }

    beforeEach(() => {

        HEROES = [
            { id: 1, name: 'SpiderDude', strength: 8 },
            { id: 2, name: 'Wonderful Woman', strength: 24 },
            { id: 3, name: 'SuperDude', strength: 55 }
        ];

        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'DeleteHero']);

        TestBed.configureTestingModule({
            declarations: [HeroesComponent, FakeHeroComponent],
            providers: [
                { provide: HeroService, useValue: mockHeroService }
            ],
        });

        fixture = TestBed.createComponent(HeroesComponent);
    });

    it('should set heroes correctly from the service', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        expect(fixture.componentInstance.heroes.length).toBe(3);
    });

    it('should create one li for each hero', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        let deLI = fixture.debugElement.queryAll(By.css('li'));
        expect(deLI.length).toBe(3);
    });
});
