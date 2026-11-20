"use client";
import {useState} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
import {authClient} from "@/lib/auth-client";
const inp="w-full border border-green-200 rounded-lg px-3 py-2 bg-white";
export default function SignUp(){
  const r=useRouter();const [busy,setBusy]=useState(false);
  const submit=async(e)=>{e.preventDefault();const f=new FormData(e.target);
    if(String(f.get("password")).length<8)return toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
    setBusy(true);
    const {error}=await authClient.signUp.email({name:f.get("name"),email:f.get("email"),password:f.get("password")});setBusy(false);
    if(error)return toast.error(error.message||"সাইন আপ ব্যর্থ হয়েছে");
    toast.success("অ্যাকাউন্ট তৈরি হয়েছে, এবার সাইন ইন করুন");r.push("/signin");};
  const social=(provider)=>authClient.signIn.social({provider,callbackURL:"/"});
  return(<div className="max-w-md mx-auto px-4 py-12"><form onSubmit={submit} className="bg-white border border-green-100 rounded-xl p-6 space-y-4">
    <h1 className="text-2xl font-bold">নতুন অ্যাকাউন্ট খুলুন</h1>
    <input name="name" required placeholder="নাম" className={inp}/>
    <input name="email" type="email" required placeholder="ইমেইল" className={inp}/>
    <input name="password" type="password" required placeholder="পাসওয়ার্ড (কমপক্ষে ৮ অক্ষর)" className={inp}/>
    <button disabled={busy} className="w-full bg-green-700 text-white font-bold py-2 rounded-lg disabled:opacity-60">{busy?"অপেক্ষা করুন…":"সাইন আপ"}</button>
    <div className="grid grid-cols-2 gap-2"><button type="button" onClick={()=>social("google")} className="border border-green-200 rounded-lg py-2">Google</button><button type="button" onClick={()=>social("github")} className="border border-green-200 rounded-lg py-2">GitHub</button></div>
    <p className="text-sm text-center">আগেই অ্যাকাউন্ট আছে? <Link href="/signin" className="text-green-700 font-bold">সাইন ইন করুন</Link></p></form></div>);
}
