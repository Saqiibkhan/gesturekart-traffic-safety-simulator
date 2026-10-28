// MediaPipe Pose landmarks: 11/12 shoulders, 15/16 wrists. Normalised by shoulder width.
export type Lm={x:number;y:number;visibility?:number};
export type Ctl={steer:number;throttle:number;brake:boolean;tracking:boolean};
const ema=(p:number,n:number,a:number)=>p+(n-p)*a;
const clamp=(v:number,a:number,b:number)=>Math.max(a,Math.min(b,v));
export class GestureEngine{
 private neutral:number|null=null;private s={steer:0,throttle:0};private lost=0;
 constructor(private o={alpha:.3,dead:.08,lostMs:400}){}
 private sw(l:Lm[]){return Math.hypot(l[11].x-l[12].x,l[11].y-l[12].y)||1}
 private hands(l:Lm[]){return Math.hypot(l[15].x-l[16].x,l[15].y-l[16].y)/this.sw(l)}
 calibrate(l:Lm[]){this.neutral=this.hands(l)}
 get calibrated(){return this.neutral!==null}
 update(l:Lm[]|null,dtMs:number):Ctl{
  const ok=l&&this.neutral!==null&&[11,12,15,16].every(i=>(l[i].visibility??1)>=.5);
  if(!ok){this.lost+=dtMs;
   if(this.lost>this.o.lostMs){this.s.steer=ema(this.s.steer,0,.2);this.s.throttle=ema(this.s.throttle,0,.2)}
   return{...this.s,brake:this.lost>this.o.lostMs*2,tracking:false}} // lost tracking: ease off, then brake
  this.lost=0;const w=this.sw(l!);
  const dz=(v:number)=>Math.abs(v)<this.o.dead?0:v;
  const tilt=(l![16].y-l![15].y)/w; // steering-wheel tilt
  const spread=this.hands(l!)-this.neutral!;
  this.s.steer=ema(this.s.steer,clamp(dz(tilt*2),-1,1),this.o.alpha);
  this.s.throttle=ema(this.s.throttle,clamp(dz(spread*2),0,1),this.o.alpha);
  const brake=l![15].y<l![11].y||l![16].y<l![12].y; // either hand raised above shoulder
  return{steer:this.s.steer,throttle:brake?0:this.s.throttle,brake,tracking:true}}
}
