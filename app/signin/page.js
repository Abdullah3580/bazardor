"use client";
import {useEffect,useState} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
import {authClient} from "@/lib/auth-client";
const inp="w-full border border-green-200 rounded-lg px-3 py-2 bg-white";
export default function SignIn(){
  const r=useRouter();const [busy,setBusy]=useState(false);
  useEffect(()=>{if(new URLSearchParams(location.search).get("protected"))toast.error("এই পেজ দেখতে আগে সাইন ইন করুন");},[]);
  const submit=async(e)=>{e.preventDefault();const f=new FormData(e.target);setBusy(true);
    const {error}=await authClient.signIn.email({email:f.get("email"),password:f.get("password")});setBusy(false);
    if(error)return toast.error(error.message||"সাইন ইন ব্যর্থ হয়েছে");
    toast.success("সাইন ইন সফল হয়েছে");
    const b=new URLSearchParams(location.search).get("redirect");
    r.push(b&&b.startsWith("/")&&!b.startsWith("//")?b:"/");r.refresh();};
  const social=(provider)=>authClient.signIn.social({provider,callbackURL:"/"});
  return(<div className="max-w-md mx-auto px-4 py-12"><form onSubmit={submit} className="bg-white border border-green-100 rounded-xl p-6 space-y-4">
    <h1 className="text-2xl font-bold">সাইন ইন করুন</h1>
    <input name="email" type="email" required placeholder="ইমেইল" className={inp}/>
    <input name="password" type="password" required placeholder="পাসওয়ার্ড" className={inp}/>
    <button disabled={busy} className="w-full bg-green-700 text-white font-bold py-2 rounded-lg disabled:opacity-60">{busy?"অপেক্ষা করুন…":"সাইন ইন"}</button>
    <div className="grid grid-cols-2 gap-2"><button type="button" onClick={()=>social("google")} className="border border-green-200 rounded-lg py-2">Google</button><button type="button" onClick={()=>social("github")} className="border border-green-200 rounded-lg py-2">GitHub</button></div>
    <p className="text-sm text-center">অ্যাকাউন্ট নেই? <Link href="/signup" className="text-green-700 font-bold">সাইন আপ করুন</Link></p></form></div>);
}
