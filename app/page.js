"use client";
import {useFetch} from "@/lib/api";
import PriceCard,{Skeleton} from "@/components/PriceCard";
import {num} from "@/lib/format";
export default function Home(){
  const {d,loading,err}=useFetch("/products");
  const list=Array.isArray(d)?d:[];
  const top=(dir)=>list.filter(p=>p.change?.dir===dir).sort((a,b)=>num(b.change.pct)-num(a.change.pct)).slice(0,6);
  const Sec=({id,title,items,sub})=>(<section id={id} className="max-w-6xl mx-auto px-4 pt-12 scroll-mt-4"><h2 className="text-2xl font-bold">{title}</h2>{sub&&<p className="text-gray-500 mb-4">{sub}</p>}<div className="mt-4">{loading?<Skeleton n={4}/>:<div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">{items.map(p=><PriceCard key={p.id} p={p}/>)}</div>}</div></section>);
  return(<>
    <section className="max-w-6xl mx-auto px-4 pt-10 grid md:grid-cols-2 gap-8 items-center">
      <div className="space-y-4">
        <p className="text-green-700 font-bold tracking-wide">আজকের বাজারদর</p>
        <h1 className="text-4xl lg:text-5xl font-bold leading-tight">নিত্যপ্রয়োজনীয় পণ্যের দাম, এক নজরে</h1>
        <p className="text-gray-600">চাল, ডাল, তেল, সবজি, মাছ-মাংস — দেশের বিভিন্ন বাজারের আজকের দাম আর দাম বাড়া-কমার খবর জানুন সহজেই।</p>
        <a href="#সব-পণ্য" className="inline-block bg-green-700 text-white font-bold px-6 py-3 rounded-lg hover:bg-green-800">সব পণ্য দেখুন ↓</a>
      </div>
      <img src="/hero.png" alt="বাজারের পণ্য" className="w-full max-w-md mx-auto"/>
    </section>
    {err&&<p className="text-center text-red-600 mt-8">ডেটা লোড করা যায়নি, পেজটি রিফ্রেশ করুন।</p>}
    <Sec id="বেড়েছে" title="আজ দাম বেড়েছে ▲" items={top("up")}/>
    <Sec id="কমেছে" title="আজ দাম কমেছে ▼" items={top("down")}/>
    <Sec id="সব-পণ্য" title="সব পণ্য" sub="সব পণ্যের আজকের দাম ও পরিবর্তন" items={list}/>
  </>);
}
