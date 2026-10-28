import {describe,it,expect} from 'vitest';
import {score,rating,redLightViolation,crossingViolation} from './scoring';
describe('rules',()=>{
 it('red light counts only when moving',()=>{expect(redLightViolation('r',5)).toBe(true);expect(redLightViolation('r',0.5)).toBe(false);expect(redLightViolation('g',9)).toBe(false)});
 it('crossing needs pedestrian and speed',()=>{expect(crossingViolation(true,6)).toBe(true);expect(crossingViolation(false,6)).toBe(false);expect(crossingViolation(true,1)).toBe(false)});
});
describe('score',()=>{
 it('clean run is 100',()=>expect(score({})).toBe(100));
 it('applies penalties and bonus',()=>expect(score({red:1,hit:2,stop:1})).toBe(100-15-20+3));
 it('never below 0',()=>expect(score({red:20})).toBe(0));
 it('ratings',()=>{expect(rating(95)).toMatch(/Exemplary/);expect(rating(20)).toBe('Unsafe')});
});
