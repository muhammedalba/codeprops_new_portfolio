"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ExternalLink, Clock, Globe } from "lucide-react";
import { Icons } from "@/components/ui/icons";
import { GlassCard } from "@/components/ui/glass-card";


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
      value: info.email,
      href: `mailto:${info.email}`,
      color: "blue"
    },
    {
      icon: Phone,
      label: "Direct Uplink",
      value: info.phone,
      href: `tel:${info.phone}`,
      color: "green"
    },
    {
      icon: MapPin,
      label: "Physical Nexus",
      value: info.address,
      href: "#",
      color: "red"
    }
  ];

  const socialIcons = [
    { icon: Icons.linkedin, label: info.social.linkedin, href: "#" ,color: "blue"},
    { icon: Icons.github, label: info.social.github, href: "#" ,color: "green"},
    { icon: Icons.twitter, label: info.social.twitter, href: "#" ,color: "red"}
  ];

  return (
    <div className="space-y-12">
      {/* Availability Card */}
      <GlassCard className="p-8 border-primary/20 bg-primary/5 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10">
           <Globe size={120} className="text-primary group-hover:rotate-12 transition-transform duration-1000" />
        </div>
        <div className="relative z-10 flex items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary relative">
             <Clock size={28} />
             <div className="absolute inset-0 rounded-full border border-primary/40 animate-ping" />
          </div>
          <div className="space-y-1">
             <h4 className="text-lg font-bold">Operational Status</h4>
             <p className="text-sm text-primary font-mono font-bold uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Architects Online
             </p>
             <p className="text-muted-foreground text-sm font-light">Average Response: ~4 Engineering Hours</p>
          </div>
        </div>
      </GlassCard>

      <div className="space-y-6">
        {contactData.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.a
              key={i}
              href={item.href}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="block group"
            >
              <GlassCard className="p-6 md:p-8 flex items-center justify-between border-border/40 hover:border-primary/50 transition-all duration-300">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-muted/50 flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                    <Icon size={24} color={item.color} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-mono font-bold uppercase tracking-widest text-primary/60">{item.label}</p>
                    <p className="text-xl font-bold tracking-tight">{item.value}</p>
                  </div>
                </div>
                <ExternalLink size={20} color={item.color} className="text-muted-foreground/30 group-hover:text-primary transition-colors translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 duration-500" />
              </GlassCard>
            </motion.a>
          );
        })}
      </div>

      <div className="pt-8">
        <h4 className="text-sm font-bold uppercase tracking-[0.3em] text-muted-foreground mb-8 ml-2">Digital Footprint</h4>
        <div className="grid grid-cols-3 gap-4">
          {socialIcons.map((social, i) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={i}
                href={social.href}
                whileHover={{ y: -5 }}
                className="p-8 rounded-[2rem] bg-muted/30 border border-border/50 flex flex-col items-center justify-center gap-3 hover:bg-primary hover:text-primary-foreground group transition-all duration-500"
              >
                <Icon color={social.color} size={28} className="group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">{social.label}</span>
              </motion.a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
