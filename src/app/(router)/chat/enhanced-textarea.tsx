import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import React, { ChangeEvent, KeyboardEvent, useEffect, useRef } from 'react';

interface EnhancedTextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    onSubmit: () => void;
}

export const EnhancedTextarea = React.forwardRef<
    HTMLTextAreaElement,
    EnhancedTextareaProps
>(({ className, onSubmit, ...props }, forwardedRef) => {
    const internalRef = useRef<HTMLTextAreaElement>(null);

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSubmit();
        }
    };

    const adjustTextareaHeight = () => {
        const textarea = internalRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
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
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                props.onChange?.(e);
                adjustTextareaHeight();
            }}
            className={cn(
                "min-h-[40px] max-h-[200px] resize-none",
                className
            )}
        />
    );
});

EnhancedTextarea.displayName = "EnhancedTextarea";