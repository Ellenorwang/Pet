import Link from "next/link";

export default function Logo (){
    
    return (
<Link href="/" className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
          <span>🐾 Pet Forum</span>
        </Link>
    );

};