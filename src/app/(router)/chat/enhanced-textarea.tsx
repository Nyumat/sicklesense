import React, { KeyboardEvent, ChangeEvent, useRef, useEffect } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface EnhancedTextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onSubmit'> {
    onSubmit: (event: React.FormEvent) => void;
}

export const EnhancedTextarea = React.forwardRef<
    HTMLTextAreaElement,
    EnhancedTextareaProps
>(({ className, onSubmit, onChange, ...props }, forwardedRef) => {
    const internalRef = useRef<HTMLTextAreaElement>(null);

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSubmit(e);
        }
    };

    const adjustTextareaHeight = () => {
        const textarea = internalRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        onChange?.(e);
        adjustTextareaHeight();
    };

    useEffect(() => {
        adjustTextareaHeight();
    }, [props.value]);

    useEffect(() => {
        if (typeof forwardedRef === 'function') {
            forwardedRef(internalRef.current);
        } else if (forwardedRef) {
            forwardedRef.current = internalRef.current;
        }
    }, [forwardedRef]);

    return (
        <Textarea
            {...props}
            ref={internalRef}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            className={cn(
                "min-h-[40px] max-h-[200px] resize-none",
                className
            )}
        />
    );
});

EnhancedTextarea.displayName = "EnhancedTextarea";