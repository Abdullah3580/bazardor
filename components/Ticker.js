"use client";
import {useFetch} from "@/lib/api";
import {toBn,unitBn} from "@/lib/format";
export default function Ticker(){
  const {d}=useFetch("/products");
  if(!Array.isArray(d))return null;
  return(<div className="bg-green-900 text-white overflow-hidden whitespace-nowrap text-sm py-2"><div className="ticker inline-flex gap-8 pl-4">
    {[...d,...d].map((p,i)=>{const c=p.change||{};return <span key={i}>{p.image} {p.nameBn} {toBn(p.today)} টাকা/{unitBn(p.unit)} <b className={c.dir==="up"?"text-green-300":c.dir==="down"?"text-red-300":"text-gray-300"}>{c.dir==="up"?"▲":c.dir==="down"?"▼":"—"} {toBn(c.pct)}%</b></span>;})}
  </div></div>);
}
