"use client";

import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Shield,
  Clock,
  BrainCircuit,
  Users,
  Zap,
  Video,
  Bot,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Video,
    title: "AI-Powered Video Calls",
    description:
      "Crystal-clear video meetings enhanced with real-time AI transcription and analysis.",
  },
  {
    icon: BrainCircuit,
    title: "Smart AI Agents",
    description:
      "Deploy intelligent agents that listen, learn, and assist during your conversations.",
  },
  {
    icon: Users,
    title: "Seamless Collaboration",
    description:
      "Invite team members and collaborate in real-time with synchronized sessions.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Bank-level encryption with granular access controls and compliance.",
  },
  {
    icon: Clock,
    title: "Meeting Intelligence",
    description:
      "Automatic summaries, action items, and searchable transcripts for every call.",
  },
  {
    icon: Zap,
    title: "Instant Insights",
    description:
      "Get real-time insights and recommendations powered by advanced AI.",
  },
];


export const HomeView = () => {
  return (
    <div className="relative flex flex-col items-center w-full bg-gradient-to-b from-green-50/30 via-background to-background dark:from-green-950/20">
      {/* Gradient Background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-1/2 top-1/2 h-[1200px] w-[1200px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-green-500/20 via-emerald-500/15 to-teal-500/20 blur-3xl" />
        <div className="absolute left-1/4 top-1/4 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-emerald-400/10 to-teal-400/10 blur-2xl" />
      </div>

      {/* Hero Section */}
      <section className="w-full px-4 pt-16 md:pt-24 lg:pt-32 pb-12">
        <div className="mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border bg-muted/40 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-green-500" />
            Next-Generation AI Video Platform
          </div>
          <h1 className="mt-8 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
            Video Calls Powered by Intelligence
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg md:text-xl">
            Experience the future of video communication with AI agents that
            understand context, provide insights, and enhance every conversation
            in real-time.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              <Link href="/meetings">
                <Video className="h-5 w-5" />
                Start a Meeting
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link href="/agents">
                <Bot className="h-5 w-5" />
                Explore AI Agents
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="w-full px-4 py-20 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              Everything you need for smarter meetings
            </h2>
            <p className="mt-4 text-lg text-muted-foreground md:text-xl">
              Powerful features that work together to transform your video calls
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, idx) => (
              <div
                key={feature.title}
                className={cn(
                  "group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card/50 p-6 shadow-sm backdrop-blur-sm transition-all duration-300",
                  "hover:shadow-xl hover:border-green-500/50 hover:-translate-y-1"
                )}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500/20 via-emerald-500/20 to-teal-500/20 text-green-600 transition-transform duration-300 group-hover:scale-110">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
                <div className="mt-6 h-px w-0 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 transition-all duration-500 group-hover:w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full px-4 py-20 md:py-32">
        <div className="mx-auto flex max-w-4xl flex-col items-center rounded-3xl border bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-teal-500/10 p-12 text-center backdrop-blur-sm">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Ready to revolutionize your meetings?
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Join thousands of teams using TalkAI to make every conversation more
            productive, insightful, and engaging.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              <Link href="/dashboard/meetings">
                Start Your First Meeting <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/dashboard/agents">Explore AI Agents</Link>
            </Button>
          </div>
          <div className="mt-8 text-sm text-muted-foreground">
            No credit card required • Free tier available • Enterprise-ready
          </div>
        </div>
      </section>
    </div>
  );
};
