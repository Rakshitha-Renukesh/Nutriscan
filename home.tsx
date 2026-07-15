import { Link } from "react-router-dom";

export default function Home() {
  return (

<div className="min-h-screen flex flex-col items-center justify-center bg-green-100">

<h1 className="text-5xl font-bold text-green-700">

NutriScan AI

</h1>

<p className="mt-4 text-gray-600">

AI Powered Food Nutrition Analyzer

</p>

<div className="mt-8 flex gap-4">

<Link
to="/login"
className="px-6 py-3 bg-green-600 text-white rounded-lg"
>

Login

</Link>

<Link
to="/register"
className="px-6 py-3 bg-white border rounded-lg"
>

Register

</Link>

</div>

</div>

  );
}