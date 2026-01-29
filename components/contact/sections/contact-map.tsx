"use client";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/hooks/use-reveal";

export function ContactMap() {
  return (
    <section className="pb-24">
      <Container>
        <Reveal
          animation="scale"
          className="relative w-full h-[450px] rounded-[3.5rem] overflow-hidden border border-border shadow-2xl"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d192639.7512211246!2d28.817495941914945!3d41.00537021111585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa7040068086b%3A0xe1cc2f98408d087!2zxLBzdGFuYnVsLCBUw7xycmtpeWU!5e0!3m2!1sen!2sus!4v1705245000000!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2) brightness(0.9)' }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Global Office Location"
          ></iframe>
          <div className="absolute inset-0 pointer-events-none border-[12px] border-background/20" />
        </Reveal>
      </Container>
    </section>
  );
}
