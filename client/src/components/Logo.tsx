import logoImage from "@assets/EBUTINE  LOGO FULL COLOUR_1755343969724.png";

interface LogoProps {
  className?: string;
  textColor?: string;
}

export default function Logo({ className = "h-10 md:h-12 w-auto", textColor = "text-ebutine-blue" }: LogoProps) {
  return (
    <div className="flex items-center">
      <img 
        src={logoImage} 
        alt="Ebutine Properties Logo" 
        className={className}
      />
    </div>
  );
}
