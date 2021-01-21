import { HeroesComponent } from './heroes.component';
import { of } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroService } from '../hero.service';
import { NO_ERRORS_SCHEMA, Component, Input, Directive } from '@angular/core';
import { Hero } from '../hero';
import { By } from '@angular/platform-browser';
import { HeroComponent } from '../hero/hero.component';

@Directive({
    selector: '[routerLink]',
    host: { '(click)': 'onClick()' }
})
class RouterLinkDirectiveStub {
    @Input('routerLink') linkParams: any;
    navigateTo: any = null;

    onClick() {
        this.navigateTo = this.linkParams;
    }
}

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

            // act
            component.delete(HEROES[2]);

            // assert
            expect(component.heroes.length).toBe(2);
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

describe('HeroesComponent (deep test)', () => {
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
            declarations: [HeroesComponent, HeroComponent, RouterLinkDirectiveStub],
            providers: [
                { provide: HeroService, useValue: mockHeroService }
            ],
            // schemas: [NO_ERRORS_SCHEMA]
        });

        fixture = TestBed.createComponent(HeroesComponent);
    });

    it('should render each hero as HeroComponent', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        fixture.detectChanges();

        const heroesComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));

        expect(heroesComponentDEs.length).toEqual(3);

        for (let i = 0; i < heroesComponentDEs.length; i++) {
            expect(heroesComponentDEs[i].componentInstance.hero).toEqual(HEROES[i]);
        }
    });

    it('should call heroService.deleteHero when the hero Component\'s delete button is clicked', () => {

        spyOn(fixture.componentInstance, 'delete');

        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        fixture.detectChanges();

        const heroComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));
        // heroComponentDEs[0].query(By.css('button')).triggerEventHandler('click', {
        //     stopPropagation: () => { }
        // });
        // (<HeroComponent>heroComponentDEs[0].componentInstance).delete.emit(undefined);
        heroComponentDEs[0].triggerEventHandler('delete', null);

        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
    });

    it('should add a new hero to the hero list when the add button is clicked', () => {
        // arrange
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();
        const name = 'MR. dude';
        mockHeroService.addHero.and.returnValue(of({ id: 5, name, strength: 11 }));

        const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
        const addButton = fixture.debugElement.queryAll(By.css('button'))[0];

        // act
        inputElement.value = name;
        addButton.triggerEventHandler('click', null);
        fixture.detectChanges();


        // assert
        const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;
        expect(heroText).toContain(name);

    });

    it('should have the correct route for the first hero', () => {
        // arrange
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));

        let routerLink = heroComponents[0]
            .query(By.directive(RouterLinkDirectiveStub)).injector.get(RouterLinkDirectiveStub);

        heroComponents[0].query(By.css('a')).triggerEventHandler('click', null);

        expect(routerLink.navigateTo).toBe('/detail/1');
    });
});
