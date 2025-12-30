import React from 'react';
import { 
  Radio, 
  Landmark, 
  Zap, 
  ShoppingCart, 
  Bus, 
  Shield, 
  Stethoscope, 
  Plane,
  FileText,
  CheckCircle,
  Building2,
  Smile,
  LucideProps
} from 'lucide-react';

const iconMap: Record<string, React.FC<LucideProps>> = {
  Radio,
  Landmark,
  Zap,
  ShoppingCart,
  Bus,
  Shield,
  Stethoscope,
  Plane,
  FileText,
  CheckCircle,
  Building2,
  Smile,
};

interface IconProps extends LucideProps {
  name: string;
}

export function Icon({ name, ...props }: IconProps) {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in iconMap`);
    return null;
  }

  return <IconComponent {...props} />;
}
