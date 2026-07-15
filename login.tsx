import { useState } from "react";

export default function Login() {

const [email,setEmail]=useState("");

const [password,setPassword]=useState("");

return(

<div className="min-h-screen flex justify-center items-center">

<div className="bg-white shadow-xl p-8 rounded-xl w-96">

<h2 className="text-3xl font-bold mb-6">

Login

</h2>

<input

className="border p-3 w-full mb-4"

placeholder="Email"

value={email}

onChange={(e)=>setEmail(e.target.value)}

/>

<input

type="password"

className="border p-3 w-full mb-4"

placeholder="Password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

/>

<button className="bg-green-600 text-white w-full p-3 rounded">

Login

</button>

</div>

</div>

);

}