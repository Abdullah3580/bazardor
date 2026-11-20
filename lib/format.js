// বাংলা অঙ্ককে ইংরেজি অঙ্কে রূপান্তর করে সংখ্যা বানায় (sort-এর সময় string নয়, numeric মান ধরা হয়)
const BN="০১২৩৪৫৬৭৮৯";
export const num=(v)=>{
  if(typeof v==="number")return v;
  const s=String(v??"").replace(/[০-৯]/g,(d)=>BN.indexOf(d)).replace(/[,৳\s]/g,"");
  const n=parseFloat(s);
  return Number.isFinite(n)?n:0;
};
export const toBn=(n)=>num(n).toLocaleString("bn-BD",{maximumFractionDigits:1});
const U={kg:"কেজি",liter:"লিটার",litre:"লিটার",l:"লিটার",dozen:"ডজন",piece:"পিস",pcs:"পিস",hali:"হালি"};
export const unitBn=(u)=>U[String(u).toLowerCase()]||u;
