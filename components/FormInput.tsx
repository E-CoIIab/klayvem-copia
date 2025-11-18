"use client";

import { forwardRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  multiline?: boolean;
  rows?: number;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, helperText, className, multiline, rows, ...props }, ref) => {
    const id = props.id || props.name;

    return (
      <div className="space-y-2">
        <Label htmlFor={id} className={cn(error && "text-destructive")}>
          {label}
        </Label>
        {multiline ? (
          <Textarea
            id={id}
            className={cn(error && "border-destructive focus-visible:ring-destructive", className)}
            rows={rows}
            {...(props as any)}
          />
        ) : (
          <Input
            ref={ref}
            id={id}
            className={cn(error && "border-destructive focus-visible:ring-destructive", className)}
            {...props}
          />
        )}
        {error && (
          <p className="text-sm text-destructive font-medium">{error}</p>
        )}
        {helperText && !error && (
          <p className="text-sm text-muted-foreground">{helperText}</p>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

