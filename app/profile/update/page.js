"use client";
import {useState} from "react";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
import {authClient} from "@/lib/auth-client";
export default function UpdateProfile(){
  const r=useRouter();const {data}=authClient.useSession();const [busy,setBusy]=useState(false);
  const submit=async(e)=>{e.preventDefault();const name=new FormData(e.target).get("name");setBusy(true);
    const {error}=await authClient.updateUser({name});setBusy(false);
    if(error)return toast.error(error.message||"আপডেট করা যায়নি");
    toast.success("তথ্য আপডেট হয়েছে");r.push("/profile");r.refresh();};
  return(<div className="max-w-md mx-auto px-4 py-12"><form onSubmit={submit} className="bg-white border border-green-100 rounded-xl p-6 space-y-4">
    <h1 className="text-2xl font-bold">তথ্য আপডেট করুন</h1>
    <input key={data?.user?.name} name="name" required defaultValue={data?.user?.name||""} placeholder="নাম" className="w-full border border-green-200 rounded-lg px-3 py-2"/>
    <button disabled={busy} className="w-full bg-green-700 text-white font-bold py-2 rounded-lg disabled:opacity-60">{busy?"অপেক্ষা করুন…":"তথ্য আপডেট করুন"}</button></form></div>);
}
