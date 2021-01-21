import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HeroService } from './hero.service';
import { TestBed, inject } from '@angular/core/testing';
import { MessageService } from './message.service';

describe('HeroServce', () => {
    let mockMessageService;

    beforeEach(() => {
        mockMessageService = jasmine.createSpyObj(['add']);

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                HeroService,
                { provide: MessageService, useValue: mockMessageService }
            ]
        });
    });


    describe('getHero', () => {
        it('should call get with the correct URL', inject(
            [HeroService, HttpTestingController],
            (service: HeroService, contoller: HttpTestingController) => {
                service.getHero(4).subscribe();

                const req = contoller.expectOne('api/heroes/4');
                req.flush({ id: 1, name: 'SuperDude', strength: 100 });
                contoller.verify();
            })
        );
    });
});