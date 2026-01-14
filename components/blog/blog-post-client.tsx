"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { Container } from "@/components/layout/container";
import { HeroBackground } from "@/components/layout/hero-background";
import { SectionBadge } from "@/components/ui/section-badge";
import { 
  Calendar, 
  User, 
  Clock, 
  ArrowLeft, 
  Share2, 
  Bookmark, 
  ChevronRight, 
  MessageSquare,
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/ui/glass-card";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { useState, useEffect } from "react";

interface BlogPostClientProps {
  locale: string;
  post: any;
  translations: any;
}

export function BlogPostClient({ locale, post, translations }: BlogPostClientProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observers = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll("h2[id]").forEach((section) => {
      observers.observe(section);
    });

    return () => observers.disconnect();
  }, [post]);

  if (!post) return null;

  const toc = [
    { id: "intro", label: locale === 'ar' ? "مقدمة" : "Introduction" },
    { id: "challenges", label: locale === 'ar' ? "التحديات الهندسية" : "Technical Challenges" },
    { id: "insight", label: locale === 'ar' ? "رؤية معمارية" : "Architectural Insight" },
    { id: "conclusion", label: locale === 'ar' ? "خاتمة استراتيجية" : "Strategic Conclusion" },
  ];

  return (
    <main className="flex flex-col bg-background min-h-screen relative">
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-20 left-0 right-0 h-1 bg-primary z-[60] origin-left"
        style={{ scaleX }}
      />

      {/* Article Hero */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <HeroBackground type="about" />
        <Container className="relative z-10">
          <Breadcrumbs 
            items={[
              { label: locale === 'ar' ? "المدونة" : "Insights", href: `/${locale}/blog` },
              { label: post.title }
            ]} 
            className="mb-8"
            locale={locale}
          />
          <Link 
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 text-sm font-bold text-primary mb-12 hover:gap-4 transition-all group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            {locale === 'ar' ? "العودة للمنصة المعرفية" : "Back to Engineering Insights"}
          </Link>

          <div className="grid lg:grid-cols-[1fr,400px] gap-12 items-end">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono font-bold uppercase tracking-widest text-primary">
                <span className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">{translations.blog.category}</span>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar size={14} /> {post.date}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock size={14} /> 6 min read
                </div>
              </div>

              <h1 className="text-5xl md:text-8xl font-heading font-bold tracking-tighter leading-[0.9]">
                {post.title}
              </h1>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, x: 30 }}
               animate={{ opacity: 1, x: 0 }}
               className="flex items-center gap-6 p-6 rounded-[2.5rem] bg-muted/30 border border-border/50 backdrop-blur-sm"
            >
               <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center font-bold text-3xl text-primary overflow-hidden border border-primary/30">
                  {post.author[0]}
               </div>
               <div className="space-y-1">
                  <div className="text-xl font-bold">{post.author}</div>
                  <div className="text-xs text-primary font-mono font-bold uppercase tracking-widest">Principal Architect</div>
                  <div className="flex gap-3 pt-2">
                     <Linkedin size={14} className="text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                     <Twitter size={14} className="text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                  </div>
               </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Main Content Layout */}
      <section className="pb-32">
        <Container>
          <div className="grid lg:grid-cols-[280px,1fr,300px] gap-16 items-start">
            
            {/* Left Sidebar: Table of Contents */}
            <aside className="hidden lg:block sticky top-32 space-y-10">
               <div className="space-y-6">
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground ml-4">Content Maps</h4>
                  <nav className="flex flex-col gap-2">
                     {toc.map((item) => (
                        <a
                           key={item.id}
                           href={`#${item.id}`}
                           className={cn(
                              "px-4 py-3 rounded-xl text-sm font-bold transition-all border border-transparent",
                              activeSection === item.id 
                                 ? "bg-primary/10 text-primary border-primary/20 translate-x-2" 
                                 : "text-muted-foreground hover:text-primary hover:bg-muted/50"
                           )}
                        >
                           {item.label}
                        </a>
                     ))}
                  </nav>
               </div>

               <div className="px-4 py-8 rounded-3xl bg-muted/30 border border-border/50 space-y-6">
                  <div className="flex items-center gap-3 text-primary">
                     <MessageSquare size={18} />
                     <span className="text-xs font-bold uppercase tracking-widest">Join Discussion</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                     Our engineers are active in the comments. Technical queries are welcome.
                  </p>
                  <button className="text-xs font-bold text-primary hover:underline">View Community Insights →</button>
               </div>
            </aside>

            {/* Center: Article Content */}
            <article className="prose prose-invert prose-primary max-w-none">
               <div id="intro" className="scroll-mt-40">
                  <div className="text-3xl text-muted-foreground font-light leading-relaxed mb-16 italic border-l-4 border-primary pl-10 py-4 bg-primary/5 rounded-r-[2rem]">
                     {post.excerpt}
                  </div>

                  <div className="space-y-10 text-xl text-foreground/80 leading-relaxed font-light">
                     <p>
                        {locale === 'ar' 
                        ? "نحن نعيش في عصر حيث السرعة ليست مجرد ميزة، بل هي متطلب أساسي للبقاء. في هذا المقال، نغوص في أعماق البنية التحتية والتقنيات التي تجعل الأنظمة العالمية تعمل بسلاسة فائقة."
                        : "In an era where digital speed is a competitive necessity, architecting systems for low latency is no longer optional. This technical deep-dive explores the fundamental patterns used by world-class engineering teams to achieve sub-second global response times."}
                     </p>
                     <p>
                        {locale === 'ar'
                        ? "تتطلب الأنظمة الحديثة نهجاً شمولياً يبدأ من اختيار البروتوكولات وينتهي بتوزيع مراكز البيانات حول العالم."
                        : "Modern systems require a holistic approach starting from protocol selection and ending with strategic global data center distribution."}
                     </p>
                  </div>
               </div>

               <div id="challenges" className="scroll-mt-40 pt-16">
                  <h2 className="text-4xl font-bold text-foreground mb-8">
                     {locale === 'ar' ? "التحديات الهندسية المعاصرة" : "Modern Engineering Challenges"}
                  </h2>
                  <div className="space-y-8 text-xl text-foreground/80 leading-relaxed font-light">
                     <p>
                        {locale === 'ar'
                        ? "التحدي الأكبر يكمن في توزيع البيانات عبر القارات مع الحفاظ على اتساقها. نحن نستخدم تقنيات Edge Computing لتقريب المعالجة من المستخدم النهائي."
                        : "The primary challenge lies in data distribution across continents while maintaining consistency. By leveraging Edge Computing and strategically placed points of presence, we can bring compute closer to the end-user."}
                     </p>
                     
                     {/* Dynamic Code Placeholder Style */}
                     <pre className="p-8 rounded-3xl bg-black/50 border border-white/5 font-mono text-sm leading-relaxed overflow-x-auto">
                        <code className="text-primary">
{`// Example: Edge Data Synchronization Pattern
async function syncGlobalNode(data, edgeId) {
  const latency = await calculateProximity(edgeId);
  return await dispatchToEdge(data, {
    compression: 'brotli',
    priority: latency < 50 ? 'high' : 'standard'
  });
}`}
                        </code>
                     </pre>
                  </div>
               </div>

               <div id="insight" className="scroll-mt-40 pt-16">
                  <GlassCard className="p-12 my-12 bg-primary/5 border-primary/20 relative overflow-hidden group">
                     <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all" />
                     <h3 className="text-2xl font-bold mb-6 flex items-center gap-4">
                        <SectionBadge className="mb-0">Engineering Insight</SectionBadge>
                     </h3>
                     <p className="text-2xl text-foreground/90 font-medium leading-tight">
                        {locale === 'ar'
                           ? "الانتقال من المعمارية المركزية إلى المعمارية الموزعة يقلل وقت الاستجابة بنسبة تصل إلى 70% في الأنظمة الضخمة."
                           : "Transitioning from centralized architectures to event-driven distributed models typically reduces global latency by up to 70% for enterprise-scale systems."}
                     </p>
                  </GlassCard>
               </div>

               <div id="conclusion" className="scroll-mt-40 pt-16">
                  <h2 className="text-4xl font-bold text-foreground mb-8">
                     {locale === 'ar' ? "خلاصة القول" : "Strategic Conclusion"}
                  </h2>
                  <div className="space-y-8 text-xl text-foreground/80 leading-relaxed font-light">
                     <p>
                        {locale === 'ar'
                        ? "الاستثمار في البنية التحتية التقنية هو استثمار في تجربة المستخدم النهائية. التصميم المعماري الجيد يوفر التكاليف على المدى الطويل ويضمن قابلية التوسع."
                        : "Investing in technical infrastructure is ultimately an investment in user experience. A well-designed architectural foundation saves costs in the long run and guarantees seamless scalability."}
                     </p>
                  </div>
               </div>

               {/* Post Navigation */}
               <div className="mt-24 pt-12 border-t border-border flex flex-col md:flex-row justify-between gap-8">
                  <Link href="#" className="flex-1 group p-8 rounded-3xl bg-muted/20 border border-border/50 hover:bg-primary/5 transition-all text-left">
                     <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Previous Insight</div>
                     <div className="text-xl font-bold group-hover:text-primary transition-colors flex items-center gap-2">
                        <ArrowLeft size={16} /> Technical SEO Foundations
                     </div>
                  </Link>
                  <Link href="#" className="flex-1 group p-8 rounded-3xl bg-muted/20 border border-border/50 hover:bg-primary/5 transition-all text-right">
                     <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Next Insight</div>
                     <div className="text-xl font-bold group-hover:text-primary transition-colors flex items-center justify-end gap-2">
                        Legacy Systems Migration <ChevronRight size={16} />
                     </div>
                  </Link>
               </div>
            </article>

            {/* Right Sidebar: Tools & Interactions */}
            <aside className="space-y-12 sticky top-32">
               <div className="space-y-6">
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Share Article</h4>
                  <div className="grid grid-cols-4 gap-3">
                     {[Twitter, Linkedin, Facebook, LinkIcon].map((Icon, i) => (
                        <button key={i} className="w-full aspect-square rounded-2xl bg-muted/50 border border-border/50 flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all">
                           <Icon size={18} />
                        </button>
                     ))}
                  </div>
               </div>

               <GlassCard className="p-8 border-primary/20 bg-primary/5 space-y-6">
                  <h4 className="text-xl font-bold tracking-tight">Need a Technical Review?</h4>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">
                     Our architects can audit your current system for performance bottlenecks.
                  </p>
                  <Link href={`/${locale}/contact`}>
                     <button className="w-full py-5 rounded-2xl bg-primary text-primary-foreground font-bold text-sm hover:shadow-xl hover:shadow-primary/20 transition-all flex items-center justify-center gap-3">
                        Book Audit 
                        <ArrowLeft size={16} className="rotate-180" />
                     </button>
                  </Link>
               </GlassCard>

               <div className="space-y-6">
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Technical Clusters</h4>
                  <div className="flex flex-wrap gap-2">
                     {post.tags.map((tag: string) => (
                        <span key={tag} className="px-4 py-2 rounded-xl bg-muted/50 text-[10px] font-bold uppercase tracking-widest border border-border/50 hover:border-primary/30 transition-colors cursor-default">
                           {tag}
                        </span>
                     ))}
                  </div>
               </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* Recommended Section */}
      <section className="py-24 bg-muted/20 border-t border-border/50">
         <Container>
            <div className="flex items-center justify-between mb-16">
               <h2 className="text-4xl font-bold tracking-tighter">Recommended for You</h2>
               <Link href={`/${locale}/blog`} className="text-primary font-bold hover:underline">View All Insights →</Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
               {/* Simplified Post Cards placeholders */}
               {[1, 2, 3].map((i) => (
                  <GlassCard key={i} className="p-8 border-border/40 hover:border-primary/50 transition-all group cursor-pointer">
                     <div className="text-[10px] font-bold uppercase tracking-widest text-primary mb-4">Engineering</div>
                     <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">How to scale PostgreSQL to 10M requests...</h3>
                     <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock size={12} /> 8 min read
                     </div>
                  </GlassCard>
               ))}
            </div>
         </Container>
      </section>
    </main>
  );
}
