"use client";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { CheckoutFormData } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ChevronRight, CreditCard, MapPin } from "lucide-react";
import { useState } from "react";

interface CheckoutFormProps {
  onComplete: (data: CheckoutFormData) => void;
}

type Step = 1 | 2 | 3;

const STEPS = [
  { id: 1, label: "Shipping", icon: MapPin },
  { id: 2, label: "Payment", icon: CreditCard },
  { id: 3, label: "Confirm", icon: CheckCircle2 },
];

const empty: CheckoutFormData = {
  firstName: "", lastName: "", email: "", phone: "",
  address: "", city: "", state: "", zip: "", country: "US",
  cardNumber: "", cardName: "", cardExpiry: "", cardCvc: "",
  saveInfo: false,
};

type FieldError = Partial<Record<keyof CheckoutFormData, string>>;

function validate(step: Step, data: CheckoutFormData): FieldError {
  const errors: FieldError = {};
  if (step === 1) {
    if (!data.firstName.trim()) errors.firstName = "First name is required";
    if (!data.lastName.trim()) errors.lastName = "Last name is required";
    if (!data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errors.email = "Enter a valid email";
    if (!data.address.trim()) errors.address = "Address is required";
    if (!data.city.trim()) errors.city = "City is required";
    if (!data.zip.match(/^\d{5}(-\d{4})?$/)) errors.zip = "Enter a valid ZIP code";
  }
  if (step === 2) {
    if (!data.cardNumber.replace(/\s/g, "").match(/^\d{16}$/)) errors.cardNumber = "Enter a valid 16-digit card number";
    if (!data.cardName.trim()) errors.cardName = "Name on card is required";
    if (!data.cardExpiry.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) errors.cardExpiry = "Format: MM/YY";
    if (!data.cardCvc.match(/^\d{3,4}$/)) errors.cardCvc = "Enter 3 or 4 digits";
  }
  return errors;
}

interface FieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

function Field({ label, error, required, children }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-[var(--color-foreground)]">
        {label}
        {required && <span className="text-[var(--color-destructive)] ml-0.5" aria-hidden="true">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-xs text-[var(--color-destructive)] flex items-center gap-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass = (error?: string) => cn(
  "w-full h-11 px-3 rounded-xl border text-sm text-[var(--color-foreground)] bg-[var(--color-card)]",
  "transition-colors duration-150 outline-none placeholder:text-[var(--color-muted-foreground)]",
  "focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20",
  error
    ? "border-[var(--color-destructive)] focus:border-[var(--color-destructive)] focus:ring-[var(--color-destructive)]/20"
    : "border-[var(--color-border)]"
);

function formatCardNumber(val: string): string {
  return val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}
function formatExpiry(val: string): string {
  const d = val.replace(/\D/g, "").slice(0, 4);
  return d.length >= 3 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
}

export function CheckoutForm({ onComplete }: CheckoutFormProps) {
  const [step, setStep] = useState<Step>(1);
  const [data, setData] = useState<CheckoutFormData>(empty);
  const [errors, setErrors] = useState<FieldError>({});
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState<Partial<Record<keyof CheckoutFormData, boolean>>>({});

  const set = (field: keyof CheckoutFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const value = e.target.type === "checkbox"
      ? (e.target as HTMLInputElement).checked
      : e.target.value;
    setData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const errs = validate(step, { ...data, [field]: value });
      setErrors((prev) => ({ ...prev, [field]: errs[field] }));
    }
  };

  const blur = (field: keyof CheckoutFormData) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errs = validate(step, data);
    setErrors((prev) => ({ ...prev, [field]: errs[field] }));
  };

  const handleNext = async () => {
    const errs = validate(step, data);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      const allTouched: Partial<Record<keyof CheckoutFormData, boolean>> = {};
      Object.keys(errs).forEach((k) => { allTouched[k as keyof CheckoutFormData] = true; });
      setTouched((prev) => ({ ...prev, ...allTouched }));
      return;
    }
    if (step === 2) {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 1200));
      setLoading(false);
      onComplete(data);
      setStep(3);
    } else {
      setStep((s) => (s + 1) as Step);
    }
  };

  const handleBack = () => setStep((s) => (s - 1) as Step);

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
  };

  return (
    <div className="space-y-8">
      {/* Step indicators */}
      <div className="flex items-center">
        {STEPS.map((s, i) => {
          const done = step > s.id;
          const active = step === s.id;
          return (
            <div key={s.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-1">
                <div
                  className={cn(
                    "w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300",
                    done ? "bg-[var(--color-success)] text-white" :
                      active ? "bg-[var(--color-accent)] text-white ring-4 ring-[var(--color-accent)]/20" :
                        "bg-[var(--color-muted)] text-[var(--color-muted-foreground)]"
                  )}
                >
                  {done ? (
                    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <s.icon className="w-4 h-4" />
                  )}
                </div>
                <span className={cn(
                  "text-xs font-medium",
                  active ? "text-[var(--color-accent)]" : done ? "text-[var(--color-success)]" : "text-[var(--color-muted-foreground)]"
                )}>
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={cn(
                  "flex-1 h-px mx-2 mb-4 transition-colors duration-500",
                  done ? "bg-[var(--color-success)]" : "bg-[var(--color-border)]"
                )} />
              )}
            </div>
          );
        })}
      </div>

      {/* Form steps */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          {step === 1 && (
            <motion.div
              key="step1"
              custom={1}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="space-y-4"
            >
              <h2 className="text-lg font-semibold text-[var(--color-foreground)]">
                Shipping Address
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <Field label="First Name" error={errors.firstName} required>
                  <input
                    type="text"
                    autoComplete="given-name"
                    value={data.firstName}
                    onChange={set("firstName")}
                    onBlur={blur("firstName")}
                    className={inputClass(errors.firstName)}
                    placeholder="Alex"
                  />
                </Field>
                <Field label="Last Name" error={errors.lastName} required>
                  <input
                    type="text"
                    autoComplete="family-name"
                    value={data.lastName}
                    onChange={set("lastName")}
                    onBlur={blur("lastName")}
                    className={inputClass(errors.lastName)}
                    placeholder="Johnson"
                  />
                </Field>
              </div>
              <Field label="Email" error={errors.email} required>
                <input
                  type="email"
                  autoComplete="email"
                  value={data.email}
                  onChange={set("email")}
                  onBlur={blur("email")}
                  className={inputClass(errors.email)}
                  placeholder="alex@example.com"
                />
              </Field>
              <Field label="Phone">
                <input
                  type="tel"
                  autoComplete="tel"
                  value={data.phone}
                  onChange={set("phone")}
                  onBlur={blur("phone")}
                  className={inputClass()}
                  placeholder="+1 (555) 000-0000"
                />
              </Field>
              <Field label="Street Address" error={errors.address} required>
                <input
                  type="text"
                  autoComplete="street-address"
                  value={data.address}
                  onChange={set("address")}
                  onBlur={blur("address")}
                  className={inputClass(errors.address)}
                  placeholder="123 Main Street, Apt 4"
                />
              </Field>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <Field label="City" error={errors.city} required>
                    <input
                      type="text"
                      autoComplete="address-level2"
                      value={data.city}
                      onChange={set("city")}
                      onBlur={blur("city")}
                      className={inputClass(errors.city)}
                      placeholder="New York"
                    />
                  </Field>
                </div>
                <Field label="ZIP" error={errors.zip} required>
                  <input
                    type="text"
                    autoComplete="postal-code"
                    value={data.zip}
                    onChange={set("zip")}
                    onBlur={blur("zip")}
                    className={inputClass(errors.zip)}
                    placeholder="10001"
                  />
                </Field>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              custom={1}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="space-y-4"
            >
              <h2 className="text-lg font-semibold text-[var(--color-foreground)]">
                Payment Details
              </h2>
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-700 flex items-center gap-2">
                <CreditCard className="w-4 h-4 flex-shrink-0" />
                This is a demo. No real payment is processed.
              </div>
              <Field label="Card Number" error={errors.cardNumber} required>
                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="cc-number"
                  value={data.cardNumber}
                  onChange={(e) => setData((p) => ({ ...p, cardNumber: formatCardNumber(e.target.value) }))}
                  onBlur={blur("cardNumber")}
                  className={inputClass(errors.cardNumber)}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                />
              </Field>
              <Field label="Name on Card" error={errors.cardName} required>
                <input
                  type="text"
                  autoComplete="cc-name"
                  value={data.cardName}
                  onChange={set("cardName")}
                  onBlur={blur("cardName")}
                  className={inputClass(errors.cardName)}
                  placeholder="Alex Johnson"
                />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Expiry Date" error={errors.cardExpiry} required>
                  <input
                    type="text"
                    inputMode="numeric"
                    autoComplete="cc-exp"
                    value={data.cardExpiry}
                    onChange={(e) => setData((p) => ({ ...p, cardExpiry: formatExpiry(e.target.value) }))}
                    onBlur={blur("cardExpiry")}
                    className={inputClass(errors.cardExpiry)}
                    placeholder="MM/YY"
                    maxLength={5}
                  />
                </Field>
                <Field label="CVC" error={errors.cardCvc} required>
                  <input
                    type="text"
                    inputMode="numeric"
                    autoComplete="cc-csc"
                    value={data.cardCvc}
                    onChange={(e) => setData((p) => ({ ...p, cardCvc: e.target.value.replace(/\D/g, "").slice(0, 4) }))}
                    onBlur={blur("cardCvc")}
                    className={inputClass(errors.cardCvc)}
                    placeholder="123"
                    maxLength={4}
                  />
                </Field>
              </div>
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={data.saveInfo}
                  onChange={set("saveInfo")}
                  className="w-4 h-4 rounded border-[var(--color-border)] accent-[var(--color-accent)]"
                />
                <span className="text-sm text-[var(--color-secondary)]">
                  Save payment info for next time
                </span>
              </label>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              custom={1}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="text-center py-4"
            >
              <div className="text-sm text-[var(--color-secondary)] space-y-1">
                <p>Shipping to: <strong className="text-[var(--color-foreground)]">{data.firstName} {data.lastName}</strong></p>
                <p>{data.address}, {data.city} {data.zip}</p>
                <p>Card ending in <strong className="text-[var(--color-foreground)]">{data.cardNumber.slice(-4)}</strong></p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      {step < 3 && (
        <div className="flex items-center gap-3 pt-2">
          {step > 1 && (
            <Button variant="outline" size="lg" onClick={handleBack}>
              Back
            </Button>
          )}
          <Button
            variant="accent"
            size="lg"
            fullWidth
            loading={loading}
            onClick={handleNext}
            rightIcon={<ChevronRight className="w-4 h-4" />}
          >
            {step === 2 ? "Place Order" : "Continue"}
          </Button>
        </div>
      )}
    </div>
  );
}
