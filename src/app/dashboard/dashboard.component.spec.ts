import { of } from "rxjs";
import { DashboardComponent } from "./dashboard.component";

fdescribe("DashboardComponent", () => {
  let service, component
  beforeEach(() => {
    service = jasmine.createSpyObj('service', ['getHeroes'])
    component = new DashboardComponent(service);
  })

  it('getcomponentHeroes method', () => {
    //1
    service.getHeroes.and.returnValue(of([{
      id: 5,
      name: "string",
      strength: 5
    }]))
    //2
    component.getcomponentHeroes()
    //3
    expect(service.getHeroes).toHaveBeenCalled();
    expect(component.heroes.length).toBe(1)
  })
})