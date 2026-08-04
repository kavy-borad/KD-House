import React, { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Smartphone,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Users,
  Award,
  Sparkles,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Star,
  MessageSquare,
  ArrowRight,
  FileText,
  Check,
  AlertTriangle,
  Headphones,
  ArrowDown,
  X,
  FileCheck,
  ExternalLink,
  Download,
  BookOpen,
  CircleDot,
} from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/919874561520?text=Hi%20Karma%20Dude%20Team,%20I%20want%20to%20start%20Google%20Play%20Closed%20Testing.";

const openWhatsApp = () => {
  window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer");
};

const scrollToPricing = (e?: React.MouseEvent) => {
  if (e) e.preventDefault();
  const element = document.getElementById("pricing");
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

/* Fast Opening Background Laptop for Hero Section (Smooth Scroll-Driven 3D Opening) */
const LaptopHeroBackground: React.FC = () => {
  const { scrollY } = useScroll();
  // Lid opens smoothly as user scrolls down the page
  const rotateX = useTransform(scrollY, [0, 180], [45, 0]);
  const scale = useTransform(scrollY, [0, 220], [1.0, 1.15]);
  const opacity = useTransform(scrollY, [0, 180], [0.25, 0.35]);

  return (
    <div
      className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1000px] pointer-events-none z-0 flex justify-center items-center overflow-visible"
      style={{ perspective: "1500px" }}
    >
      <motion.div
        initial={{ rotateX: 45, opacity: 0.25 }}
        animate={{ rotateX: 0, opacity: 0.35 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        style={{
          rotateX,
          scale,
          opacity,
          transformOrigin: "center center",
          transformStyle: "preserve-3d",
        }}
        className="w-full relative flex flex-col items-center"
      >
        {/* Laptop Lid Screen Frame */}
        <div className="w-full aspect-[16/9.5] bg-[#0F172A] rounded-t-2xl sm:rounded-t-3xl p-3.5 sm:p-5 border-[3.5px] border-slate-700 shadow-2xl relative">
          {/* Webcam Dot */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-black rounded-full flex items-center justify-center z-30">
            <div className="w-1 h-1 bg-blue-500/60 rounded-full" />
          </div>

          {/* Neon Green Bezel Accent Frame */}
          <div className="w-full h-full bg-[#A3E635]/25 p-2.5 sm:p-4 rounded-xl md:rounded-2xl border-4 border-[#A3E635] relative overflow-hidden shadow-[0_0_40px_rgba(163,230,53,0.4)]">
            {/* Play Console Inner Screen */}
            <div className="w-full h-full bg-[#121212] text-white p-4 sm:p-7 rounded-lg md:rounded-xl flex flex-col justify-between text-left font-sans no-scrollbar">
              <div>
                {/* Google Play Console Logo Header */}
                <div className="flex items-center gap-2.5 mb-3 pb-2.5 border-b border-gray-800">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-blue-500">
                      <path d="M3 20.5v-17c0-.83.67-1.5 1.5-1.5h.35L17.5 12 4.85 22H4.5C3.67 22 3 21.33 3 20.5z" />
                      <path d="M17.5 12L4.85 2H4.5c.83 0 1.5.67 1.5 1.5v17c0 .83-.67 1.5-1.5 1.5h.35L17.5 12z" opacity="0.3" />
                    </svg>
                  </div>
                  <span className="font-semibold text-gray-200 text-xs sm:text-base tracking-tight">
                    Google Play <span className="text-blue-400 font-normal">Console</span>
                  </span>
                </div>

                {/* Main Success Notification */}
                <div className="space-y-3">
                  <div className="flex items-start gap-2.5">
                    <span className="text-gray-400 text-base sm:text-xl shrink-0 mt-0.5">ⓘ</span>
                    <h3 className="text-xs sm:text-lg font-bold text-white leading-snug">
                      Congratulations! Your app has been granted Google Play production access
                    </h3>
                  </div>

                  <p className="text-gray-200 text-[11px] sm:text-sm leading-relaxed pl-6">
                    You applied for Google Play production access for your app 'Testers Community' (com.testerscommunity), and this has now been granted. Production is where you make your app available to billions of users on Google Play.
                  </p>

                  <div className="pt-1 pl-6 space-y-1">
                    <h4 className="text-[11px] sm:text-sm font-bold text-gray-100">
                      Before you release to production
                    </h4>
                    <p className="text-gray-400 text-[10px] sm:text-xs leading-relaxed">
                      We recommend testing your app extensively before publishing your app to production, and routinely testing any future updates.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-800 text-[10px] sm:text-xs text-gray-400 space-y-0.5">
                <p>Thank you,</p>
                <p className="font-semibold text-gray-200">The Google Play Console team</p>
              </div>
            </div>
          </div>
        </div>

        {/* Laptop Keyboard Base Body & Hinge Deck */}
        <div className="w-[104%] h-4 sm:h-6 bg-gradient-to-b from-slate-600 via-slate-700 to-slate-800 rounded-b-xl shadow-2xl relative flex justify-center items-center border-t border-slate-500 mt-[-1px]">
          {/* Thumb Opening Notch */}
          <div className="w-16 sm:w-24 h-1.5 sm:h-2 bg-slate-900 rounded-b-md shadow-inner" />
        </div>
        {/* Base Floor Reflection Shadow */}
        <div className="w-[92%] h-3 bg-black/30 rounded-full blur-md mt-0.5" />
      </motion.div>
    </div>
  );
};

/* Review Card used by the animated marquee rows */
type Testimonial = {
  name: string;
  role: string;
  country: string;
  rating: number;
  review: string;
  appName: string;
};

/* Horizontal click-and-drag scroller for the chapter pill bar */
const DragScrollRow: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const isDown = React.useRef(false);
  const isDragging = React.useRef(false);
  const startX = React.useRef(0);
  const scrollLeftStart = React.useRef(0);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el) return;
    isDown.current = true;
    isDragging.current = false;
    startX.current = e.pageX - el.offsetLeft;
    scrollLeftStart.current = el.scrollLeft;
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDown.current) return;
    const el = trackRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = x - startX.current;
    // Only start "dragging" after crossing a threshold so taps still work
    if (!isDragging.current && Math.abs(walk) > 5) {
      isDragging.current = true;
    }
    if (isDragging.current) {
      e.preventDefault();
      el.scrollLeft = scrollLeftStart.current - walk;
    }
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el) return;
    isDown.current = false;
    try {
      el.releasePointerCapture(e.pointerId);
    } catch {
      /* no-op */
    }
    // Clear dragging flag on next tick so onClick can decide
    setTimeout(() => {
      isDragging.current = false;
    }, 0);
  };

  // Suppress click that would fire after a real drag
  const onClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging.current) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  return (
    <div
      ref={trackRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      onPointerCancel={onPointerUp}
      onClickCapture={onClickCapture}
      className={`flex gap-2 overflow-x-auto snap-x snap-mandatory cursor-grab select-none ${className}`}
      style={{
        WebkitOverflowScrolling: "touch",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        touchAction: "pan-x pan-y",
        userSelect: "none",
      }}
    >
      {children}
    </div>
  );
};

const ReviewCard: React.FC<{ t: Testimonial }> = ({ t }) => (
  <div className="w-[340px] sm:w-[380px] shrink-0 p-6 rounded-2xl bg-white border border-gray-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-1">
          {[...Array(t.rating)].map((_, i) => (
            <Star
              key={i}
              className="w-4 h-4 fill-amber-400 text-amber-400"
              strokeWidth={0}
            />
          ))}
        </div>
        <span className="text-xs text-gray-400 font-medium">{t.country}</span>
      </div>

      <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">
        "{t.review}"
      </p>
    </div>

    <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
      <div>
        <h4 className="text-sm font-bold text-gray-900">{t.name}</h4>
        <p className="text-xs text-[#2f8ecd] font-medium">{t.appName}</p>
      </div>

      <button
        onClick={openWhatsApp}
        className="px-3 py-1.5 rounded-full bg-gray-100 hover:bg-[#2f8ecd] hover:text-white text-xs font-semibold text-gray-700 transition-all cursor-pointer"
      >
        View App
      </button>
    </div>
  </div>
);

export const Testers: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [activeChapter, setActiveChapter] = useState<number>(1);
  const [selectedPlan, setSelectedPlan] = useState<"starter" | "pro">("starter");

  /* State for Sample PDF Modal Popup */
  const [showSampleModal, setShowSampleModal] = useState<boolean>(false);
  const [activePdfPreview, setActivePdfPreview] = useState<"feedback" | "answers" | null>(null);

  const testimonials = [
    {
      name: "Alex Rivera",
      role: "Solo Android Developer",
      country: "United States 🇺🇸",
      rating: 5,
      review:
        "Karma Dude saved my app release! I was struggling to find 12 active testers. Their team assigned 15 real testers within 4 hours, and we passed production review on our first try.",
      appName: "TaskPulse Pro",
    },
    {
      name: "Rajesh Kumar",
      role: "Founder, AppCraft Studio",
      country: "India 🇮🇳",
      rating: 5,
      review:
        "The production form answers provided in the Pro plan were invaluable. Google accepted our production access request within 24 hours of completing the 14-day test.",
      appName: "FinTrack Daily",
    },
    {
      name: "Sophie Laurent",
      role: "Indie Game Developer",
      country: "France 🇫🇷",
      rating: 5,
      review:
        "Extremely professional service. Real devices, genuine bug reports, and continuous daily engagement. Worth every single penny!",
      appName: "Pixel Quest RPG",
    },
    {
      name: "Marcus Vance",
      role: "Lead Dev, TechNova",
      country: "United Kingdom 🇬🇧",
      rating: 5,
      review:
        "Our app had been rejected twice before using Karma Dude. Their team guided us through the fix, ran 16 days of testing, and got us live smoothly.",
      appName: "HealthSync AI",
    },
    {
      name: "Lucas Silva",
      role: "Mobile App Engineer",
      country: "Brazil 🇧🇷",
      rating: 5,
      review:
        "Fast, reliable, and guaranteed! The dashboard feedback report gave us deep insight into real device crashes we hadn't caught during dev.",
      appName: "DeliveryFast",
    },
    {
      name: "Hannah Weber",
      role: "Product Owner",
      country: "Germany 🇩🇪",
      rating: 5,
      review:
        "Outstanding service! 25 testers on real Samsung & Pixel devices. The team was responsive on WhatsApp 24/7. Highly recommended!",
      appName: "MindSpace Meditation",
    },
    {
      name: "Kenji Sato",
      role: "Utility App Creator",
      country: "Japan 🇯🇵",
      rating: 5,
      review:
        "Google's 14-day requirement is a nightmare for solo devs. Karma Dude made it effortless. 100% genuine testers and rapid onboarding.",
      appName: "ScanEasy PDF",
    },
    {
      name: "Liam O'Connor",
      role: "Startup Founder",
      country: "Australia 🇦🇺",
      rating: 5,
      review:
        "Pro plan is the best investment. ASO report and store listing suggestions helped boost our initial launch downloads after approval!",
      appName: "FitFlow Coaching",
    },
  ];

  const faqs = [
    {
      q: "How do I get 12 testers?",
      a: "Simply select your plan (Starter or Pro), complete payment, and send us your Google Play Console opting-in link or email list. Within 6 hours, our team assigns verified Android device testers who will opt-in and actively engage with your app daily for 14 continuous days.",
    },
    {
      q: "How long does testing take?",
      a: "Google requires closed testing to run continuously for 14 full days. We run testing for 14-16 days to ensure seamless buffer time so Google's automated systems register complete daily engagement before you apply for Production Access.",
    },
    {
      q: "What is included in Starter?",
      a: "The Starter plan (₹999) includes 15 Android Testers, setup within 6 hours, full 14-day closed testing, Production Access Guarantee, detailed real-device feedback reports, tailored answers for Google's Production Application form, and 24/7 Email Support.",
    },
    {
      q: "Starter vs Pro?",
      a: "Starter (₹999) gives you 15 testers and full testing support. Pro (₹1,699) adds 25 Android Testers (ideal for complex or large apps), Priority WhatsApp Support, a complete ASO (App Store Optimization) report, and expert store listing suggestions to maximize post-approval downloads.",
    },
    {
      q: "What if Google rejects my app?",
      a: "We offer a 100% Production Access Guarantee! If Google rejects your production application due to testing engagement issues, we will run another full 14-day testing cycle with new testers completely free of charge until your app is approved.",
    },
    {
      q: "Can you test any language?",
      a: "Yes! Our international pool of testers supports apps in English, Spanish, French, German, Hindi, Japanese, Portuguese, and 20+ other major languages across different regions worldwide.",
    },
    {
      q: "When does testing start?",
      a: "Testing begins within 6 hours of receiving your app details and closed testing track access link. You will receive notification as soon as testers start downloading and opening your app.",
    },
    {
      q: "What apps are accepted?",
      a: "We accept all standard Android apps, games, utility tools, SaaS products, and business applications that comply with Google Play Developer Program Policies.",
    },
  ];

  const chapters = [
    {
      id: 1,
      title: "1. The Requirement",
      subtitle: "Understanding Google Play's Closed Testing Mandate",
      intro:
        "Google Play requires all personal developer accounts created after November 13, 2023, to conduct a mandatory closed test with a minimum of 12 opt-in testers continuously over 14 days before requesting production access.",
      keyFacts: [
        "Minimum 12 Opt-In Testers required",
        "Must run continuously for 14 full calendar days",
        "Testers must use real physical Android devices",
        "Must complete Google's Production Access Questionnaire",
      ],
      details:
        "Failing to meet any part of this criteria—such as testers opting out early or inactive accounts—will result in Google rejecting your Production Access request, forcing you to restart the 14-day timer.",
    },
    {
      id: 2,
      title: "2. Why Google Asks",
      subtitle: "Why Google Enforces 14-Day Testing Policy",
      intro:
        "Google introduced this policy to elevate app quality on the Play Store, reduce zero-day crashes, eliminate low-quality spam apps, and verify developer intent.",
      keyFacts: [
        "Updated policy reduced Play Store crash rates by 40%",
        "Eliminates bot/fake tester automation attempts",
        "Ensures developers fix UX issues prior to public rollout",
        "Verifies genuine user retention and engagement patterns",
      ],
      details:
        "Google's automated review system monitors device hardware IDs, IP distribution, app session duration, and opt-in stability throughout the 14-day window.",
    },
    {
      id: 3,
      title: "3. Who We Are",
      subtitle: "Karma Dude - India's #1 Android Testing Platform",
      intro:
        "Karma Dude IT Solutions is an enterprise software development studio specializing in mobile app engineering, AI automation, and Google Play compliance services.",
      keyFacts: [
        "50,000+ Android Developers Assisted Globally",
        "50,000+ Mobile Apps Managed & Tested",
        "10,000+ Apps Successfully Published to Google Play",
        "99.9% First-Time Production Access Approval Rate",
      ],
      details:
        "Our dedicated testing network spans real device farms and verified human testers across India, US, Europe, and Asia Pacific.",
    },
    {
      id: 4,
      title: "4. Free vs Managed",
      subtitle: "DIY Testing vs Karma Dude Managed Testing",
      intro:
        "Asking friends, family, or online groups often leads to inactive testers, missing days, and eventual Google rejection. Managed testing guarantees 100% compliance.",
      keyFacts: [
        "DIY: High risk of testers dropping out mid-test",
        "DIY: No structured feedback report or crash logs",
        "Managed: Guaranteed 15-25 active real-device testers",
        "Managed: Production Form Answers & 100% Approval Guarantee",
      ],
      details:
        "With Karma Dude Managed Service, you don't need to chase testers daily—our automated monitoring system ensures continuous 14-day active sessions.",
    },
    {
      id: 5,
      title: "5. Plans",
      subtitle: "Transparent, Fixed Pricing Plans",
      intro:
        "Choose between our Starter Plan for standard apps or our Pro Plan for high-priority apps requiring extra testers, ASO reports, and priority support.",
      keyFacts: [
        "Starter Plan (₹999): 15 Android Testers + Production Guarantee",
        "Pro Plan (₹1,699): 25 Android Testers + ASO Report + Priority Support",
        "No hidden charges or monthly recurring fees",
        "100% Money-Back / Re-test Guarantee",
      ],
      details:
        "All purchase buttons redirect directly to our official WhatsApp support for instant onboarding within minutes.",
    },
    {
      id: 6,
      title: "6. Timeline",
      subtitle: "16-Day Closed Testing Lifecycle Roadmap",
      intro:
        "We follow a strict, milestone-driven timeline to ensure your closed testing track satisfies all Google requirements effortlessly.",
      keyFacts: [
        "Day 0: App Onboarding & Setup (Within 6 Hours)",
        "Days 1 - 14: Active Daily Device Testing & Session Tracking",
        "Days 7 - 10: Mid-Term Bug & Feedback Report Delivery",
        "Day 14 - 16: Final Review & Production Access Form Application",
      ],
      details:
        "We provide extra buffer days (up to Day 16) to ensure Google's system logs 100% complete metrics before you hit 'Apply for Production'.",
    },
    {
      id: 7,
      title: "7. Real Testers",
      subtitle: "Verified Physical Android Devices & Real Users",
      intro:
        "Google detects emulators, virtual machines, and duplicated IP addresses. We strictly use physical Android smartphones with active Google accounts.",
      keyFacts: [
        "Supported Brands: Samsung, Google Pixel, OnePlus, Xiaomi, Oppo, Vivo, Motorola",
        "Diverse OS Versions: Android 10, 11, 12, 13, 14 & 15",
        "Genuine unique IP addresses and Google Play profiles",
        "Real human interaction, button taps, and usage sessions",
      ],
      details:
        "Every tester in our network is identity-verified, preventing bot detection or flagged accounts on Google Play Console.",
    },
    {
      id: 8,
      title: "8. What You Get",
      subtitle: "Complete Package Deliverables & Reports",
      intro:
        "Beyond testers, Karma Dude equips you with all the tools, documentation, and tailored answers required to pass Google's manual review.",
      keyFacts: [
        "Verified Tester Opt-ins & Active Daily Sessions",
        "Comprehensive Device Crash & Feedback Reports",
        "Tailored Answers for Google Play Production Application Questionnaire",
        "ASO Audit & Store Listing Recommendations (Pro Plan)",
      ],
      details:
        "When filling Google's 'Apply for Production' form, our provided answers directly address what Google reviewers want to hear about your testing feedback loop.",
    },
    {
      id: 9,
      title: "9. Why Choose Us",
      subtitle: "Unmatched Reliability, Speed & Guarantee",
      intro:
        "We are India's most trusted closed testing provider with over 10,000 published apps and a 99.9% approval track record.",
      keyFacts: [
        "6-Hour Rapid Onboarding",
        "100% Production Access Guarantee",
        "Dedicated WhatsApp Account Manager",
        "Continuous Daily Active Monitoring",
      ],
      details:
        "We handle all the operational heavy lifting so you can focus on building features and scaling your app business.",
    },
    {
      id: 10,
      title: "10. Experience",
      subtitle: "5+ Years of Google Play Compliance Mastery",
      intro:
        "Our team has navigated every Google Play Console policy update since 2019, ensuring your app stays compliant with the latest guidelines.",
      keyFacts: [
        "Over 500,000+ individual testing sessions logged",
        "Deep familiarity with Google Console policy shifts",
        "Expertise across Utility, Gaming, SaaS, and Fintech apps",
        "Direct guidance on handling Google policy queries",
      ],
      details:
        "You leverage half a decade of app store optimization and compliance expertise with every order.",
    },
    {
      id: 11,
      title: "11. Rejected Before?",
      subtitle: "App Rejected by Google? We Offer Full Recovery!",
      intro:
        "If Google previously rejected your production access request due to insufficient testing engagement, don't panic. Our recovery program fixes the root cause.",
      keyFacts: [
        "Detailed audit of your previous rejection reason",
        "Fresh pool of 15-25 active Android device testers",
        "New 14-day testing cycle with recorded engagement logs",
        "Rewritten Production Access Questionnaire responses",
      ],
      details:
        "Over 2,500 developers who were rejected on their first attempt successfully got approved after switching to Karma Dude.",
    },
    {
      id: 12,
      title: "12. Going Live",
      subtitle: "Step-by-Step Guidance to Final Store Release",
      intro:
        "The final step after completing 14 days of testing is submitting the Production Access Application. We walk you through every click.",
      keyFacts: [
        "Step 1: Verify 14 continuous days badge on Google Console",
        "Step 2: Fill Production Questionnaire using our provided templates",
        "Step 3: Submit for Google Manual Review",
        "Step 4: Receive Production Access & Publish Live to Store!",
      ],
      details:
        "Once approved, your app is unlocked for public release to billions of Android users worldwide on the Google Play Store!",
    },
  ];

  const currentChapterData = chapters.find((c) => c.id === activeChapter) || chapters[0];

  return (
    <>
      <Helmet>
        <title>Google Play Closed Testing Service | 12 Real Testers 14 Days - Karma Dude</title>
        <meta
          name="description"
          content="Get 12-25 real Android testers on physical devices for 14 continuous days. Pass Google Play closed testing requirements with 99.9% approval guarantee."
        />
        <meta
          name="keywords"
          content="Google play closed testing, 12 testers 14 days, android testing service, publish app to play store, production access guarantee, closed testing track, Karma Dude"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://karmadude.in/testers" />
      </Helmet>

      <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-blue-100 selection:text-blue-900">
        {/* Subtle Background Grain */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.4] mix-blend-multiply z-0">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12">
          {/* Swiss Editorial Hero Header with Low-Opacity 3D Laptop in Background */}
          <header className="pt-20 pb-16 md:pt-36 md:pb-24 relative overflow-visible mb-4 md:mb-8">
            {/* Background 3D Laptop Mockup */}
            <LaptopHeroBackground />

            {/* Foreground Content */}
            <div className="w-full relative z-10 pointer-events-none">
              {/* Top Meta Bar */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="flex justify-between items-center mb-6 md:mb-20 text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-[0.2em] relative z-20 pointer-events-auto"
              >
                <span className="text-[#2f8ecd]">KarmaDude</span>
                <span className="hidden md:inline text-gray-600">Google Play Closed Testing</span>
                <span className="text-gray-500">©2021</span>
              </motion.div>

              {/* Massive Swiss Editorial Typography */}
              <div className="relative">
                <motion.h1
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="text-[13vw] sm:text-[14vw] md:text-[13vw] lg:text-[11vw] xl:text-[10vw] leading-[0.85] font-bold text-gray-900 tracking-tighter pointer-events-auto"
                >
                  CLOSED
                </motion.h1>
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                  className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-6 lg:gap-8 md:pl-[12vw]"
                >
                  <h1 className="text-[13vw] sm:text-[14vw] md:text-[13vw] lg:text-[11vw] xl:text-[10vw] leading-[0.85] font-serif italic font-light text-[#2f8ecd] tracking-tighter z-10 pointer-events-auto">
                    TESTING
                  </h1>

                  <div className="mt-2 md:mt-0 md:ml-8 lg:ml-12 max-w-xs md:max-w-sm pointer-events-auto relative z-20">
                    <p className="text-gray-700 text-sm sm:text-lg leading-relaxed font-normal">
                      Get 12 Real Android Testers for 14 Days &
                      <span className="text-[#2f8ecd] font-bold">
                        {" "}
                        Publish Faster
                      </span>
                      . Pass Google’s closed testing mandate on real devices.
                    </p>

                    {/* CTA Buttons placed below subtitle text */}
                    <div className="mt-4 md:mt-6 flex flex-wrap items-center gap-3">
                      <button
                        onClick={openWhatsApp}
                        className="inline-flex items-center gap-3 px-6 py-3.5 md:px-8 md:py-4 bg-[#001F3F] text-white rounded-full text-xs sm:text-sm font-bold uppercase tracking-widest hover:bg-[#2f8ecd] transition-all duration-300 group shadow-lg hover:-translate-y-1 cursor-pointer"
                      >
                        <span>Start Testing</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <a
                        href="#pricing"
                        onClick={scrollToPricing}
                        className="inline-flex items-center gap-2 px-6 py-3.5 md:px-8 md:py-4 bg-gray-100 text-gray-800 rounded-full text-xs sm:text-sm font-bold uppercase tracking-widest hover:bg-gray-200 transition-all duration-300 cursor-pointer"
                      >
                        <span>Pricing</span>
                        <ArrowDown className="w-4 h-4 text-gray-500" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </header>
        </div>

        {/* Philosophy & Metrics Section (Comfortable Balanced Gap) */}
        <section className="pt-4 md:pt-8 pb-8 md:pb-16 px-4 md:px-12 max-w-[1600px] mx-auto border-b border-gray-100 relative">
          <div className="flex flex-col md:flex-row gap-6 md:gap-24">
            <div className="md:w-1/3 relative">
              <span className="text-xs font-bold tracking-[0.2em] text-[#2f8ecd] uppercase mb-4 block">
                The Guarantee
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
                Engineering <br /> Production{" "}
                <span className="font-serif italic text-gray-400">
                  Access.
                </span>
              </h2>
            </div>
            <div className="md:w-2/3">
              <p className="text-lg md:text-xl text-gray-500 font-light leading-relaxed mb-8">
                We eliminate the risk of Google Play rejection. Our verified network of real Android devices ensures continuous daily active sessions, comprehensive crash logs, and flawless compliance.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-gray-100">
                {[
                  { label: "Apps Published", value: "10,000+" },
                  { label: "Approval Rate", value: "99.9%" },
                  { label: "Assignment Time", value: "< 6 Hours" },
                  { label: "Testing Window", value: "14-16 Days" },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className="relative pl-4 border-l-2 border-[#2f8ecd]/20"
                  >
                    <span className="block text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                      {stat.value}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-gray-400">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PRICING SECTION (Modern Segmented Widescreen Card Layout) */}
        <section id="pricing" className="py-12 md:py-24 px-4 md:px-12 max-w-[1600px] mx-auto overflow-visible">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className="text-xs font-bold tracking-[0.2em] text-[#2f8ecd] uppercase mb-3 block">
              Transparent Plans
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 tracking-tight">
              Simple Closed Testing{" "}
              <span className="font-serif italic text-[#2f8ecd] font-light">
                Pricing
              </span>
            </h2>
            <p className="text-gray-500 text-sm md:text-base mt-3">
              One simple price per app. Pick the plan that fits. Most developers choose Pro.
            </p>
          </div>

          {/* Segmented Plan Switcher Pill */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-100 p-1.5 rounded-full border border-gray-200/80 flex items-center gap-1 relative shadow-inner">
              <button
                onClick={() => setSelectedPlan("starter")}
                className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  selectedPlan === "starter"
                    ? "bg-white text-gray-900 shadow-md"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                <span>Starter</span>
                <span className="text-[#2f8ecd]">₹999</span>
              </button>

              <button
                onClick={() => setSelectedPlan("pro")}
                className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 relative ${
                  selectedPlan === "pro"
                    ? "bg-white text-gray-900 shadow-md"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                <span>Pro</span>
                <span className="text-emerald-600">₹1,699</span>
                <span className="bg-black text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full ml-1 tracking-wider">
                  Popular
                </span>
              </button>
            </div>
          </div>

          {/* Main Premium Widescreen Subscription Card */}
          <div className="max-w-4xl mx-auto overflow-visible relative pt-2">
            <AnimatePresence mode="wait">
              {selectedPlan === "starter" ? (
                <motion.div
                  key="starter-plan"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white border-2 border-gray-200/80 rounded-[2.5rem] p-6 sm:p-10 shadow-xl relative flex flex-col lg:flex-row gap-8 lg:gap-12 justify-between items-stretch"
                >
                  {/* Floating Badge Sitting Cleanly on Top Border */}
                  <div className="absolute -top-3.5 right-6 sm:right-10 bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A] text-[10px] font-black uppercase px-3.5 py-1 rounded-full tracking-widest shadow-xs z-20">
                    Lowest Price
                  </div>

                  {/* Left Column: Icon + Pricing + CTA */}
                  <div className="lg:w-5/12 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2f8ecd]">
                          <Smartphone className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900">Starter</h3>
                          <span className="text-xs font-semibold text-gray-400">Standard Package</span>
                        </div>
                      </div>

                      <div className="my-4">
                        <div className="flex items-baseline gap-1">
                          <span className="text-5xl font-black text-gray-900">₹999</span>
                          <span className="text-gray-400 font-medium text-sm">/app</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-2 leading-relaxed font-light">
                          Everything you need to pass Google Play's 14-day testing requirement, at our most affordable price.
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={openWhatsApp}
                      className="w-full py-4 rounded-full bg-[#001F3F] hover:bg-[#2f8ecd] text-white font-bold text-xs uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg mt-6"
                    >
                      <span>Get Started Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Right Column: Feature Specs Grid */}
                  <div className="lg:w-7/12 border-t lg:border-t-0 lg:border-l border-gray-100 pt-6 lg:pt-0 lg:pl-10 grid grid-cols-1 sm:grid-cols-2 gap-5 text-left font-sans">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-gray-900 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-gray-900">15 Android testers</h4>
                        <p className="text-[11px] text-gray-500 mt-0.5">Verified testers from our global network</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-gray-900 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-gray-900">Testers in 6 hours</h4>
                        <p className="text-[11px] text-gray-500 mt-0.5">Fast access vs 24 to 48h elsewhere</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-gray-900 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-gray-900">14-day testing period</h4>
                        <p className="text-[11px] text-gray-500 mt-0.5">Meets Google Play requirements</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-gray-900 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-gray-900">Production access guarantee</h4>
                        <p className="text-[11px] text-gray-500 mt-0.5">Approved for production access, or free re-test</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 sm:col-span-2">
                      <CheckCircle2 className="w-5 h-5 text-gray-900 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-xs font-bold text-gray-900">Comprehensive reports</h4>
                          <button
                            onClick={() => setShowSampleModal(true)}
                            className="text-[#2f8ecd] hover:underline text-[11px] font-bold cursor-pointer"
                          >
                            View sample
                          </button>
                        </div>
                        <p className="text-[11px] text-gray-500 mt-0.5">Testers feedback report and Production Access form answers</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 sm:col-span-2">
                      <CheckCircle2 className="w-5 h-5 text-gray-900 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-gray-900">Standard support</h4>
                        <p className="text-[11px] text-gray-500 mt-0.5">24/7 email and chat support from our team</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="pro-plan"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gradient-to-b from-blue-50/70 via-white to-emerald-50/50 border-2 border-[#2f8ecd] rounded-[2.5rem] p-6 sm:p-10 shadow-2xl relative flex flex-col lg:flex-row gap-8 lg:gap-12 justify-between items-stretch"
                >
                  {/* Floating Badge Sitting Cleanly on Top Border */}
                  <div className="absolute -top-3.5 right-6 sm:right-10 bg-[#2f8ecd] text-white text-[10px] font-black uppercase px-3.5 py-1 rounded-full tracking-widest shadow-md z-20">
                    Most Popular Choice
                  </div>

                  {/* Left Column: Icon + Pricing + CTA */}
                  <div className="lg:w-5/12 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                          <Sparkles className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <span>Pro</span>
                          </h3>
                          <span className="text-xs font-semibold text-emerald-600">Recommended for High Priority</span>
                        </div>
                      </div>

                      <div className="my-4">
                        <div className="flex items-baseline gap-1">
                          <span className="text-5xl font-black text-gray-900">₹1,699</span>
                          <span className="text-gray-400 font-medium text-sm">/app</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-2 leading-relaxed font-light">
                          Expanded 25-tester coverage, priority WhatsApp line, complete ASO audit & 1-on-1 review.
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={openWhatsApp}
                      className="w-full py-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 mt-6"
                    >
                      <span>Choose Pro Plan</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Right Column: Feature Specs Grid */}
                  <div className="lg:w-7/12 border-t lg:border-t-0 lg:border-l border-gray-200/80 pt-6 lg:pt-0 lg:pl-10 grid grid-cols-1 sm:grid-cols-2 gap-5 text-left font-sans">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-gray-900">25 Android testers</h4>
                        <p className="text-[11px] text-gray-500 mt-0.5">Maximum device coverage for complex apps</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-gray-900">Priority WhatsApp Line</h4>
                        <p className="text-[11px] text-gray-500 mt-0.5">Instant 1-on-1 account manager support</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-gray-900">Complete ASO Audit</h4>
                        <p className="text-[11px] text-gray-500 mt-0.5">Store listing optimization suggestions</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-gray-900">100% Approval Guarantee</h4>
                        <p className="text-[11px] text-gray-500 mt-0.5">Production access granted or money back</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 sm:col-span-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-xs font-bold text-gray-900">Comprehensive reports + ASO</h4>
                          <button
                            onClick={() => setShowSampleModal(true)}
                            className="text-[#2f8ecd] hover:underline text-[11px] font-bold cursor-pointer"
                          >
                            View sample
                          </button>
                        </div>
                        <p className="text-[11px] text-gray-500 mt-0.5">Feedback logs, questionnaire responses, & store keywords</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 sm:col-span-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-gray-900">Priority Form Review</h4>
                        <p className="text-[11px] text-gray-500 mt-0.5">1-on-1 expert review before submitting to Google</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* DEVELOPER REVIEWS */}
        <section className="py-12 md:py-24 px-4 md:px-12 max-w-[1600px] mx-auto bg-gray-50/80 rounded-[2.5rem] my-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-[0.2em] text-[#2f8ecd] uppercase mb-3 block">
              Developer Reviews
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 tracking-tight">
              Loved by Developers{" "}
              <span className="font-serif italic text-[#2f8ecd] font-light">
                Worldwide
              </span>
            </h2>
            <p className="text-gray-500 text-base sm:text-lg mt-3">
              See how Android creators passed Google Play closed testing with Karma Dude.
            </p>
          </div>

          {/* Animated marquee styles */}
          <style>{`
            @keyframes marquee-ltr {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            @keyframes marquee-rtl {
              0% { transform: translateX(-50%); }
              100% { transform: translateX(0); }
            }
            .marquee-track {
              display: flex;
              width: max-content;
              animation-timing-function: linear;
              animation-iteration-count: infinite;
            }
            .marquee-ltr { animation-name: marquee-ltr; }
            .marquee-rtl { animation-name: marquee-rtl; }
            .marquee-row:hover .marquee-track { animation-play-state: paused; }
          `}</style>

          {/* Row 1 — scrolls left to right */}
          <div className="marquee-row relative overflow-hidden mb-5 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
            <div
              className="marquee-track marquee-ltr gap-5"
              style={{ animationDuration: "40s" }}
            >
              {[...testimonials.slice(0, 4), ...testimonials.slice(0, 4)].map((t, idx) => (
                <ReviewCard key={`r1-${idx}`} t={t} />
              ))}
            </div>
          </div>

          {/* Row 2 — scrolls right to left */}
          <div className="marquee-row relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
            <div
              className="marquee-track marquee-rtl gap-5"
              style={{ animationDuration: "45s" }}
            >
              {[...testimonials.slice(4, 8), ...testimonials.slice(4, 8)].map((t, idx) => (
                <ReviewCard key={`r2-${idx}`} t={t} />
              ))}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US (Bento Mixed Shape Grid) */}
        <section className="py-12 md:py-24 px-4 md:px-12 max-w-[1600px] mx-auto">
          <div className="max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-[0.2em] text-[#2f8ecd] uppercase mb-3 block">
              Why Choose Us
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
              Built for Faster{" "}
              <span className="font-serif italic text-[#2f8ecd] font-light">
                Production Approval.
              </span>
            </h2>
          </div>

          {/* Bento Grid: Row 1 — wide rectangle + small square */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-5 mb-5">
            {/* Wide Rectangle Card — col-span-3 */}
            <div className="group md:col-span-3 p-8 md:p-10 rounded-3xl bg-[#001F3F] text-white border border-[#001F3F] shadow-xl hover:bg-[#2f8ecd] hover:border-[#2f8ecd] hover:shadow-2xl transition-all duration-500 flex flex-col justify-between min-h-[200px] cursor-default">
              <div className="w-14 h-14 rounded-2xl bg-white/10 group-hover:bg-white/20 flex items-center justify-center text-white mb-6 transition-all duration-500">
                <Award className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">10,000+ Apps Published</h3>
                <p className="text-blue-200 group-hover:text-white/90 text-sm leading-relaxed max-w-md transition-colors duration-500">Proven track record with over ten thousand Android apps approved for public release on Google Play.</p>
              </div>
            </div>

            {/* Square Card — col-span-2 */}
            <div className="group md:col-span-2 p-8 rounded-3xl bg-white border border-gray-200/80 shadow-xs hover:bg-gray-900 hover:border-gray-900 hover:shadow-2xl transition-all duration-500 flex flex-col justify-between min-h-[200px] cursor-default">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 group-hover:bg-white/10 flex items-center justify-center text-[#2f8ecd] group-hover:text-white transition-all duration-500">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-white mb-1 transition-colors duration-500">Production Access Guarantee</h3>
                <p className="text-gray-500 group-hover:text-gray-300 text-sm leading-relaxed transition-colors duration-500">100% approval guarantee. If Google rejects your test, we re-test for free until approved.</p>
              </div>
            </div>
          </div>

          {/* Bento Grid: Row 2 — small square + wide rectangle */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-5 mb-5">
            {/* Square Card — col-span-2 */}
            <div className="group md:col-span-2 p-8 rounded-3xl bg-blue-50 border border-blue-100 shadow-xs hover:bg-[#2f8ecd] hover:border-[#2f8ecd] hover:shadow-2xl transition-all duration-500 flex flex-col justify-between min-h-[200px] cursor-default">
              <div className="w-14 h-14 rounded-2xl bg-white group-hover:bg-white/20 flex items-center justify-center text-[#2f8ecd] group-hover:text-white transition-all duration-500">
                <Users className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-white mb-1 transition-colors duration-500">Up to 25 Professional Testers</h3>
                <p className="text-gray-600 group-hover:text-white/90 text-sm leading-relaxed transition-colors duration-500">Real verified Android smartphone users across different screen sizes and OS versions.</p>
              </div>
            </div>

            {/* Wide Rectangle Card — col-span-3 */}
            <div className="group md:col-span-3 p-8 md:p-10 rounded-3xl bg-white border border-gray-200/80 shadow-xs hover:bg-gray-900 hover:border-gray-900 hover:shadow-2xl transition-all duration-500 flex flex-col justify-between min-h-[200px] cursor-default">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 group-hover:bg-white/10 flex items-center justify-center text-[#2f8ecd] group-hover:text-white transition-all duration-500">
                <Clock className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-white mb-2 transition-colors duration-500">16-Day Testing Window</h3>
                <p className="text-gray-500 group-hover:text-gray-300 text-sm leading-relaxed max-w-md transition-colors duration-500">Continuous active testing with buffer days to prevent any missing log gaps on Google Play Console. We run 14–16 days for guaranteed compliance.</p>
              </div>
            </div>
          </div>

          {/* Bento Grid: Row 3 — two equal rectangles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Rectangle Card */}
            <div className="group p-8 md:p-10 rounded-3xl bg-gray-50 border border-gray-200/80 shadow-xs hover:bg-[#2f8ecd] hover:border-[#2f8ecd] hover:shadow-2xl transition-all duration-500 flex flex-col justify-between min-h-[180px] cursor-default">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 group-hover:bg-white/20 flex items-center justify-center text-[#2f8ecd] group-hover:text-white transition-all duration-500">
                <FileText className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-white mb-1 transition-colors duration-500">Comprehensive Reports</h3>
                <p className="text-gray-500 group-hover:text-white/90 text-sm leading-relaxed transition-colors duration-500">Receive actionable crash reports, device analytics, and tailored answers for Google's production access questionnaire.</p>
              </div>
            </div>

            {/* Rectangle Card */}
            <div className="group p-8 md:p-10 rounded-3xl bg-white border border-gray-200/80 shadow-xs hover:bg-gray-900 hover:border-gray-900 hover:shadow-2xl transition-all duration-500 flex flex-col justify-between min-h-[180px] cursor-default">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 group-hover:bg-white/10 flex items-center justify-center text-emerald-600 group-hover:text-emerald-400 transition-all duration-500">
                <Headphones className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-white mb-1 transition-colors duration-500">24×7 Support</h3>
                <p className="text-gray-500 group-hover:text-gray-300 text-sm leading-relaxed transition-colors duration-500">Dedicated WhatsApp account manager for real-time guidance throughout your entire testing and release journey.</p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS (Sticky Left Title + Alternating Center Timeline) */}
        <section className="py-16 md:py-28 px-4 md:px-12 max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-start">

            {/* LEFT — Sticky Title Column */}
            <div className="md:w-5/12 md:sticky md:top-32 h-fit">
              <span className="text-xs font-bold tracking-[0.2em] text-[#2f8ecd] uppercase mb-4 block">
                How It Works
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight leading-tight mb-5">
                Get Production Access in{" "}
                <br />
                <span className="font-serif italic text-[#2f8ecd] font-light">4 Simple Steps</span>
              </h2>
              <p className="text-gray-400 text-base leading-relaxed mb-8">
                From payment to Production Access in just 16 days. Here's exactly what happens.
              </p>
              <div className="h-1 w-12 bg-[#2f8ecd] rounded-full" />
            </div>

            {/* RIGHT — Alternating Center Timeline */}
            <div className="md:w-7/12 relative">
              {/* Center vertical line */}
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#2f8ecd]/10 via-[#2f8ecd]/50 to-[#2f8ecd]/10 hidden md:block" />

              {[
                {
                  step: "01",
                  title: "Make Payment",
                  desc: "Select Starter or Pro and complete payment via WhatsApp. Instant activation with 100% satisfaction guarantee.",
                  color: "#2f8ecd",
                  side: "left",
                },
                {
                  step: "02",
                  title: "Submit App Details",
                  desc: "Share your Google Play Console opt-in link or email list. We handle all tester enrollment and management.",
                  color: "#7c3aed",
                  side: "right",
                },
                {
                  step: "03",
                  title: "Testers Start in 6h",
                  desc: "15–25 verified testers download and open your app daily. Worldwide coverage with real-time progress tracking.",
                  color: "#f59e0b",
                  side: "left",
                },
                {
                  step: "04",
                  title: "Apply for Production",
                  desc: "Use our expertly crafted answers to request Production Access. We guide you through every step of Google's review.",
                  color: "#10b981",
                  side: "right",
                },
              ].map((s, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: s.side === "left" ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative flex items-center mb-10 md:mb-12 last:mb-0 ${
                    s.side === "right" ? "md:flex-row-reverse" : "md:flex-row"
                  } flex-col gap-4 md:gap-0`}
                >
                  {/* Card — takes 44% width */}
                  <div className={`w-full md:w-[44%] ${s.side === "left" ? "md:pr-8" : "md:pl-8"}`}>
                    <div
                      className="rounded-2xl p-5 md:p-6 border hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
                      style={{
                        borderLeft: s.side === "right" ? `3px solid ${s.color}` : `1px solid ${s.color}20`,
                        borderRight: s.side === "left" ? `3px solid ${s.color}` : `1px solid ${s.color}20`,
                        borderTop: `1px solid ${s.color}20`,
                        borderBottom: `1px solid ${s.color}20`,
                        backgroundColor: `${s.color}06`,
                      }}
                    >
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: `linear-gradient(135deg, ${s.color}15 0%, transparent 70%)` }}
                      />
                      <h3 className="text-base font-bold text-gray-900 mb-1.5 relative z-10">{s.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed relative z-10">{s.desc}</p>
                    </div>
                  </div>

                  {/* Center step bubble */}
                  <div className="md:absolute md:left-1/2 md:-translate-x-1/2 flex-shrink-0 z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: idx * 0.08 + 0.15, type: "spring", stiffness: 220 }}
                      className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-black text-white shadow-lg"
                      style={{ backgroundColor: s.color, boxShadow: `0 0 0 4px white, 0 0 0 6px ${s.color}30` }}
                    >
                      {s.step}
                    </motion.div>
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="hidden md:block md:w-[44%]" />
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* FAQ ACCORDION */}
        <section className="py-12 md:py-24 px-4 md:px-12 max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-[0.2em] text-[#2f8ecd] uppercase mb-3 block">
              Got Questions?
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 tracking-tight">
              Frequently Asked{" "}
              <span className="font-serif italic text-[#2f8ecd] font-light">
                Questions
              </span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl bg-white border overflow-hidden transition-all duration-300 ${
                    isOpen
                      ? "border-[#2f8ecd]/40 shadow-md"
                      : "border-gray-200 shadow-xs hover:border-gray-300"
                  }`}
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex justify-between items-center gap-4 text-base sm:text-lg font-bold text-gray-900 hover:text-[#2f8ecd] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#2f8ecd]" : "text-gray-400"
                        }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 text-gray-600 text-sm sm:text-base leading-relaxed border-t border-gray-100 pt-4">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* COMPLETE DEVELOPER GUIDE (12 CHAPTERS) */}
        <section className="py-12 md:py-24 px-4 md:px-12 max-w-[1600px] mx-auto bg-gray-50 rounded-[2.5rem] border border-gray-200/80">
          <div className="max-w-7xl mx-auto">
            {/* Section Header — Editorial style with watermark */}
            <div className="relative mb-10 md:mb-14 overflow-hidden">
              {/* Faint watermark numeral — small on mobile, large on desktop */}
              <span
                aria-hidden
                className="absolute -top-10 right-2 text-[5rem] sm:text-[10rem] md:text-[18rem] font-black text-[#2f8ecd]/[0.07] leading-none select-none pointer-events-none"
              >
                12
              </span>

              <div className="relative">
                {/* Eyebrow with accent dot */}
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="w-2 h-2 rounded-full bg-[#2f8ecd]" />
                  <span className="text-xs font-bold tracking-[0.2em] text-[#2f8ecd] uppercase">
                    Comprehensive Knowledge Base
                  </span>
                </div>

                <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-gray-900 tracking-tight leading-[1.05] max-w-3xl">
                  Complete Developer Guide{" "}
                  <span className="font-serif italic text-[#2f8ecd] font-light">
                    (12 Chapters)
                  </span>
                </h2>

                <p className="text-gray-500 text-base sm:text-lg mt-4 max-w-xl leading-relaxed">
                  Everything you need to know about Google Play Closed Testing requirements and production access.
                </p>
              </div>
            </div>

            {/* Progress Bar — 12 clickable segments */}
            <div className="mb-8 md:mb-10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold tracking-[0.15em] text-gray-500 uppercase">
                  Your Progress
                </span>
                <span className="text-xs font-bold text-[#2f8ecd]">
                  Chapter {activeChapter} of 12 · {Math.round((activeChapter / 12) * 100)}%
                </span>
              </div>
              <div className="flex gap-1.5 sm:gap-2">
                {chapters.map((ch) => {
                  const isActive = activeChapter === ch.id;
                  const isCompleted = activeChapter > ch.id;
                  return (
                    <button
                      key={ch.id}
                      onClick={() => setActiveChapter(ch.id)}
                      title={ch.subtitle}
                      className={`group relative flex-1 h-2.5 sm:h-3 rounded-full overflow-hidden transition-all cursor-pointer ${
                        isActive
                          ? "bg-[#2f8ecd] shadow-[0_0_12px_rgba(47,142,205,0.4)]"
                          : isCompleted
                          ? "bg-[#2f8ecd]/40"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                    >
                      <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="hidden lg:block absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-gray-900 text-white text-[10px] font-bold whitespace-nowrap z-20 pointer-events-none">
                          Ch. {ch.id}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3-Column Layout: Sidebar | Content | Key Facts */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">
              {/* LEFT SIDEBAR — Chapter Index (Sticky vertical on desktop, horizontal pills on mobile) */}
              <aside className="lg:col-span-3">
                {/* Mobile horizontal pill scroller (sits outside the desktop card so it gets full width) */}
                <div className="lg:hidden -mx-4 mb-5">
                  <div className="flex items-center gap-2 px-4 mb-2">
                    <BookOpen className="w-4 h-4 text-[#2f8ecd]" />
                    <span className="text-xs font-bold tracking-[0.15em] text-gray-500 uppercase">
                      Chapters
                    </span>
                  </div>
                  <DragScrollRow className="px-4 pb-2 no-scrollbar">
                    {/* Left spacer so first snap aligns cleanly to the start */}
                    <div className="shrink-0 w-0" aria-hidden />
                    {chapters.map((ch) => {
                      const isActive = activeChapter === ch.id;
                      return (
                        <button
                          key={ch.id}
                          onClick={() => setActiveChapter(ch.id)}
                          style={{ WebkitTapHighlightColor: "transparent" }}
                          className={`snap-start shrink-0 flex items-center gap-2 px-3 py-2 rounded-full border transition-all cursor-pointer max-w-[260px] ${
                            isActive
                              ? "bg-blue-50 border-[#2f8ecd] text-[#2f8ecd] shadow-sm"
                              : "bg-white border-gray-200 hover:bg-gray-50 text-gray-700"
                          }`}
                        >
                          <span
                            className={`shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-black ${
                              isActive
                                ? "bg-[#2f8ecd] text-white"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {String(ch.id).padStart(2, "0")}
                          </span>
                          <span className="text-xs font-bold truncate">
                            {ch.subtitle}
                          </span>
                        </button>
                      );
                    })}
                    <div className="shrink-0 w-4" aria-hidden />
                  </DragScrollRow>
                </div>

                {/* Desktop vertical sticky list (unchanged) */}
                <div className="hidden lg:block lg:sticky lg:top-28 bg-white border border-gray-200/80 rounded-2xl p-3 shadow-sm">
                  <div className="flex px-2 pt-2 pb-3 mb-2 border-b border-gray-100 items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#2f8ecd]" />
                    <span className="text-xs font-bold tracking-[0.15em] text-gray-500 uppercase">
                      Chapters
                    </span>
                  </div>
                  <div className="space-y-1 max-h-[420px] overflow-y-auto no-scrollbar pr-1">
                    {chapters.map((ch) => {
                      const isActive = activeChapter === ch.id;
                      return (
                        <button
                          key={ch.id}
                          onClick={() => setActiveChapter(ch.id)}
                          className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-left transition-all cursor-pointer ${
                            isActive
                              ? "bg-blue-50 border-l-4 border-[#2f8ecd]"
                              : "hover:bg-gray-50 border-l-4 border-transparent"
                          }`}
                        >
                          <span
                            className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black transition-colors ${
                              isActive
                                ? "bg-[#2f8ecd] text-white"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {String(ch.id).padStart(2, "0")}
                          </span>
                          <span
                            className={`text-xs sm:text-sm font-bold leading-snug line-clamp-2 ${
                              isActive ? "text-[#2f8ecd]" : "text-gray-700"
                            }`}
                          >
                            {ch.subtitle}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </aside>

              {/* MAIN CONTENT — Active Chapter */}
              <main className="lg:col-span-6">
                <motion.div
                  key={currentChapterData.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="relative p-6 sm:p-8 lg:p-10 rounded-3xl bg-white border border-gray-200/80 shadow-sm overflow-hidden"
                >
                  {/* Decorative large chapter number watermark */}
                  <span
                    aria-hidden
                    className="absolute -top-4 -right-2 sm:top-2 sm:right-4 text-[7rem] sm:text-[9rem] lg:text-[10rem] font-black text-[#2f8ecd]/[0.06] leading-none select-none pointer-events-none"
                  >
                    {String(currentChapterData.id).padStart(2, "0")}
                  </span>

                  {/* Header row */}
                  <div className="relative flex flex-col sm:flex-row justify-between items-start gap-4 mb-6 pb-6 border-b border-gray-100">
                    <div>
                      <span className="text-[#2f8ecd] font-extrabold text-xs uppercase tracking-[0.2em]">
                        Chapter {currentChapterData.id} of 12
                      </span>
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mt-1.5 leading-tight">
                        {currentChapterData.subtitle}
                      </h3>
                    </div>
                    <button
                      onClick={openWhatsApp}
                      className="px-4 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shrink-0 shadow-md shadow-emerald-600/20"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span className="hidden sm:inline">Ask Expert on WhatsApp</span>
                      <span className="sm:hidden">Ask Expert</span>
                    </button>
                  </div>

                  {/* Intro paragraph */}
                  <div className="relative mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <CircleDot className="w-4 h-4 text-[#2f8ecd]" />
                      <span className="text-xs font-bold uppercase tracking-[0.15em] text-gray-500">
                        Overview
                      </span>
                    </div>
                    <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                      {currentChapterData.intro}
                    </p>
                  </div>

                  {/* Important Note */}
                  <div className="relative p-5 sm:p-6 rounded-2xl bg-amber-50/60 border border-amber-200/80 mb-6">
                    <h4 className="text-xs font-bold text-amber-800 uppercase tracking-[0.15em] mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      <span>Important Note for Developers</span>
                    </h4>
                    <p className="text-amber-900/85 text-sm leading-relaxed">
                      {currentChapterData.details}
                    </p>
                  </div>

                  {/* Prev / Next Navigation */}
                  <div className="relative pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
                    <button
                      onClick={() => activeChapter > 1 && setActiveChapter(activeChapter - 1)}
                      disabled={activeChapter === 1}
                      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                        activeChapter === 1
                          ? "bg-gray-50 text-gray-300 cursor-not-allowed"
                          : "bg-white border border-gray-200 text-gray-700 hover:border-[#2f8ecd] hover:text-[#2f8ecd] cursor-pointer"
                      }`}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Previous</span>
                    </button>

                    <span className="text-xs text-gray-400 font-medium order-first sm:order-none w-full sm:w-auto text-center">
                      {currentChapterData.id} / 12
                    </span>

                    <button
                      onClick={() => activeChapter < 12 && setActiveChapter(activeChapter + 1)}
                      disabled={activeChapter === 12}
                      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                        activeChapter === 12
                          ? "bg-gray-50 text-gray-300 cursor-not-allowed"
                          : "bg-[#001F3F] hover:bg-[#2f8ecd] text-white cursor-pointer shadow-md"
                      }`}
                    >
                      <span>Next Chapter</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              </main>

              {/* RIGHT SIDEBAR — Key Facts (Sticky) */}
              <aside className="lg:col-span-3">
                <div className="lg:sticky lg:top-28 bg-gradient-to-b from-blue-50/60 to-white border border-blue-100 rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-blue-100">
                    <div className="w-8 h-8 rounded-lg bg-[#2f8ecd] text-white flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 uppercase tracking-[0.15em]">
                        Key Facts
                      </h4>
                      <p className="text-[10px] text-gray-500 font-medium">
                        Chapter {currentChapterData.id}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-2.5">
                    {currentChapterData.keyFacts.map((fact, idx) => (
                      <li
                        key={idx}
                        className="group p-3.5 rounded-xl bg-white border border-blue-100 hover:border-[#2f8ecd]/40 hover:shadow-sm transition-all"
                      >
                        <div className="flex items-start gap-2.5">
                          <span className="shrink-0 w-5 h-5 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center mt-0.5">
                            <Check className="w-3 h-3 text-[#2f8ecd]" strokeWidth={3} />
                          </span>
                          <span className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                            {fact}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>

                  {/* Sidebar CTA */}
                  <button
                    onClick={openWhatsApp}
                    className="w-full mt-5 px-4 py-3 rounded-xl bg-[#2f8ecd] hover:bg-[#001F3F] text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Discuss with Expert</span>
                  </button>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* MINIMAL CTA */}
        <section className="py-16 md:py-32 px-4 md:px-12 max-w-[1600px] mx-auto text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-bold text-gray-900 mb-4 md:mb-8 tracking-tighter leading-[0.9]">
              READY TO <br className="hidden md:block" />
              <span className="text-[#2f8ecd]">PUBLISH?</span>
            </h2>

            <p className="text-lg md:text-2xl text-gray-500 mb-6 md:mb-12 max-w-3xl mx-auto font-light leading-relaxed">
              Get 15 to 25 verified Android device testers assigned within 6 hours and pass Google Play Production Access seamlessly.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={openWhatsApp}
                className="group relative inline-flex items-center gap-4 px-10 py-5 bg-[#001F3F] text-white rounded-full font-bold uppercase tracking-widest hover:bg-[#2f8ecd] transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-1 cursor-pointer text-xs sm:text-sm"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={openWhatsApp}
                className="group relative inline-flex items-center gap-4 px-10 py-5 bg-emerald-600 text-white rounded-full font-bold uppercase tracking-widest hover:bg-emerald-700 transition-all duration-500 shadow-xl hover:-translate-y-1 cursor-pointer text-xs sm:text-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Talk to Expert</span>
              </button>
            </div>
          </div>
        </section>

        {/* COMPREHENSIVE REPORTS SAMPLE MODAL */}
        <AnimatePresence>
          {showSampleModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowSampleModal(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.96, opacity: 0, y: 8 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative border border-gray-100 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setShowSampleModal(false)}
                  className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Header */}
                <div className="mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                    Comprehensive reports
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Real reports from a live test - this is what you receive with every plan.
                  </p>
                </div>

                {/* Report Options Cards */}
                <div className="space-y-4">
                  {/* Card 1: Testers Feedback Report */}
                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80 hover:border-blue-400 transition-all flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2f8ecd] shrink-0 mt-0.5">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-gray-900">
                        Testers feedback report
                      </h4>
                      <p className="text-xs text-gray-500 mt-0.5 mb-3 leading-relaxed">
                        Real tester feedback and bug reports from a live 14-day test
                      </p>
                      <button
                        onClick={() => setActivePdfPreview("feedback")}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2f8ecd] hover:text-blue-700 cursor-pointer"
                      >
                        <span>Open sample PDF</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Card 2: Production Access Form Answers */}
                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80 hover:border-blue-400 transition-all flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                      <FileCheck className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-gray-900">
                        Production Access form answers
                      </h4>
                      <p className="text-xs text-gray-500 mt-0.5 mb-3 leading-relaxed">
                        Pre-filled answers for Google's production access questions, ready to submit
                      </p>
                      <button
                        onClick={() => setActivePdfPreview("answers")}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2f8ecd] hover:text-blue-700 cursor-pointer"
                      >
                        <span>Open sample PDF</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Footer Note */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    Included with both Starter and Pro. Pro also adds a detailed ASO report on your store listing.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* PDF DOCUMENT PREVIEW MODAL */}
        <AnimatePresence>
          {activePdfPreview && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-6"
              onClick={() => setActivePdfPreview(null)}
            >
              <motion.div
                initial={{ scale: 0.96, opacity: 0, y: 12 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.97, opacity: 0, y: 8 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white rounded-2xl w-full max-w-3xl max-h-[85vh] shadow-2xl flex flex-col overflow-hidden relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* PDF Header Bar */}
                <div className="p-4 bg-gray-900 text-white flex justify-between items-center border-b border-gray-800">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-blue-400" />
                    <div>
                      <h4 className="text-sm font-bold">
                        {activePdfPreview === "feedback"
                          ? "Sample_Testers_Feedback_Report.pdf"
                          : "Sample_Production_Access_Answers.pdf"}
                      </h4>
                      <p className="text-[10px] text-gray-400">Karma Dude Verified Document • 2 Pages</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => alert("Downloading sample PDF...")}
                      className="px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-xs font-semibold text-gray-200 flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                    <button
                      onClick={() => setActivePdfPreview(null)}
                      className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white flex items-center justify-center transition-all cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* PDF Document Page View */}
                <div className="p-6 sm:p-10 overflow-y-auto bg-gray-100 space-y-6 text-left font-sans text-gray-900 text-xs sm:text-sm leading-relaxed no-scrollbar">
                  {activePdfPreview === "feedback" ? (
                    <div className="bg-white p-8 rounded-xl shadow-md space-y-6 border border-gray-200">
                      {/* Document Header */}
                      <div className="flex justify-between items-start border-b border-gray-200 pb-6">
                        <div>
                          <h1 className="text-xl font-bold text-gray-900">CLOSED TESTING FEEDBACK REPORT</h1>
                          <p className="text-gray-500 text-xs mt-1">App: TaskPulse Pro (com.taskpulse.app)</p>
                          <p className="text-gray-500 text-xs">Testing Track: 14-Day Closed Alpha</p>
                        </div>
                        <div className="text-right">
                          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase">
                            STATUS: PASSED (16/16 DAYS)
                          </span>
                          <p className="text-gray-400 text-[10px] mt-2">Date Generated: Oct 24, 2024</p>
                        </div>
                      </div>

                      {/* Device Stats Grid */}
                      <div>
                        <h3 className="font-bold text-gray-800 text-sm mb-3">1. Tester & Device Allocation</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                          <div className="p-3 bg-blue-50 rounded-lg">
                            <span className="block font-bold text-blue-900 text-base">15</span>
                            <span className="text-[10px] text-blue-600 uppercase">Active Devices</span>
                          </div>
                          <div className="p-3 bg-emerald-50 rounded-lg">
                            <span className="block font-bold text-emerald-900 text-base">100%</span>
                            <span className="text-[10px] text-emerald-600 uppercase">Opt-in Retention</span>
                          </div>
                          <div className="p-3 bg-amber-50 rounded-lg">
                            <span className="block font-bold text-amber-900 text-base">0.00%</span>
                            <span className="text-[10px] text-amber-600 uppercase">ANR / Crash Rate</span>
                          </div>
                          <div className="p-3 bg-purple-50 rounded-lg">
                            <span className="block font-bold text-purple-900 text-base">14 Days</span>
                            <span className="text-[10px] text-purple-600 uppercase">Continuous Track</span>
                          </div>
                        </div>
                      </div>

                      {/* Device Log Table */}
                      <div>
                        <h3 className="font-bold text-gray-800 text-sm mb-3">2. Device Model Verification Logs</h3>
                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                          <table className="w-full text-left text-xs">
                            <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 uppercase">
                              <tr>
                                <th className="p-2.5">Device</th>
                                <th className="p-2.5">Android OS</th>
                                <th className="p-2.5">Sessions</th>
                                <th className="p-2.5">Status</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                              <tr>
                                <td className="p-2.5 font-medium">Samsung Galaxy S23 Ultra</td>
                                <td className="p-2.5 text-gray-500">Android 14</td>
                                <td className="p-2.5 text-gray-500">28 sessions</td>
                                <td className="p-2.5 text-emerald-600 font-bold">Verified</td>
                              </tr>
                              <tr>
                                <td className="p-2.5 font-medium">Google Pixel 8 Pro</td>
                                <td className="p-2.5 text-gray-500">Android 15</td>
                                <td className="p-2.5 text-gray-500">32 sessions</td>
                                <td className="p-2.5 text-emerald-600 font-bold">Verified</td>
                              </tr>
                              <tr>
                                <td className="p-2.5 font-medium">OnePlus 11 5G</td>
                                <td className="p-2.5 text-gray-500">Android 13</td>
                                <td className="p-2.5 text-gray-500">24 sessions</td>
                                <td className="p-2.5 text-emerald-600 font-bold">Verified</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Summary Note */}
                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-gray-600 text-xs">
                        <p className="font-bold text-gray-800 mb-1">Conclusion:</p>
                        This application exhibits zero critical crashes across all tested hardware configurations. Verified ready for Google Play Production Access submission.
                      </div>
                    </div>
                  ) : (
                    <div className="bg-[#121212] text-white p-8 rounded-xl shadow-md space-y-6 border border-gray-800">
                      {/* Document Header */}
                      <div className="border-b border-gray-800 pb-6">
                        <h1 className="text-xl font-bold text-white">PRODUCTION ACCESS FORM ANSWERS</h1>
                        <p className="text-gray-400 text-xs mt-1">Pre-filled Answers for Google Play Console Application</p>
                      </div>

                      {/* QA Items */}
                      <div className="space-y-5">
                        <div className="p-4 bg-gray-900 rounded-xl border border-gray-800">
                          <h4 className="font-bold text-blue-400 text-xs uppercase mb-1">
                            Question 1: Describe your testing process and how you recruited testers.
                          </h4>
                          <p className="text-gray-300 text-xs leading-relaxed">
                            "We conducted a 14-day closed testing track with 15 verified Android testers using diverse physical devices (Samsung, Google Pixel, OnePlus across Android 11 to 14). Testers opted-in via Google Play opt-in link and tested core workflows daily, ensuring real-world performance validation."
                          </p>
                        </div>

                        <div className="p-4 bg-gray-900 rounded-xl border border-gray-800">
                          <h4 className="font-bold text-blue-400 text-xs uppercase mb-1">
                            Question 2: Summarize the feedback you received from your closed testing track.
                          </h4>
                          <p className="text-gray-300 text-xs leading-relaxed">
                            "Testers provided positive feedback regarding UI responsiveness and navigation. Minor issues identified included initial font scaling on smaller screens, which was resolved in update v1.0.4. Overall crash-free rate remained at 100% across all 14 days."
                          </p>
                        </div>

                        <div className="p-4 bg-gray-900 rounded-xl border border-gray-800">
                          <h4 className="font-bold text-blue-400 text-xs uppercase mb-1">
                            Question 3: What changes did you make to your app based on tester feedback?
                          </h4>
                          <p className="text-gray-300 text-xs leading-relaxed">
                            "We optimized memory usage during initial asset loading, refined layout margins for compact displays, and updated local storage sync intervals to prevent potential battery drain during idle states."
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Testers;
