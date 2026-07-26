import type { Metadata } from "next";
import { ThemeToggle } from "@/components/design/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Design System",
  description: "DevFlow AI design system playground — tokens and primitives.",
};

/* ── Small local building blocks for the playground itself ─────────────────
   These are NOT product components — they only exist to document the system
   on this page. Real primitives are the shadcn imports above. */

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="scroll-mt-24 border-t border-border py-12 first:border-t-0">
      <div className="mb-6">
        <h2 className="text-lg font-medium tracking-tight text-text-strong">
          {title}
        </h2>
        {description ? (
          <p className="mt-1 max-w-2xl text-sm text-text-muted">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

function Swatch({
  name,
  varName,
  note,
}: {
  name: string;
  varName: string;
  note?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="h-16 w-full rounded-[var(--radius)] border border-border"
        style={{ backgroundColor: `var(${varName})` }}
      />
      <div className="flex flex-col">
        <span className="text-xs font-medium text-text">{name}</span>
        <span className="font-mono text-[11px] text-text-muted">{varName}</span>
        {note ? (
          <span className="mt-0.5 text-[11px] text-text-muted">{note}</span>
        ) : null}
      </div>
    </div>
  );
}

export default function DesignSystemPage() {
  return (
    <>
      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* Header */}
        <header className="flex items-start justify-between gap-4 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span
                aria-hidden
                className="inline-block h-3 w-3 rounded-[4px]"
                style={{ backgroundColor: "var(--color-primary)" }}
              />
              <span
                aria-hidden
                className="inline-block h-3 w-3 rounded-[4px]"
                style={{ backgroundColor: "var(--color-ai)" }}
              />
              <h1 className="text-xl font-semibold tracking-tight text-text-strong">
                DevFlow AI · Design System
              </h1>
            </div>
            <p className="mt-2 max-w-2xl text-sm text-text-muted">
              Living playground. Primitives land here as they&apos;re built.
              Indigo is the product and the human; cyan means the AI is acting,
              and appears nowhere else.
            </p>
          </div>
          <ThemeToggle />
        </header>

        {/* Color law */}
        <Section
          title="The color law"
          description="One rule the whole interface obeys. Indigo = action, focus, the product. Cyan = AI, and only AI."
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-[var(--radius)] border border-border bg-surface p-4">
              <div className="mb-3 flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: "var(--color-primary)" }}
                />
                <span className="text-sm font-medium text-text">
                  Indigo — the product / the human
                </span>
              </div>
              <p className="text-sm text-text-muted">
                Buttons, active nav, links, selection, focus rings. DevFlow&apos;s
                identity.
              </p>
            </div>
            <div className="rounded-[var(--radius)] border border-border bg-surface p-4">
              <div className="mb-3 flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: "var(--color-ai)" }}
                />
                <span className="text-sm font-medium text-text">
                  Cyan — the machine
                </span>
              </div>
              <p className="text-sm text-text-muted">
                Triage, proposals, semantic search, AI cost. If you see cyan, the
                AI is acting. Never decorative.
              </p>
            </div>
          </div>
        </Section>

        {/* Surfaces & borders */}
        <Section
          title="Surfaces & borders"
          description="Depth comes from layered graphite and hairline borders, not heavy shadows."
        >
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            <Swatch name="Background" varName="--color-background" note="page" />
            <Swatch name="Surface" varName="--color-surface" note="cards" />
            <Swatch
              name="Raised"
              varName="--color-surface-raised"
              note="popovers"
            />
            <Swatch name="Border" varName="--color-border" note="hairline" />
            <Swatch name="Border strong" varName="--color-border-strong" />
            <Swatch name="Border stronger" varName="--color-border-stronger" />
          </div>
        </Section>

        {/* Brand & status */}
        <Section
          title="Brand & status roles"
          description="Semantic, not decorative. Each color means one thing."
        >
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            <Swatch name="Primary" varName="--color-primary" note="indigo" />
            <Swatch name="AI" varName="--color-ai" note="cyan — AI only" />
            <Swatch name="Success" varName="--color-success" note="emerald" />
            <Swatch name="Warning" varName="--color-warning" note="amber" />
            <Swatch name="Danger" varName="--color-danger" note="rose" />
            <Swatch name="Ring" varName="--color-ring" note="focus" />
          </div>
        </Section>

        {/* Text ramp */}
        <Section
          title="Text ramp"
          description="Four levels of emphasis, from headings to hints."
        >
          <div className="flex flex-col gap-2 rounded-[var(--radius)] border border-border bg-surface p-5">
            <p className="text-base text-text-strong">
              Text strong — headings and high-emphasis
            </p>
            <p className="text-base text-text">
              Text — default body content
            </p>
            <p className="text-base text-text-secondary">
              Text secondary — supporting detail
            </p>
            <p className="text-base text-text-muted">
              Text muted — hints, metadata, timestamps
            </p>
          </div>
        </Section>

        {/* Typography */}
        <Section
          title="Typography"
          description="Geist Sans for everything; Geist Mono for IDs, timestamps, branches, cost."
        >
          <div className="flex flex-col gap-4 rounded-[var(--radius)] border border-border bg-surface p-5">
            <div className="flex flex-col gap-1">
              <span className="text-4xl font-semibold tracking-tight text-text-strong">
                The AI issue tracker
              </span>
              <span className="font-mono text-[11px] text-text-muted">
                4xl · font-semibold · -tracking-tight
              </span>
            </div>
            <Separator />
            <div className="flex flex-col gap-1">
              <span className="text-2xl font-medium tracking-tight text-text">
                where humans stay in control
              </span>
              <span className="font-mono text-[11px] text-text-muted">
                2xl · font-medium
              </span>
            </div>
            <Separator />
            <div className="flex flex-col gap-1">
              <span className="text-base text-text">
                Body copy sets the reading rhythm of the product.
              </span>
              <span className="font-mono text-[11px] text-text-muted">
                base · font-normal
              </span>
            </div>
            <Separator />
            <div className="flex flex-col gap-1">
              <span className="font-mono text-sm text-text">
                DF-142 · feat/board · $0.0043
              </span>
              <span className="font-mono text-[11px] text-text-muted">
                Geist Mono · ids, branches, cost
              </span>
            </div>
          </div>
        </Section>

        {/* Radius */}
        <Section
          title="Radius"
          description="12px is the identity anchor. Smaller for inner controls, larger for containers."
        >
          <div className="flex flex-wrap items-end gap-6">
            {[
              { label: "sm · 8px", v: "--radius-sm" },
              { label: "base · 12px", v: "--radius" },
              { label: "lg · 16px", v: "--radius-lg" },
            ].map((r) => (
              <div key={r.v} className="flex flex-col items-center gap-2">
                <div
                  className="h-20 w-20 border border-border bg-surface-raised"
                  style={{ borderRadius: `var(${r.v})` }}
                />
                <span className="font-mono text-[11px] text-text-muted">
                  {r.label}
                </span>
              </div>
            ))}
          </div>
        </Section>

        {/* Spacing */}
        <Section
          title="Spacing scale"
          description="A 4px base rhythm. Consistent spacing is what makes density feel intentional."
        >
          <div className="flex flex-col gap-3">
            {[1, 2, 3, 4, 6, 8, 12].map((n) => (
              <div key={n} className="flex items-center gap-4">
                <span className="w-16 font-mono text-[11px] text-text-muted">
                  {n * 4}px
                </span>
                <div
                  className="h-3 rounded-[var(--radius-sm)]"
                  style={{
                    width: `${n * 16}px`,
                    backgroundColor: "var(--color-primary-subtle)",
                  }}
                />
              </div>
            ))}
          </div>
        </Section>

        {/* Buttons — every variant & state */}
        <Section
          title="Button — variants & states"
          description="Default is indigo. Hover, focus (Tab to it), disabled, and loading all shown."
        >
          <div className="flex flex-col gap-6 rounded-[var(--radius)] border border-border bg-surface p-5">
            <div className="flex flex-wrap items-center gap-3">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
            <Separator />
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </div>
            <Separator />
            <div className="flex flex-wrap items-center gap-3">
              <Button disabled>Disabled</Button>
              <Button variant="outline" disabled>
                Disabled outline
              </Button>
              <Button disabled>
                <span className="mr-2 inline-block h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Loading
              </Button>
            </div>
          </div>
        </Section>

        {/* Inputs & form controls */}
        <Section
          title="Inputs & controls"
          description="Focus states use the indigo ring. Tab through to see them."
        >
          <div className="grid grid-cols-1 gap-6 rounded-[var(--radius)] border border-border bg-surface p-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="demo-input">Label</Label>
              <Input id="demo-input" placeholder="Type something…" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="demo-input-disabled">Disabled</Label>
              <Input
                id="demo-input-disabled"
                placeholder="Unavailable"
                disabled
              />
            </div>
            <div className="flex items-center gap-3">
              <Switch id="demo-switch" />
              <Label htmlFor="demo-switch">Toggle setting</Label>
            </div>
            <div className="flex items-center gap-3">
              <Switch id="demo-switch-on" defaultChecked />
              <Label htmlFor="demo-switch-on">Enabled by default</Label>
            </div>
          </div>
        </Section>

        {/* Badges */}
        <Section
          title="Badges"
          description="Status vocabulary. Note the AI badge is the only cyan element here."
        >
          <div className="flex flex-wrap items-center gap-3 rounded-[var(--radius)] border border-border bg-surface p-5">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <span
              className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
              style={{
                backgroundColor: "var(--color-ai-subtle)",
                color: "var(--color-ai)",
              }}
            >
              AI · triaged
            </span>
          </div>
        </Section>

        {/* Card + tooltip */}
        <Section
          title="Card & tooltip"
          description="Composed surfaces. Hover the button for the tooltip."
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Card title</CardTitle>
                <CardDescription>
                  Cards are the primary content surface — flat, bordered, no
                  heavy shadow.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-text-muted">
                  Body content sits here with comfortable padding.
                </p>
              </CardContent>
            </Card>
            <div className="flex items-center justify-center rounded-[var(--radius)] border border-border bg-surface p-5">
              <div className="text-center">
                <Button variant="outline">Outline button</Button>
                <p className="mt-3 text-xs text-text-muted">
                  Tooltip demo returns once its API is confirmed.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* Skeletons */}
        <Section
          title="Loading states"
          description="Skeletons match final layout dimensions so nothing reflows on load."
        >
          <div className="flex flex-col gap-3 rounded-[var(--radius)] border border-border bg-surface p-5">
            <div className="flex items-center gap-3">
              <Skeleton className="h-9 w-9 rounded-full" />
              <div className="flex flex-1 flex-col gap-2">
                <Skeleton className="h-3 w-1/3" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-5/6" />
          </div>
        </Section>

        <footer className="border-t border-border py-8 text-center">
          <p className="font-mono text-[11px] text-text-muted">
            DevFlow AI · design system · grows with every milestone
          </p>
        </footer>
      </div>
    </>
  );
}
