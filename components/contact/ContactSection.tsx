"use client";

import { ChatCircleTextIcon, LockSimpleIcon, WhatsappLogoIcon } from "@phosphor-icons/react/ssr";
import { MotionConfig, motion } from "framer-motion";
import { useId, useState, type FormEvent, type ReactNode } from "react";
import { EASE_EXPO } from "@/components/hero/motion";
import { CONTACT, hasContactChannels } from "@/content/contact";
import { formatPrice, PLANS } from "@/content/pricing";
import { ContactChannels } from "./ContactChannels";
import { composeContactMessage, isWhatsAppConfigured, whatsappLink, type ContactDetails } from "@/lib/whatsapp";

const PLAN_OPTIONS = [
  "Ainda não sei",
  ...PLANS.map((p) => `${p.name} (${formatPrice(p.price)})`),
  "Orçamento à medida",
];

const EMPTY: ContactDetails = { name: "", business: "", plan: PLAN_OPTIONS[0], message: "" };

type Errors = Partial<Record<"name" | "message", string>>;

function validate(values: ContactDetails): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = "Diz-nos o teu nome.";
  if (values.message.trim().length < 10) errors.message = "Conta-nos um pouco mais (mínimo 10 caracteres).";
  return errors;
}

export function ContactSection() {
  const [values, setValues] = useState<ContactDetails>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const ids = useId();

  const set = (field: keyof ContactDetails) => (value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    // Clear a field's error as soon as it becomes valid.
    if (field in errors) setErrors((e) => ({ ...e, [field]: validate({ ...values, [field]: value })[field as keyof Errors] }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    const firstInvalid = (Object.keys(found) as (keyof Errors)[])[0];
    if (firstInvalid) {
      document.getElementById(`${ids}-${firstInvalid}`)?.focus();
      return;
    }
    const link = whatsappLink(composeContactMessage(values));
    if (!link.external) return;
    window.open(link.anchorProps.href, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="contacto"
        aria-labelledby="contacto-title"
        className="relative overflow-hidden border-t border-white/[.06] bg-ink px-[clamp(20px,4vw,56px)] py-[clamp(72px,11vh,128px)]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 bottom-0 h-[600px] w-[min(900px,100%)] bg-[radial-gradient(60%_60%_at_80%_80%,rgba(37,99,235,.14),transparent_70%)]"
        />

        <div className="relative mx-auto grid max-w-[1180px] gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE_EXPO }}
          >
            <p className="flex items-center gap-3 text-[11.5px] tracking-[.16em] text-muted uppercase">
              <span aria-hidden className="hero-rule h-px w-[clamp(24px,4vw,54px)]" />
              Contacto
            </p>
            <h2
              id="contacto-title"
              className="mt-4 text-[clamp(30px,4.2vw,52px)] leading-[1.02] font-extrabold tracking-[-.03em] text-balance"
            >
              Vamos criar a tua <span className="hero-headline-gradient">página que vende.</span>
            </h2>
            <p className="mt-4 max-w-[480px] text-[clamp(15px,1.1vw,17px)] leading-[1.62] text-pretty text-fg-2">
              Preenche o formulário e a mensagem abre no teu WhatsApp, pronta a enviar. Respondemos com os próximos
              passos e uma proposta para o teu projeto.
            </p>

            <ul className="mt-8 grid gap-4">
              <Perk icon={<WhatsappLogoIcon size={20} />} title="Direto no WhatsApp">
                A mensagem abre no teu WhatsApp e falas connosco numa conversa normal.
              </Perk>
              <Perk icon={<ChatCircleTextIcon size={20} />} title="Sem compromisso">
                A primeira conversa serve para perceber o que precisas.
              </Perk>
              <Perk icon={<LockSimpleIcon size={20} />} title="Não guardamos os teus dados">
                O formulário só prepara a mensagem. Nada é enviado até carregares em enviar no WhatsApp.
              </Perk>
            </ul>

            {hasContactChannels && (
              <div className="mt-8">
                <ContactChannels />
              </div>
            )}
          </motion.div>

          <motion.form
            noValidate
            onSubmit={onSubmit}
            aria-labelledby="contacto-title"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE_EXPO, delay: 0.08 }}
            className="rounded-[18px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,.04),rgba(255,255,255,.015))] p-[clamp(20px,3vw,36px)] shadow-[0_30px_100px_rgba(2,3,8,.55)]"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id={`${ids}-name`} label="Nome" error={errors.name} required>
                <input
                  id={`${ids}-name`}
                  name="name"
                  autoComplete="name"
                  value={values.name}
                  onChange={(e) => set("name")(e.target.value)}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? `${ids}-name-error` : undefined}
                  className={inputClass(!!errors.name)}
                  placeholder="O teu nome"
                />
              </Field>
              <Field id={`${ids}-business`} label="Negócio" hint="opcional">
                <input
                  id={`${ids}-business`}
                  name="business"
                  autoComplete="organization"
                  value={values.business}
                  onChange={(e) => set("business")(e.target.value)}
                  className={inputClass(false)}
                  placeholder="Ex.: clínica, restaurante, loja"
                />
              </Field>
            </div>

            <Field id={`${ids}-plan`} label="Plano de interesse" className="mt-5">
              <div className="relative">
                <select
                  id={`${ids}-plan`}
                  name="plan"
                  value={values.plan}
                  onChange={(e) => set("plan")(e.target.value)}
                  className={`${inputClass(false)} appearance-none pr-10`}
                >
                  {PLAN_OPTIONS.map((o) => (
                    <option key={o} value={o} className="bg-ink-2">
                      {o}
                    </option>
                  ))}
                </select>
                <svg
                  aria-hidden
                  className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-muted"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M2 4.5l4 4 4-4" />
                </svg>
              </div>
            </Field>

            <Field id={`${ids}-message`} label="Mensagem" error={errors.message} required className="mt-5">
              <textarea
                id={`${ids}-message`}
                name="message"
                rows={4}
                value={values.message}
                onChange={(e) => set("message")(e.target.value)}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? `${ids}-message-error` : undefined}
                className={`${inputClass(!!errors.message)} min-h-[120px] resize-y`}
                placeholder="O que queres que a tua página consiga? Tens prazo ou referências?"
              />
            </Field>

            <button
              type="submit"
              disabled={!isWhatsAppConfigured}
              className="hero-cta-primary group/cta mt-7 inline-flex w-full items-center justify-center gap-2.5 rounded-[10px] border border-sky-300/35 px-5 py-4 text-[15.5px] font-semibold text-fg transition-shadow disabled:cursor-not-allowed disabled:opacity-50"
            >
              <WhatsappLogoIcon aria-hidden size={20} weight="fill" />
              Enviar pelo WhatsApp
              <span className="sr-only"> (abre o WhatsApp)</span>
            </button>

            <p role="status" className="mt-4 min-h-5 text-center text-[13.5px] text-fg-2">
              {!isWhatsAppConfigured
                ? CONTACT.email || CONTACT.phone
                  ? "O envio por WhatsApp está indisponível de momento. Usa os contactos diretos."
                  : "O contacto por WhatsApp ainda não está configurado."
                : sent
                  ? "Mensagem preparada no WhatsApp. Só falta carregares em enviar."
                  : ""}
            </p>
          </motion.form>
        </div>
      </section>
    </MotionConfig>
  );
}

function inputClass(invalid: boolean) {
  return `block w-full rounded-[10px] border bg-ink/70 px-4 py-3 text-[15px] text-fg placeholder:text-muted/80 transition-[border-color,box-shadow] duration-200 outline-none focus-visible:outline-none focus:border-sky/60 focus:shadow-[0_0_0_3px_rgba(56,189,248,.18)] ${
    invalid ? "border-red-400/70" : "border-white/12 hover:border-white/25"
  }`;
}

function Field({
  id,
  label,
  hint,
  error,
  required,
  className = "",
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 flex items-baseline gap-2 text-[13.5px] font-medium text-soft">
        {label}
        {required && (
          <span aria-hidden className="text-sky-300">
            *
          </span>
        )}
        {hint && <span className="text-[12px] font-normal text-muted">{hint}</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-[13px] text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}

function Perk({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <li className="flex gap-4">
      <span aria-hidden className="grid size-10 flex-none place-items-center rounded-[10px] border border-white/10 bg-white/[.04] text-sky-300">
        {icon}
      </span>
      <span>
        <span className="block font-semibold text-soft">{title}</span>
        <span className="mt-0.5 block text-[14.5px] leading-relaxed text-fg-2">{children}</span>
      </span>
    </li>
  );
}
