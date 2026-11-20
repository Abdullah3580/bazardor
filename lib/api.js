"use client";
import {useEffect,useState} from "react";
const BASES=["https://openapi.programming-hero.com/api/bazardor","https://api.api-store.workers.dev/api/bazardor","https://api.abcz.workers.dev/api/bazardor"];

// API রেসপন্স সরাসরি array/object বা { data: ... } যেকোনো আকারে এলে সেটা সামলায়
function unwrap(j){
  if(Array.isArray(j))return j;
  if(j&&typeof j==="object"){
    for(const k of ["data","products","categories","result","items"]){
      if(j[k]!==undefined&&j[k]!==null)return j[k];
    }
  }
  return j;
}
async function get(p){
  for(const b of BASES){
    try{
      const r=await fetch(b+p);
      if(r.status===404)return null;
      if(r.ok)return unwrap(await r.json());
    }catch{}
  }
  throw new Error("api");
}
const empty=(x)=>x==null||(Array.isArray(x)&&x.length===0)||(typeof x==="object"&&!Array.isArray(x)&&Object.keys(x).length===0);

// path হিসেবে string অথবা fallback-সহ array দেওয়া যায়; প্রথম যেটাতে ডেটা মেলে সেটাই ফেরত আসে
export function useFetch(path){
  const key=Array.isArray(path)?path.join("|"):path;
  const [d,setD]=useState(null),[loading,setL]=useState(true),[err,setE]=useState(false);
  useEffect(()=>{
    let ok=true;setL(true);setE(false);
    (async()=>{
      const list=key.split("|");
      let res=null;
      for(const p of list){res=await get(p);if(!empty(res))break;}
      return res;
    })().then(x=>ok&&setD(x)).catch(()=>ok&&setE(true)).finally(()=>ok&&setL(false));
    return()=>{ok=false};
  },[key]);
  return {d,loading,err};
}
