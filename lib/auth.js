import {betterAuth} from "better-auth";
import {mongodbAdapter} from "better-auth/adapters/mongodb";
import {MongoClient} from "mongodb";

// একই MongoClient বারবার তৈরি না করে (dev hot-reload ও Vercel serverless-এ) পুনরায় ব্যবহার করা হয়।
const uri=process.env.MONGODB_URI||"mongodb://127.0.0.1:27017";
const g=globalThis;
const client=g._bazardorMongo||(g._bazardorMongo=new MongoClient(uri));

const providers={};
if(process.env.GOOGLE_CLIENT_ID&&process.env.GOOGLE_CLIENT_SECRET)
  providers.google={clientId:process.env.GOOGLE_CLIENT_ID,clientSecret:process.env.GOOGLE_CLIENT_SECRET};
if(process.env.GITHUB_CLIENT_ID&&process.env.GITHUB_CLIENT_SECRET)
  providers.github={clientId:process.env.GITHUB_CLIENT_ID,clientSecret:process.env.GITHUB_CLIENT_SECRET};

export const auth=betterAuth({
  database:mongodbAdapter(client.db("bazardor")),
  emailAndPassword:{enabled:true,autoSignIn:false},
  socialProviders:providers,
});
