"use client";
import {useState} from "react";
import {useParams} from "next/navigation";
import {useFetch} from "@/lib/api";
import {num} from "@/lib/format";
import PriceCard,{Skeleton,Empty} from "@/components/PriceCard";
export default function Category(){
  const {slug}=useParams();
  const {d:cat,loading:l1}=useFetch(`/categories/${slug}`);
  const {d:items,loading:l2}=useFetch(`/products?category=${slug}`);
  const [sort,setSort]=useState("default");
  const loading=l1||l2;
  if(!loading&&(!cat||cat.error||!Array.isArray(items)||items.length===0))return <Empty title="এই ক্যাটাগরি পাওয়া যায়নি"/>;
  const list=[...(Array.isArray(items)?items:[])];
  if(sort==="asc")list.sort((a,b)=>num(a.today)-num(b.today));
  if(sort==="desc")list.sort((a,b)=>num(b.today)-num(a.today));
  return(<div className="max-w-6xl mx-auto px-4 py-10">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
      <h1 className="text-3xl font-bold">{cat?`${cat.icon} ${cat.nameBn}`:"লোড হচ্ছে…"}</h1>
      <label className="flex items-center gap-2 text-sm">সাজান:
        <span className="relative"><select value={sort} onChange={e=>setSort(e.target.value)} className="appearance-none bg-white border border-green-200 rounded-lg pl-3 pr-8 py-2">
          <option value="default">ডিফল্ট</option><option value="asc">দাম: কম থেকে বেশি</option><option value="desc">দাম: বেশি থেকে কম</option></select>
          <span className="pointer-events-none absolute right-3 top-2.5 text-xs">▼</span></span></label></div>
    {loading?<Skeleton/>:<div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">{list.map(p=><PriceCard key={p.id} p={p}/>)}</div>}
  </div>);
}
