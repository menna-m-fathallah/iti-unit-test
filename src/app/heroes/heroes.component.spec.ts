import { ComponentFixture, TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { HeroService } from "../hero.service";
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA, Component, Input, Directive } from '@angular/core';
import { HeroesComponent } from "./heroes.component";
import { componentFactoryName } from "@angular/compiler";
import { Hero } from "../hero";
import { HeroComponent } from "../hero/hero.component";
describe('HeroesComponent (shallow test)', () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROES;


    // @Component({
    //     selector: 'app-hero',
    //     template: '<div></div>'
    // })
    // class FakeHeroComponent {
    //     @Input() hero: Hero
    // }

    beforeEach(() => {

        HEROES = [
            { id: 1, name: 'menna', strength: 8 },
            { id: 2, name: 'ali', strength: 24 },
            { id: 3, name: 'ahmed', strength: 55 }
        ];

        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'DeleteHero']);

        TestBed.configureTestingModule({
            declarations: [HeroesComponent,HeroComponent],
            providers: [
                { provide: HeroService, useValue: mockHeroService }
            ],
            schemas:[NO_ERRORS_SCHEMA]
        });

        fixture = TestBed.createComponent(HeroesComponent);
    });

    it("if service return array correct component will updated", () => {
        //1
        mockHeroService.getHeroes.and.returnValue(of(HEROES))

        //2
        // start life cycle hooks or update html
        fixture.detectChanges()
        //3
        expect(fixture.componentInstance.heroes.length).toBe(3);
    })

    it('test if template parse array into li', () => {

        //1
        mockHeroService.getHeroes.and.returnValue(of(HEROES))

        //2
        // start life cycle hooks or update html
        fixture.detectChanges()

        //3
        let items = fixture.debugElement.queryAll(By.css('li'));
        expect(items.length).toBe(HEROES.length);
    })

    it('test if template parse array into li', () => {

        //1
        mockHeroService.getHeroes.and.returnValue(of(HEROES))

        //2
        // start life cycle hooks or update html
        fixture.detectChanges()

        //3
        let items = fixture.debugElement.queryAll(By.directive(HeroComponent));
        expect(items.length).toBe(HEROES.length);
    })

    it('test if template parse array into li', () => {

        //1
        mockHeroService.getHeroes.and.returnValue(of(HEROES))

        //2
        // start life cycle hooks or update html
        fixture.detectChanges()

        //3
        let items = fixture.debugElement.queryAll(By.directive(HeroComponent));

        for(let i=0; i<HEROES.length;i++){
           expect(items.componentInstance.hero) 
        }
        // expect(items.length).toBe(HEROES.length);
    })


});