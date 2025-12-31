import Image from "next/image";
import Link from "next/link";
import {Poppins} from "next/font/google";

interface LogoProps {
   isLink?: boolean;
   showText?: boolean;
   className?: string;
   width?: number;
   height?: number;
}

const poppins = Poppins({
   subsets: ['latin'],
   weight: ['400', '500', '600', '700', '800', '900'],
   variable: '--font-poppins',
});

export const Logo = ({isLink = false, showText = false, className = "", width = 80, height = 80}: LogoProps) => {
    return (
      <>
              {isLink ? <Link href="/" className={`flex items-center ${className}`}>
              <Image src="/logo.png" alt="Imampoplaka Logo" width={width} height={height} />
              {showText && <span  className={`hidden lg:block whitespace-nowrap text-xl font-semibold sm:text-2xl text-foreground ${poppins.className}`}>
                imam<span className={`text-secondary`}>poplaka</span>
              </span> }
            </Link> : <div className={className}><Image src="/logo.png" alt="Imampoplaka Logo" width={width} height={height} /></div>   }
      </>
    );
};