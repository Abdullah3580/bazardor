"use client";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useEffect,useState} from "react";
import toast from "react-hot-toast";
import {authClient} from "@/lib/auth-client";
import {useFetch} from "@/lib/api";
export default function Navbar(){
  const path=usePathname();
  const {d:cats}=useFetch("/categories");
  const {data:session,isPending}=authClient.useSession();
  const [date,setDate]=useState("");
  useEffect(()=>setDate(new Date().toLocaleDateString("bn-BD",{weekday:"long",day:"numeric",month:"long",year:"numeric"})),[]);
  const out=async()=>{await authClient.signOut();toast.success("সাইন আউট হয়েছে");window.location.href="/";};
  const btn="px-4 py-1.5 rounded-lg text-sm font-semibold";
  return(<header className="bg-white border-b border-green-100">
    <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
      <Link href="/" className="flex items-center gap-2"><img src="/logo.png" alt="বাজার দর" className="w-9 h-9"/><div><div className="font-bold text-xl leading-tight">বাজার দর</div><div className="text-xs text-gray-500 min-h-4">{date}</div></div></Link>
      <div className="flex items-center gap-2">
        {isPending?<div className="w-24 h-8 bg-green-100 animate-pulse rounded-lg"/>:session?<>
          <Link href="/profile" className={`${btn} border border-green-700 text-green-800`}>👤 {session.user.name?.split(" ")[0]}</Link>
          <button onClick={out} className={`${btn} bg-green-700 text-white`}>সাইন আউট</button></>:<>
          <Link href="/signin" className={`${btn} border border-green-700 text-green-800`}>সাইন ইন</Link>
          <Link href="/signup" className={`${btn} bg-green-700 text-white`}>সাইন আপ</Link></>}
      </div></div>
    <nav className="max-w-6xl mx-auto px-4 pb-2 flex gap-2 overflow-x-auto whitespace-nowrap">
      {(Array.isArray(cats)?cats:[]).map(c=>{const on=path===`/category/${c.slug}`;return <Link key={c.id} href={`/category/${c.slug}`} className={`px-3 py-1 rounded-full text-sm ${on?"bg-green-700 text-white":"bg-green-50 text-green-900 hover:bg-green-100"}`}>{c.icon} {c.nameBn}</Link>;})}
    </nav></header>);
}
