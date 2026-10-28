import {FilesetResolver,PoseLandmarker} from '@mediapipe/tasks-vision';
import {GestureEngine,Ctl} from './gestureEngine';
export async function startPose(video:HTMLVideoElement,engine:GestureEngine,onCtl:(c:Ctl)=>void){
 const fs=await FilesetResolver.forVisionTasks('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm');
 const pose=await PoseLandmarker.createFromOptions(fs,{baseOptions:{modelAssetPath:'/models/pose_landmarker_lite.task'},runningMode:'VIDEO',numPoses:1});
 let last=performance.now();
 const tick=()=>{const now=performance.now();const r=pose.detectForVideo(video,now);
  onCtl(engine.update(r.landmarks[0]??null,now-last));last=now;requestAnimationFrame(tick)};
 tick();
}
