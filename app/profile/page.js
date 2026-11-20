"use client";
import Link from "next/link";
import {authClient} from "@/lib/auth-client";
export default function Profile(){
  const {data,isPending}=authClient.useSession();
  if(isPending)return <div className="max-w-md mx-auto p-12"><div className="h-40 bg-green-100 animate-pulse rounded-xl"/></div>;
  if(!data)return null;
  const u=data.user;
  return(<div className="max-w-md mx-auto px-4 py-12"><div className="bg-white border border-green-100 rounded-xl p-6 text-center space-y-3">
    {u.image?<img src={u.image} alt={u.name} className="w-24 h-24 rounded-full mx-auto"/>:<div className="w-24 h-24 rounded-full bg-green-700 text-white text-4xl grid place-items-center mx-auto">{u.name?.[0]}</div>}
    <h1 className="text-2xl font-bold">{u.name}</h1><p className="text-gray-600">{u.email}</p>
    <Link href="/profile/update" className="inline-block bg-green-700 text-white font-bold px-5 py-2 rounded-lg">তথ্য আপডেট করুন</Link></div></div>);
}
