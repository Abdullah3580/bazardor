import Link from "next/link";
import {toBn,unitBn} from "@/lib/format";
export function Badge({c={}}){
  c=c||{};
  const up=c.dir==="up",dn=c.dir==="down";
  return <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${up?"bg-green-100 text-green-700":dn?"bg-red-100 text-red-700":"bg-gray-200 text-gray-600"}`}>{up?"▲":dn?"▼":"—"} {toBn(c.pct)}%</span>;
}
export default function PriceCard({p}){
  return(<Link href={`/product/${p.slug}`} className="block bg-white rounded-xl border border-green-100 p-4 hover:shadow-lg hover:-translate-y-0.5 transition">
    <div className="text-5xl mb-2">{p.image}</div>
    <h3 className="font-bold text-lg">{p.nameBn}</h3>
    <p className="text-sm text-gray-500">প্রতি {unitBn(p.unit)}</p>
    <div className="flex items-center justify-between mt-3"><div><div className="text-xs text-gray-500">আজকের দাম</div><div className="font-bold text-green-800">{toBn(p.today)} টাকা</div></div><Badge c={p.change||{}}/></div>
  </Link>);
}
export function Skeleton({n=8}){
  return <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">{Array.from({length:n}).map((_,i)=><div key={i} className="h-40 rounded-xl bg-green-100 animate-pulse"/>)}</div>;
}
export function Empty({title="কিছু পাওয়া যায়নি"}){
  return <div className="text-center py-24 px-4"><div className="text-6xl">🛒</div><h1 className="text-3xl font-bold mt-3">{title}</h1><p className="text-gray-500 my-3">এই পেজটি খুঁজে পাওয়া যায়নি বা এখানে কোনো পণ্য নেই।</p><Link href="/" className="inline-block bg-green-700 text-white font-bold px-6 py-3 rounded-lg">হোম পেজে ফিরে যান</Link></div>;
}
