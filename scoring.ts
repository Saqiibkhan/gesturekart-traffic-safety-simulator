export const CFG={start:100,redLight:-15,crossing:-12,collision:-10,speeding:-2,properStop:3,limitKmh:50};
export type Ev='red'|'cross'|'hit'|'speed'|'stop';
const pts:Record<Ev,number>={red:CFG.redLight,cross:CFG.crossing,hit:CFG.collision,speed:CFG.speeding,stop:CFG.properStop};
export const redLightViolation=(state:string,speed:number)=>state==='r'&&speed>2;
export const crossingViolation=(pedOnRoad:boolean,speed:number)=>pedOnRoad&&speed>3;
export const score=(c:Partial<Record<Ev,number>>)=>Math.max(0,CFG.start+(Object.keys(c) as Ev[]).reduce((s,k)=>s+pts[k]*(c[k]??0),0));
export const rating=(s:number)=>s>=90?'Exemplary Road Citizen':s>=70?'Safe Driver':s>=45?'Needs Practice':'Unsafe';
