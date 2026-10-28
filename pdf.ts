import {jsPDF} from 'jspdf';
export function downloadScoreCard(o:{user:string;mission:string;score:number;rating:string;counts:Record<string,number>;feedback:string[]}){
 const d=new jsPDF();d.setFontSize(20);d.text('GestureKart: Civic Driving Score Card',14,20);
 d.setFontSize(12);d.text(`${o.user} - ${o.mission}`,14,30);d.setFontSize(32);d.text(`${o.score}/100  ${o.rating}`,14,48);
 d.setFontSize(12);let y=62;Object.entries(o.counts).forEach(([k,v])=>{d.text(`${k}: ${v}`,14,y);y+=7});
 y+=4;o.feedback.forEach(f=>{d.text(d.splitTextToSize(f,180),14,y);y+=12});d.save('gesturekart-score.pdf');
}
