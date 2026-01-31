import { Mail, Phone, MapPin, ExternalLink, Clock, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/ui/icons";
import { GlassCard } from "@/components/ui/glass-card";
import { Reveal } from "@/hooks/use-reveal";


import { SOCIAL_LINKS, CONTACT_INFO } from "@/lib/constants";

interface ContactInfoProps {
  info: {
    email: string;
    phone: string;
    address: string;
    social: {
      linkedin: string;
      github: string;
      twitter: string;
    };
  };
}

export function ContactInfo({ info }: ContactInfoProps) {
  const contactData = [
    {
      icon: Mail,
      label: "Signal Engineering",
      value: CONTACT_INFO.solutionsEmail,
      href: `mailto:${CONTACT_INFO.solutionsEmail}`,
      color: "blue"
    },
    {
      icon: Phone,
      label: "Direct Uplink",
      value: CONTACT_INFO.phone,
      href: `tel:${CONTACT_INFO.phone.replace(/\D/g, '')}`,
      color: "green"
    },
    {
      icon: MapPin,
      label: "Physical Nexus",
      value: CONTACT_INFO.address,
      href: "#",
      color: "red"
    }
  ];

  const socialIcons = [
    { icon: Icons.linkedin, label: info.social.linkedin, href: SOCIAL_LINKS.linkedin, color: "blue" },
    { icon: Icons.github, label: info.social.github, href: SOCIAL_LINKS.github, color: "green" },
    { icon: Icons.twitter, label: info.social.twitter, href: SOCIAL_LINKS.twitter, color: "red" }
  ];


  return (
    <div className="space-y-12">
      {/* Availability Card */}
      <GlassCard className="p-8 border-primary/20 bg-primary/5 relative overflow-hidden group">
        <div className="absolute top-0 right-1/2 translate-x-1/2 sm:right-0 sm:translate-x-0 p-4 opacity-10">
           <Globe size={120} className="text-primary group-hover:rotate-12 transition-transform duration-1000" />
        </div>
        <div className="relative flex-col justify-center sm:flex-row sm:justify-start items-center z-10 flex items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary relative">
             <Clock size={28} />
             <div className="absolute inset-0 rounded-full border border-primary/40 animate-ping" />
          </div>
          <div className="space-y-1">
             <h4 className="text-lg font-bold text-center sm:text-start ">Operational Status</h4>
             <p className="text-sm justify-center sm:justify-start text-primary font-mono font-bold uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Architects Online
             </p>
             <p className="text-muted-foreground text-sm font-light text-center sm:text-start ">Average Response: ~4 Engineering Hours</p>
          </div>
        </div>
      </GlassCard>

        <div className="space-y-6">
          {contactData.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal
                key={i}
                animation="right"
                delay={i * 0.1}
                as="a"
                href={item.href}
                className="block group"
              >
                <GlassCard className="p-6 md:p-8 flex items-center justify-center sm:justify-between border-border/40 hover:border-primary/50 transition-all duration-300">
                  <div className="flex-col justify-center sm:justify-start sm:flex-row flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-muted/50 flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                      <Icon size={24} color={item.color} />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-center sm:text-start font-mono font-bold uppercase tracking-widest text-primary/60">{item.label}</p>
                      <p dir="ltr" className="text-sm sm:text-xl text-center sm:text-start font-bold tracking-tight">{item.value}</p>
                    </div>
                  </div>
                  <ExternalLink size={20} color={item.color} className="text-muted-foreground/30 group-hover:text-primary transition-colors translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 duration-500" />
                </GlassCard>
              </Reveal>
            );
          })}
        </div>

        <div className="pt-8">
          <h4 className="text-sm font-bold uppercase tracking-[0.3em] text-muted-foreground mb-8 ml-2">Digital Footprint</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {socialIcons.map((social, i) => {
              const Icon = social.icon;
              return (
                <Reveal
                  key={i}
                  animation="scale"
                  delay={i * 0.1}
                  as="a"
                  href={social.href}
                  className={cn(
                    "p-8 rounded-[2rem] bg-muted/30 border border-border/50 flex flex-col items-center justify-center gap-3 hover:bg-primary hover:text-primary-foreground group transition-all duration-500 hover:-translate-y-1.5"
                  )}
                >
                  <Icon color={social.color} size={28} className="group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">{social.label}</span>
                </Reveal>
              );
            })}
          </div>
        </div>
    </div>
  );
}
