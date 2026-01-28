
import { m } from "framer-motion";
import { RefreshCw, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorScreenProps {
    error: string;
    onRetry: () => void;
    translations?: any;
}

export function ErrorScreen({ error, onRetry, translations }: ErrorScreenProps) {
    return (
        <m.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="py-20 text-center space-y-8 flex flex-col items-center justify-center min-h-[400px]"
        >
            <div className="relative">
                {/* Pulsing Background */}
                <div className="absolute inset-0 bg-destructive/10 rounded-full animate-ping opacity-20 duration-1000" />
                <div className="absolute inset-0 bg-destructive/5 rounded-full blur-xl" />
                
                <div className="relative bg-background border border-destructive/20 p-6 rounded-full shadow-[0_0_30px_-10px_hsl(var(--destructive)/0.3)]">
                    <AlertTriangle className="w-12 h-12 text-destructive" />
                </div>
            </div>

            <div className="space-y-3 max-w-md mx-auto">
                <h3 className="text-3xl font-heading font-bold text-foreground tracking-tight">
                    {translations?.error_title || "Transmission Interrupted"}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                    {error || translations?.error_message || "We encountered an unexpected issue while sending your signal. Please check your connection and try again."}
                </p>
                <div className="text-xs font-mono text-destructive/60 bg-destructive/5 py-1 px-3 rounded-full inline-block mt-2">
                    ERROR_CODE: 500_SUBMISSION_FAILED
                </div>
            </div>

            <div className="pt-4">
                <Button 
                    onClick={onRetry} 
                    variant="outline" 
                    size="lg"
                    className="group border-destructive/20 hover:border-destructive/50 hover:bg-destructive/5 hover:text-destructive transition-all duration-300 min-w-[200px]"
                >
                    <RefreshCw className="mr-2 h-4 w-4 group-hover:rotate-180 transition-transform duration-700" />
                    {translations?.retry_action || "Retry Transmission"}
                </Button>
            </div>
        </m.div>
    );
}
