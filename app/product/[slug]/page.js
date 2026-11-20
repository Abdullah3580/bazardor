"use client";
import {useParams} from "next/navigation";
import {useFetch} from "@/lib/api";
import {toBn,unitBn,num} from "@/lib/format";
import {Badge,Empty} from "@/components/PriceCard";
export default function Product(){
  const {slug}=useParams();
  const {d,loading}=useFetch([`/products?slug=${slug}`,`/products/${slug}`]);
  if(loading)return <div className="max-w-5xl mx-auto px-4 py-10"><div className="h-64 bg-green-100 animate-pulse rounded-xl"/></div>;
  const p=Array.isArray(d)?d[0]:d;
  if(!p||!Array.isArray(p.markets)||p.markets.length===0)return <Empty title="পণ্যটি পাওয়া যায়নি"/>;
  const min=Math.min(...p.markets.map(m=>num(m.min))),max=Math.max(...p.markets.map(m=>num(m.max)));
  const avg=Math.round(p.markets.reduce((a,m)=>a+(num(m.min)+num(m.max))/2,0)/p.markets.length);
  const divs=[...new Set(p.markets.map(m=>m.division))];
  const stat=(l,v,c)=><div className="bg-white border border-green-100 rounded-xl p-4 text-center"><div className="text-xs text-gray-500">{l}</div><div className={`text-xl font-bold ${c||""}`}>{toBn(v)} টাকা</div></div>;
  return(<div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
    <section className="bg-white border border-green-100 rounded-xl p-6 flex flex-col sm:flex-row gap-5 items-start">
      <div className="text-7xl">{p.image}</div>
      <div className="space-y-2"><h1 className="text-3xl font-bold">{p.nameBn}</h1>
        <p className="text-gray-600">আজকের গড় দাম {toBn(p.today)} টাকা, গতকাল ছিল {toBn(p.yesterday)} টাকা।</p>
        <div className="flex flex-wrap gap-2 items-center"><span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm">{p.categoryIcon} {p.categoryNameBn}</span><span className="text-sm text-gray-500">প্রতি {unitBn(p.unit)}</span><Badge c={p.change||{}}/></div></div></section>
    <section><h2 className="text-xl font-bold mb-3">দামের সারসংক্ষেপ</h2>
      <div className="grid grid-cols-3 gap-3">{stat("সর্বনিম্ন",min,"text-green-700")}{stat("সর্বোচ্চ",max,"text-red-600")}{stat("গড়",avg)}</div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">{stat("আজ",p.today)}{stat("গতকাল",p.yesterday)}{stat("গত সপ্তাহ",p.lastWeek)}{stat("গত মাস",p.lastMonth)}</div></section>
    <section><h2 className="text-xl font-bold mb-3">বাজারভিত্তিক আজকের দাম</h2>
      {divs.map(dv=><div key={dv} className="mb-5"><h3 className="font-semibold text-green-800 mb-2">📍 {dv} বিভাগ</h3>
        <div className="grid gap-3 sm:grid-cols-2">{p.markets.filter(m=>m.division===dv).map(m=><div key={m.market} className="bg-white border border-green-100 rounded-xl p-4 flex justify-between"><span>{m.market}</span><span className="font-bold">{toBn(m.min)} – {toBn(m.max)} টাকা</span></div>)}</div></div>)}</section>
  </div>);
}
