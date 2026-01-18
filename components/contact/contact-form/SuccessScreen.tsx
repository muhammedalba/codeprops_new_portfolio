import { m } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SuccessScreen({ translations, onReset }: any) {
  return (
    <m.div className="py-20 text-center space-y-8">
      <CheckCircle2 className="w-20 h-20 mx-auto text-primary" />
      <h3 className="text-4xl font-bold">{translations.success_title}</h3>
      <p className="text-xl text-muted-foreground">{translations.success_message}</p>
      <Button onClick={onReset}>Dispatch Another Signal</Button>
    </m.div>
  );
}
