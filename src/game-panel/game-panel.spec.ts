import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamePanel } from './game-panel';

describe('GamePanel', () => {
  let component: GamePanel;
  let fixture: ComponentFixture<GamePanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GamePanel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamePanel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
