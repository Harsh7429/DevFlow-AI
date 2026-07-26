[1mdiff --git a/app/globals.css b/app/globals.css[m
[1mindex 78412e0..d23f974 100644[m
[1m--- a/app/globals.css[m
[1m+++ b/app/globals.css[m
[36m@@ -1,4 +1,8 @@[m
 @import "tailwindcss";[m
[32m+[m[32m@import "tw-animate-css";[m
[32m+[m[32m@import "shadcn/tailwind.css";[m
[32m+[m
[32m+[m[32m@custom-variant dark (&:is(.dark *));[m
 [m
 /* ============================================================================[m
    DevFlow AI — Design Tokens[m
[36m@@ -56,6 +60,70 @@[m
   --rose-600:    oklch(58.0% 0.180 16.0);[m
 [m
   --white:       oklch(100% 0 0);[m
[32m+[m
[32m+[m[32m  --background: oklch(1 0 0);[m
[32m+[m
[32m+[m[32m  --foreground: oklch(0.145 0 0);[m
[32m+[m
[32m+[m[32m  --card: oklch(1 0 0);[m
[32m+[m
[32m+[m[32m  --card-foreground: oklch(0.145 0 0);[m
[32m+[m
[32m+[m[32m  --popover: oklch(1 0 0);[m
[32m+[m
[32m+[m[32m  --popover-foreground: oklch(0.145 0 0);[m
[32m+[m
[32m+[m[32m  --primary: oklch(0.205 0 0);[m
[32m+[m
[32m+[m[32m  --primary-foreground: oklch(0.985 0 0);[m
[32m+[m
[32m+[m[32m  --secondary: oklch(0.97 0 0);[m
[32m+[m
[32m+[m[32m  --secondary-foreground: oklch(0.205 0 0);[m
[32m+[m
[32m+[m[32m  --muted: oklch(0.97 0 0);[m
[32m+[m
[32m+[m[32m  --muted-foreground: oklch(0.556 0 0);[m
[32m+[m
[32m+[m[32m  --accent: oklch(0.97 0 0);[m
[32m+[m
[32m+[m[32m  --accent-foreground: oklch(0.205 0 0);[m
[32m+[m
[32m+[m[32m  --destructive: oklch(0.577 0.245 27.325);[m
[32m+[m
[32m+[m[32m  --border: oklch(0.922 0 0);[m
[32m+[m
[32m+[m[32m  --input: oklch(0.922 0 0);[m
[32m+[m
[32m+[m[32m  --ring: oklch(0.708 0 0);[m
[32m+[m
[32m+[m[32m  --chart-1: oklch(0.87 0 0);[m
[32m+[m
[32m+[m[32m  --chart-2: oklch(0.556 0 0);[m
[32m+[m
[32m+[m[32m  --chart-3: oklch(0.439 0 0);[m
[32m+[m
[32m+[m[32m  --chart-4: oklch(0.371 0 0);[m
[32m+[m
[32m+[m[32m  --chart-5: oklch(0.269 0 0);[m
[32m+[m
[32m+[m[32m  --radius: 0.625rem;[m
[32m+[m
[32m+[m[32m  --sidebar: oklch(0.985 0 0);[m
[32m+[m
[32m+[m[32m  --sidebar-foreground: oklch(0.145 0 0);[m
[32m+[m
[32m+[m[32m  --sidebar-primary: oklch(0.205 0 0);[m
[32m+[m
[32m+[m[32m  --sidebar-primary-foreground: oklch(0.985 0 0);[m
[32m+[m
[32m+[m[32m  --sidebar-accent: oklch(0.97 0 0);[m
[32m+[m
[32m+[m[32m  --sidebar-accent-foreground: oklch(0.205 0 0);[m
[32m+[m
[32m+[m[32m  --sidebar-border: oklch(0.922 0 0);[m
[32m+[m
[32m+[m[32m  --sidebar-ring: oklch(0.708 0 0);[m
 }[m
 [m
 /* ─── Layer 2: Semantic tokens (DARK — the default) ────────────────────────[m
[36m@@ -189,10 +257,76 @@[m
   --radius-sm:             var(--radius-sm);[m
   --radius-lg:             var(--radius-lg);[m
 [m
[31m-  --font-sans:             var(--font-geist-sans);[m
[32m+[m[32m  --font-sans: var(--font-sans);[m
   --font-mono:             var(--font-geist-mono);[m
 [m
   --ease-brand:            var(--ease);[m
[32m+[m
[32m+[m[32m  --font-heading: var(--font-sans);[m
[32m+[m
[32m+[m[32m  --color-sidebar-ring: var(--sidebar-ring);[m
[32m+[m
[32m+[m[32m  --color-sidebar-border: var(--sidebar-border);[m
[32m+[m
[32m+[m[32m  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);[m
[32m+[m
[32m+[m[32m  --color-sidebar-accent: var(--sidebar-accent);[m
[32m+[m
[32m+[m[32m  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);[m
[32m+[m
[32m+[m[32m  --color-sidebar-primary: var(--sidebar-primary);[m
[32m+[m
[32m+[m[32m  --color-sidebar-foreground: var(--sidebar-foreground);[m
[32m+[m
[32m+[m[32m  --color-sidebar: var(--sidebar);[m
[32m+[m
[32m+[m[32m  --color-chart-5: var(--chart-5);[m
[32m+[m
[32m+[m[32m  --color-chart-4: var(--chart-4);[m
[32m+[m
[32m+[m[32m  --color-chart-3: var(--chart-3);[m
[32m+[m
[32m+[m[32m  --color-chart-2: var(--chart-2);[m
[32m+[m
[32m+[m[32m  --color-chart-1: var(--chart-1);[m
[32m+[m
[32m+[m[32m  --color-input: var(--input);[m
[32m+[m
[32m+[m[32m  --color-destructive: var(--destructive);[m
[32m+[m
[32m+[m[32m  --color-accent-foreground: var(--accent-foreground);[m
[32m+[m
[32m+[m[32m  --color-accent: var(--accent);[m
[32m+[m
[32m+[m[32m  --color-muted-foreground: var(--muted-foreground);[m
[32m+[m
[32m+[m[32m  --color-muted: var(--muted);[m
[32m+[m
[32m+[m[32m  --color-secondary-foreground: var(--secondary-foreground);[m
[32m+[m
[32m+[m[32m  --color-secondary: var(--secondary);[m
[32m+[m
[32m+[m[32m  --color-primary-foreground: var(--primary-foreground);[m
[32m+[m
[32m+[m[32m  --color-popover-foreground: var(--popover-foreground);[m
[32m+[m
[32m+[m[32m  --color-popover: var(--popover);[m
[32m+[m
[32m+[m[32m  --color-card-foreground: var(--card-foreground);[m
[32m+[m
[32m+[m[32m  --color-card: var(--card);[m
[32m+[m
[32m+[m[32m  --color-foreground: var(--foreground);[m
[32m+[m
[32m+[m[32m  --radius-md: calc(var(--radius) * 0.8);[m
[32m+[m
[32m+[m[32m  --radius-xl: calc(var(--radius) * 1.4);[m
[32m+[m
[32m+[m[32m  --radius-2xl: calc(var(--radius) * 1.8);[m
[32m+[m
[32m+[m[32m  --radius-3xl: calc(var(--radius) * 2.2);[m
[32m+[m
[32m+[m[32m  --radius-4xl: calc(var(--radius) * 2.6);[m
 }[m
 [m
 /* ─── Base layer ───────────────────────────────────────────────────────────[m
[36m@@ -201,6 +335,7 @@[m
 @layer base {[m
   * {[m
     border-color: var(--color-border);[m
[32m+[m[32m    @apply border-border outline-ring/50;[m
   }[m
   body {[m
     background-color: var(--color-background);[m
[36m@@ -208,6 +343,7 @@[m
     font-feature-settings: "cv11", "ss01";[m
     -webkit-font-smoothing: antialiased;[m
     text-rendering: optimizeLegibility;[m
[32m+[m[32m    @apply bg-background text-foreground;[m
   }[m
   :focus-visible {[m
     outline: 2px solid var(--color-ring);[m
[36m@@ -220,4 +356,41 @@[m
       transition-duration: 0.01ms !important;[m
     }[m
   }[m
[32m+[m[32m  html {[m
[32m+[m[32m    @apply font-sans;[m
[32m+[m[32m  }[m
 }[m
[32m+[m
[32m+[m[32m.dark {[m
[32m+[m[32m  --background: oklch(0.145 0 0);[m
[32m+[m[32m  --foreground: oklch(0.985 0 0);[m
[32m+[m[32m  --card: oklch(0.205 0 0);[m
[32m+[m[32m  --card-foreground: oklch(0.985 0 0);[m
[32m+[m[32m  --popover: oklch(0.205 0 0);[m
[32m+[m[32m  --popover-foreground: oklch(0.985 0 0);[m
[32m+[m[32m  --primary: oklch(0.922 0 0);[m
[32m+[m[32m  --primary-foreground: oklch(0.205 0 0);[m
[32m+[m[32m  --secondary: oklch(0.269 0 0);[m
[32m+[m[32m  --secondary-foreground: oklch(0.985 0 0);[m
[32m+[m[32m  --muted: oklch(0.269 0 0);[m
[32m+[m[32m  --muted-foreground: oklch(0.708 0 0);[m
[32m+[m[32m  --accent: oklch(0.269 0 0);[m
[32m+[m[32m  --accent-foreground: oklch(0.985 0 0);[m
[32m+[m[32m  --destructive: oklch(0.704 0.191 22.216);[m
[32m+[m[32m  --border: oklch(1 0 0 / 10%);[m
[32m+[m[32m  --input: oklch(1 0 0 / 15%);[m
[32m+[m[32m  --ring: oklch(0.556 0 0);[m
[32m+[m[32m  --chart-1: oklch(0.87 0 0);[m
[32m+[m[32m  --chart-2: oklch(0.556 0 0);[m
[32m+[m[32m  --chart-3: oklch(0.439 0 0);[m
[32m+[m[32m  --chart-4: oklch(0.371 0 0);[m
[32m+[m[32m  --chart-5: oklch(0.269 0 0);[m
[32m+[m[32m  --sidebar: oklch(0.205 0 0);[m
[32m+[m[32m  --sidebar-foreground: oklch(0.985 0 0);[m
[32m+[m[32m  --sidebar-primary: oklch(0.488 0.243 264.376);[m
[32m+[m[32m  --sidebar-primary-foreground: oklch(0.985 0 0);[m
[32m+[m[32m  --sidebar-accent: oklch(0.269 0 0);[m
[32m+[m[32m  --sidebar-accent-foreground: oklch(0.985 0 0);[m
[32m+[m[32m  --sidebar-border: oklch(1 0 0 / 10%);[m
[32m+[m[32m  --sidebar-ring: oklch(0.556 0 0);[m
[32m+[m[32m}[m
\ No newline at end of file[m
