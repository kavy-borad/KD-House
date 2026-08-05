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

          {/* Inner Screen Frame */}
          <div className="w-full h-full p-2.5 sm:p-4 rounded-xl md:rounded-2xl relative overflow-hidden">
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
  countryCode: string;
  rating: number;
  review: string;
  appName: string;
};

/* Horizontal click-and-drag scroller for the chapter pill bar.
   - Mouse: custom drag (browsers don't auto-scroll on mouse drag).
   - Touch: native scroll only (fastest, with momentum + soft snap).
   Pass `activeId` to auto-scroll the matching pill into the center of the viewport. */
const DragScrollRow: React.FC<{
  children: React.ReactNode;
  className?: string;
  activeId?: number | string;
}> = ({ children, className = "", activeId }) => {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const isDown = React.useRef(false);
  const isDragging = React.useRef(false);
  const startX = React.useRef(0);
  const scrollLeftStart = React.useRef(0);
  const rafId = React.useRef<number | null>(null);

  // When activeId changes, smoothly center the matching pill — but only if it's off-screen
  React.useEffect(() => {
    const el = trackRef.current;
    if (!el || activeId === undefined) return;
    const item = el.querySelector<HTMLElement>(`[data-id="${activeId}"]`);
    if (!item) return;
    const trackRect = el.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    // Skip if the item is already comfortably visible (saves a redundant scroll)
    if (
      itemRect.left >= trackRect.left - 8 &&
      itemRect.right <= trackRect.right + 8
    ) {
      return;
    }
    const offset =
      itemRect.left + itemRect.width / 2 -
      (trackRect.left + trackRect.width / 2);
    // Use rAF so the browser has measured the layout before we ask it to scroll
    requestAnimationFrame(() => {
      if (trackRef.current) {
        trackRef.current.scrollTo({
          left: trackRef.current.scrollLeft + offset,
          behavior: "smooth",
        });
      }
    });
  }, [activeId]);

  // Only intercept mouse pointers; let touch pass through to native scroll
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = trackRef.current;
    if (!el) return;
    isDown.current = true;
    isDragging.current = false;
    startX.current = e.pageX - el.offsetLeft;
    scrollLeftStart.current = el.scrollLeft;
    try {
      el.setPointerCapture(e.pointerId);
    } catch {
      /* no-op */
    }
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDown.current || e.pointerType !== "mouse") return;
    const el = trackRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = x - startX.current;
    if (!isDragging.current && Math.abs(walk) > 4) {
      isDragging.current = true;
    }
    if (isDragging.current) {
      e.preventDefault();
      // Throttle scroll updates to one per animation frame for buttery-smooth mouse drag
      if (rafId.current !== null) return;
      rafId.current = requestAnimationFrame(() => {
        if (trackRef.current) {
          trackRef.current.scrollLeft = scrollLeftStart.current - walk;
        }
        rafId.current = null;
      });
    }
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = trackRef.current;
    if (!el) return;
    isDown.current = false;
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
    try {
      el.releasePointerCapture(e.pointerId);
    } catch {
      /* no-op */
    }
    setTimeout(() => {
      isDragging.current = false;
    }, 0);
  };

  // Suppress click after a real drag
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
      className={`flex gap-2 overflow-x-auto snap-x snap-proximity select-none ${className}`}
      style={{
        WebkitOverflowScrolling: "touch",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        // Native horizontal scroll on touch (no JS interference).
        // JS handles horizontal drag on mouse; vertical pan is left to the browser.
        touchAction: "pan-y",
        userSelect: "none",
        scrollPaddingInline: "20%",
        overscrollBehaviorX: "contain",
        scrollBehavior: "smooth",
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
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => {
            const isFilled = i + 1 <= Math.floor(t.rating);
            const isHalf = !isFilled && i + 0.5 < t.rating;
            return (
              <span key={i} className="relative inline-block w-4 h-4">
                <Star
                  className="w-4 h-4 text-gray-200 fill-gray-200"
                  strokeWidth={0}
                />
                {(isFilled || isHalf) && (
                  <span
                    className="absolute inset-0 overflow-hidden"
                    style={{ width: isHalf ? "50%" : "100%" }}
                  >
                    <Star
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                      strokeWidth={0}
                    />
                  </span>
                )}
              </span>
            );
          })}
        </div>
        <div className="flex items-center gap-2">
          <img
            src={`https://flagcdn.com/${t.countryCode}.svg`}
            alt={`${t.country} flag`}
            className="w-5 h-4 object-cover rounded-[2px] shadow-sm border border-gray-200/60"
            loading="lazy"
          />
          <span className="text-xs text-gray-400 font-medium">
            {t.country} <span className="text-gray-300 uppercase ml-0.5">{t.countryCode}</span>
          </span>
        </div>
      </div>

      <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">
        "{t.review}"
      </p>
    </div>

    <div className="pt-4 border-t border-gray-100">
      <h4 className="text-sm font-bold text-gray-900">{t.name}</h4>
      <p className="text-xs text-[#2f8ecd] font-medium">{t.appName}</p>
    </div>
  </div>
);

export const Testers: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeChapter, setActiveChapter] = useState<number>(1);
  const [selectedPlan, setSelectedPlan] = useState<"starter" | "pro">("starter");

  /* State for Sample PDF Modal Popup */
  const [showSampleModal, setShowSampleModal] = useState<boolean>(false);
  const [activePdfPreview, setActivePdfPreview] = useState<"feedback" | "answers" | null>(null);

  const testimonials = [
    {
      name: "Alex Rivera",
      role: "Solo Android Developer",
      country: "United States",
      countryCode: "us",
      rating: 4.5,
      review:
        "Got stuck trying to find enough testers on my own for almost 3 weeks. Found Karma Dude on Reddit, paid at 11pm, and by morning I had 15 testers opted in. Dashboard is straightforward — I could see sessions log daily. Only reason I'm not giving 5 stars is I had to ask twice for the production form template, but it came through eventually.",
      appName: "TaskPulse Pro",
    },
    {
      name: "Priya Sharma",
      role: "Founder, AppCraft Studio",
      country: "India",
      countryCode: "in",
      rating: 5,
      review:
        "We've been running a small studio for 2 years and Google rejected our last 2 apps citing insufficient testing. Karma Dude ran a clean 14-day cycle and we got approved on the first try after that. Their questionnaire answers were honestly better than what I would have written myself.",
      appName: "FinTrack Daily",
    },
    {
      name: "Sophie Laurent",
      role: "Indie Game Developer",
      country: "France",
      countryCode: "fr",
      rating: 4,
      review:
        "Mon RPG indé avait déjà été rejeté une fois. Le service m'a évité de chercher 12 testeurs moi-même. Les rapports de bugs étaient utiles et les testeurs semblaient réels (pas des bots). Le seul reproche : la communication WhatsApp est un peu lente le week-end.",
      appName: "Pixel Quest RPG",
    },
    {
      name: "Marcus Vance",
      role: "Lead Dev, TechNova",
      country: "United Kingdom",
      countryCode: "gb",
      rating: 4.5,
      review:
        "Our health app was stuck in closed testing limbo for a month before we found these guys. They assigned testers within 6 hours as advertised. Setup was painless — I just shared the opt-in link and they handled the rest. Crash report was actually detailed, not generic.",
      appName: "HealthSync AI",
    },
    {
      name: "Lucas Silva",
      role: "Mobile App Engineer",
      country: "Brazil",
      countryCode: "br",
      rating: 5,
      review:
        "Comprei o plano Pro para meu app de delivery e fui aprovado no primeiro pedido de production access. Os testadores são de verdade — vi comentários específicos no relatório sobre problemas no meu fluxo de checkout que eu não tinha percebido durante o dev.",
      appName: "DeliveryFast",
    },
    {
      name: "Hannah Weber",
      role: "Product Owner",
      country: "Germany",
      countryCode: "de",
      rating: 4,
      review:
        "Hat alles wie beschrieben funktioniert. 25 Tester angemeldet, 14 Tage durchgetestet, Production Access beim ersten Versuch erhalten. Ein Stern Abzug, weil das ASO-Report im Pro-Plan etwas oberflächlich war — hatte mehr Tiefe erwartet. Aber der Hauptservice (Testing) ist solide.",
      appName: "MindSpace Meditation",
    },
  ];

  const faqs = [
    {
      q: "How do I get 12 testers, and what does the process look like from payment to actual installs?",
      a: "After you pick a plan and complete payment on WhatsApp, we send a short onboarding form. The only technical thing we need is your Google Play Console closed-testing opt-in link (found under Testing in your console). Within 6 hours, our team assigns real Android users from our network — each on a physical device with a genuine Google account. They tap 'Become a tester' from your link, then open and use your app across the 14-day window. We monitor sessions daily and ping you the moment every Google checkbox is met.",
    },
    {
      q: "Is 14 days actually enough, or do you run the test longer? What if a tester forgets to open the app for a day?",
      a: "We run 14–16 days in practice to give a buffer. Google doesn't just count calendar days — its automated system checks session continuity. If a tester uses the app, then goes silent for three days, Google flags it as suspicious and your Production Access application can be rejected. So we actively monitor engagement throughout the window and replace any inactive tester with a fresh one at no extra cost. That's how we keep the 99.9% approval rate.",
    },
    {
      q: "What's actually included in the ₹999 Starter plan? Is it enough for a brand-new developer account?",
      a: "Starter is built for new personal developer accounts clearing the closed-testing hurdle for the first time. You get 15 verified Android testers (3 more than Google's 12-tester minimum as a safety margin), assignment within 6 hours, the full 14-day test with buffer days, a crash and feedback report at the end, pre-written answers for Google's Production Access questionnaire, and email support throughout. For a solo dev publishing a simple app, Starter is enough. If your app is complex or you've been rejected before, go for Pro.",
    },
    {
      q: "What extra do I get on the ₹1,699 Pro plan, and is it worth the upgrade for a small studio?",
      a: "The headline difference is 25 testers instead of 15 — useful for apps with multiple user flows or where you've been rejected before and want redundancy. Pro also adds a priority WhatsApp line (responses under 30 minutes), a full ASO audit (title, description, screenshots, keywords — what decides whether people actually download your app after approval), and a 1-on-1 walkthrough of your Production Access application before you submit it. For a simple utility app, Starter is fine. For a studio publishing its third app or any app with a prior rejection, Pro pays for itself the first time it saves you another 14-day cycle.",
    },
    {
      q: "What happens if Google rejects my Production Access request after 14 days? Do I lose my money?",
      a: "You're covered. If Google rejects your request specifically because of testing engagement — the only thing our service covers — we run a fresh 14-day testing cycle at no additional cost. We also review Google's rejection message and tell you what went wrong. Most rejections are one of three things: a missing checkbox in your Production Access form, a tester group with a quiet day, or a questionnaire answer that didn't quite address what Google wanted. All three are fixable. If the rejection is for a non-testing policy issue, our guarantee doesn't apply, but we'll point you toward the right fix and most of our customers come back successfully.",
    },
    {
      q: "My app is fully in Spanish and targets users in Mexico and Spain. Will non-Spanish testers actually use it properly?",
      a: "We have testers across multiple countries and languages — English, Hindi, Spanish, French, German, Portuguese, Japanese, and more. For your case, we'd assign Spanish-speaking testers on local carrier networks in Mexico and Spain, which is actually better than a generic English-speaking test because Google also weighs how your app performs in its intended market. Testers navigate the UI, check that text renders without truncation, validate locale-specific features like date and currency formats, and flag anything broken. Just tell us your target languages on the onboarding form and we'll route the test accordingly.",
    },
    {
      q: "Once I pay and share my opt-in link, how fast does testing actually start?",
      a: "There is no queue. From the moment we receive your payment confirmation and opt-in link, our target is testers accepting the invitation and opening your app within 6 hours. In practice it's usually 2–4 hours during business days, slightly longer if you sign up late at night when some testers are asleep in their time zones. You'll see the opt-in count rise in your Play Console in real time, and we send a WhatsApp confirmation the moment the first batch accepts. After that, the test runs itself for 14 days — we handle the day-to-day monitoring and only ping you if we need a decision.",
    },
    {
      q: "What kinds of apps do you accept? I have a fintech app and some testing services refuse finance apps.",
      a: "We accept almost every category that Google Play allows — productivity, business, SaaS, education, finance, health, e-commerce, entertainment, utilities, games, and more. Fintech is something we work with regularly, including apps that integrate payment gateways, banking APIs, and UPI flows. The only categories we can't take are apps that violate Google's Developer Program Policy in a way testing can't fix — malware, illegal content, or brand impersonation. If your app is in a regulated vertical, share the description with us before paying and we'll honestly tell you whether the closed-testing track will be enough.",
    },
  ];

  const chapters = [
    {
      id: 1,
      title: "1. The Requirement",
      subtitle: "Understanding Google Play's Closed Testing Mandate",
      headline: "Google's closed testing rule, in plain words",
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
      keyPoints:
        "In practical terms, the rule is closer to a 14-day audit than a public beta. Google looks at opt-in stability, session length, and crash-free device ratios across every tester on your track. Skipping even one of these checks reopens the requirement from scratch, so the safest mindset is to treat the 14-day window as a single, uninterrupted event—not a soft launch you can pause.",
      proTip:
        "Before you onboard testers, freeze your APK (or AAB) for the entire 14 days. Even minor code changes make it harder to defend a clean session graph in front of Google's review team.",
    },
    {
      id: 2,
      title: "2. Why Google Asks",
      subtitle: "Why Google Enforces 14-Day Testing Policy",
      headline: "Why Google introduced the 14-day testing policy",
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
      keyPoints:
        "The policy is fundamentally a trust signal. Google's risk engine assumes that legitimate developers will engage thoughtfully with real users for at least two weeks, so anything that looks automated—emulators, identical IPs, instant opt-ins—counts against you. The 40% crash reduction figure isn't just a marketing line; it reflects how much junk the new policy filters out before a single user installs the app.",
      proTip:
        "When filling the Production Access questionnaire, frame each answer around real tester feedback—reviewers actively look for evidence that you listened to users, not just that you ran tests.",
    },
    {
      id: 3,
      title: "3. Who We Are",
      subtitle: "Karma Dude - India's #1 Android Testing Platform",
      headline: "Who is behind Karma Dude",
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
      keyPoints:
        "We started as a small Android-only studio in 2019 and grew into a compliance-focused team the hard way—by debugging dozens of rejected apps before Google formalised its current testing rules. That early pain is now our playbook: every framework we ship is built around the same edge cases that originally got our own submissions stuck in review. The result is a process that has held up across fintech, gaming, utility, and SaaS apps for five straight years.",
      proTip:
        "If you have an unusual app category—wearables, automotive, enterprise MDM—skip the generic guides and ask for a category-specific walkthrough before paying for any testing plan.",
    },
    {
      id: 4,
      title: "4. Free vs Managed",
      subtitle: "DIY Testing vs Karma Dude Managed Testing",
      headline: "Asking friends vs hiring a managed testing team",
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
      keyPoints:
        "DIY testing is rarely free once you factor in the hidden cost of a failed cycle. A single dropout on day 9 means you reset the timer, lose a week, and still have to chase replacements who will be naturally less engaged than a paid, accountability-tracked tester. Managed testing flips that equation: you pay once, you get a clean 14-day run, and you walk away with the documentation that Google's review team actually wants to see.",
      proTip:
        "Run a quick audit of your last rejection (if any) before choosing a plan—most DIY failures can be traced to tester inactivity, not to the app itself, which is exactly what managed testing fixes.",
    },
    {
      id: 5,
      title: "5. Plans",
      subtitle: "Transparent, Fixed Pricing Plans",
      headline: "What each plan actually costs and includes",
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
      keyPoints:
        "Both plans share the same backend—the same tester pool, the same monitoring system, and the same questionnaire templates. The difference is the surface area: Pro gives you ten extra testers (which shortens your risk surface if anyone drops off), plus an ASO audit that often pays for the plan upgrade within the first week of launch. If your app is revenue-critical, Pro is the cheaper option once you account for the cost of a delayed release.",
      proTip:
        "Bundle the Pro plan with a launch date in mind—once you have ASO recommendations, schedule them into your store listing update the same day Production Access is granted.",
    },
    {
      id: 6,
      title: "6. Timeline",
      subtitle: "16-Day Closed Testing Lifecycle Roadmap",
      headline: "What happens day by day during the 14-day test",
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
      keyPoints:
        "Day 0 is where most developers lose the most time. Onboarding is less about uploading an APK and more about compiling the tester email list, joining the right closed track, and pushing the right build to the right testers in the right order. The 16-day window is intentionally generous: 14 days of testing plus two buffer days to absorb time-zone gaps, late-night tester drop-offs, and the occasional mid-cycle tester replacement.",
      proTip:
        "Don't upload a new build on day 7 unless you absolutely have to. Google's session graph is far easier to defend when the testers run the same APK from start to finish.",
    },
    {
      id: 7,
      title: "7. Real Testers",
      subtitle: "Verified Physical Android Devices & Real Users",
      headline: "Who the testers actually are",
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
      keyPoints:
        "The single biggest reason a closed test gets rejected is not the app itself—it is the testers. Google's heuristics can spot when ten testers share the same IP block, log in from the same device fingerprint, or opt in within minutes of each other. Our testers are deliberately split across regions, devices, and OS versions, so each session graph looks like an organic cohort rather than a coordinated batch.",
      proTip:
        "Ask for a tester breakdown before launching your track. A healthy mix of high-end and mid-range Android devices catches the layout regressions that emulators always miss.",
    },
    {
      id: 8,
      title: "8. What You Get",
      subtitle: "Complete Package Deliverables & Reports",
      headline: "Every deliverable you receive after the test",
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
      keyPoints:
        "The reports are written for two audiences at once: your internal product team and Google's review team. Each crash log is paired with a short narrative explaining what happened and how the next build addresses it, which is exactly the kind of feedback loop Google's reviewers want to see in the questionnaire answers. You also get a copy of the wording we recommend for each Production form field, so you are not paraphrasing policies from memory at the final step.",
      proTip:
        "Save the questionnaire answers as a reusable template—Google's review team frequently asks follow-up questions, and a documented answer history turns round two into a five-minute task.",
    },
    {
      id: 9,
      title: "9. Why Choose Us",
      subtitle: "Unmatched Reliability, Speed & Guarantee",
      headline: "What makes Karma Dude different from alternatives",
      intro:
        "We are India's most trusted closed testing provider with over 100 published apps and a 99.9% approval track record.",
      keyFacts: [
        "6-Hour Rapid Onboarding",
        "100% Production Access Guarantee",
        "Dedicated WhatsApp Account Manager",
        "Continuous Daily Active Monitoring",
      ],
      details:
        "We handle all the operational heavy lifting so you can focus on building features and scaling your app business.",
      keyPoints:
        "Reliability is the entire product. Most competitors win on speed during the first 24 hours, then disappear once a tester drops off or a reviewer pushes back. Our workflow is built around daily monitoring and escalation paths so that a single bad day never becomes a failed cycle. The 100% approval guarantee is not a marketing promise; it is a structural commitment backed by a re-test policy that we have never had to publicly defend.",
      proTip:
        "Pair your account manager with a shared spreadsheet on day one. When everyone can see the tester activity in real time, escalations happen in minutes instead of hours.",
    },
    {
      id: 10,
      title: "10. Experience",
      subtitle: "5+ Years of Google Play Compliance Mastery",
      headline: "Five years of navigating Google Play policy",
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
      keyPoints:
        "Policy wording changes every quarter, and the Play Console is silently rewritten alongside it. What worked in 2021—long opt-in windows, weak audit trails—now triggers an instant rejection. We have walked through each of those transitions with live apps, which is why our questionnaire templates are versioned and our tester recommendations are adjusted within days of any major Console update. The result is a body of institutional knowledge that compresses a 14-day learning curve into a single onboarding call.",
      proTip:
        "Treat every Console notification as a policy update, not a comment. Forwarding those emails to your account manager is the fastest way to catch a requirement shift before your next submission.",
    },
    {
      id: 11,
      title: "11. Rejected Before?",
      subtitle: "App Rejected by Google? We Offer Full Recovery!",
      headline: "How we recover rejected apps",
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
      keyPoints:
        "Re-applying with the same evidence is the fastest way to get rejected twice. Our recovery program starts with a forensic audit of your previous submission, so we can pinpoint whether the failure was tester inactivity, weak questionnaire answers, or a Console misconfiguration. From there we rebuild the entire evidence trail: a fresh tester cohort, a fresh 14-day cycle, and a freshly written questionnaire that pre-empts the same reviewer objections.",
      proTip:
        "Quote the original rejection reason verbatim in your recovery intake form. The exact wording tells us which Console review team handled your case and which policy clause they cited.",
    },
    {
      id: 12,
      title: "12. Going Live",
      subtitle: "Step-by-Step Guidance to Final Store Release",
      headline: "The final four steps to publishing your app",
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
      keyPoints:
        "Going live is the easy part—preparing the submission is where most launches slip. The 14-day badge on your Console dashboard is the only objective proof that your test qualifies, and it is what a reviewer will look at first. Once that badge is visible, every other step is paperwork: drop in the questionnaire templates, hit submit, and the manual review team typically responds within 48 to 72 hours with either an approval or a single, specific follow-up question.",
      proTip:
        "Pre-write your store listing update the same week you hit day 14. Production Access approval is binary, and the apps that launch fastest are the ones whose listings are already queued for a same-day rollout.",
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
                        className="group inline-flex items-center gap-2 px-6 py-3.5 md:px-8 md:py-4 bg-white border border-gray-200 text-gray-800 rounded-full text-xs sm:text-sm font-bold uppercase tracking-widest hover:bg-[#2f8ecd] hover:text-white hover:border-[#2f8ecd] hover:shadow-lg hover:shadow-[#2f8ecd]/25 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                      >
                        <span>Pricing</span>
                        <ArrowDown className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors duration-300" />
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
                  { label: "Apps Published", value: "100+" },
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
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="relative bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col lg:flex-row overflow-hidden"
                >
                  {/* Badge — minimal, top-right */}
                  <div className="absolute top-5 right-5 z-10 inline-flex items-center bg-gray-100 text-gray-700 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                    Best Value
                  </div>

                  {/* LEFT — Plan summary */}
                  <div className="lg:w-[40%] p-7 sm:p-9 flex flex-col gap-6 border-b lg:border-b-0 lg:border-r border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-700">
                        <Smartphone className="w-5 h-5" strokeWidth={2} />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">Starter</h3>
                        <p className="text-xs text-gray-500">For solo developers</p>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-semibold text-gray-900 tracking-tight">₹999</span>
                        <span className="text-sm text-gray-500">/ app</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        One-time payment. No subscription.
                      </p>
                    </div>

                    <button
                      onClick={openWhatsApp}
                      className="w-full py-3 rounded-lg bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium transition-colors cursor-pointer flex items-center justify-center gap-2"
                    >
                      Get started
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* RIGHT — Feature list */}
                  <div className="lg:w-[60%] p-7 sm:p-9">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">
                      Includes
                    </p>
                    <ul className="space-y-3.5">
                      {[
                        {
                          title: "15 verified Android testers",
                          detail: "Real users on physical Samsung, Pixel, OnePlus devices.",
                        },
                        {
                          title: "Setup within 6 hours",
                          detail: "Compared to 24–48h you'd wait elsewhere.",
                        },
                        {
                          title: "Full 14-day closed testing",
                          detail: "Continuous active sessions across the full window.",
                        },
                        {
                          title: "Production access guarantee",
                          detail: "Approved by Google, or we re-test for free.",
                        },
                        {
                          title: "Pre-written Production Access answers",
                          detail: "Tailored responses for every Google question.",
                          hasSample: true,
                        },
                        {
                          title: "Email and chat support, 24/7",
                          detail: "Real people, no chatbots.",
                        },
                      ].map((feature) => (
                        <li key={feature.title} className="flex items-start gap-3">
                          <CheckCircle2
                            className="w-4 h-4 text-[#2f8ecd] shrink-0 mt-0.5"
                            strokeWidth={2.5}
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between gap-2 flex-wrap">
                              <span className="text-sm text-gray-900 font-medium">
                                {feature.title}
                              </span>
                              {feature.hasSample && (
                                <button
                                  onClick={() => setShowSampleModal(true)}
                                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#2f8ecd] hover:text-[#001F3F] cursor-pointer transition-colors"
                                >
                                  View sample
                                  <ExternalLink className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 mt-0.5 leading-snug">
                              {feature.detail}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="pro-plan"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="relative bg-white border-2 border-[#2f8ecd] rounded-2xl shadow-md flex flex-col lg:flex-row overflow-hidden"
                >
                  {/* Badge — top-right, restrained */}
                  <div className="absolute top-5 right-5 z-10 inline-flex items-center bg-[#2f8ecd] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                    Most popular
                  </div>

                  {/* LEFT — Plan summary */}
                  <div className="lg:w-[40%] p-7 sm:p-9 flex flex-col gap-6 border-b lg:border-b-0 lg:border-r border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-[#2f8ecd]">
                        <Sparkles className="w-5 h-5" strokeWidth={2} />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">Pro</h3>
                        <p className="text-xs text-gray-500">For studios and high-priority apps</p>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-semibold text-gray-900 tracking-tight">₹1,699</span>
                        <span className="text-sm text-gray-500">/ app</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        One-time payment. Includes everything in Starter plus ASO, priority support, and 25 testers.
                      </p>
                    </div>

                    <button
                      onClick={openWhatsApp}
                      className="w-full py-3 rounded-lg bg-[#2f8ecd] hover:bg-[#001F3F] text-white text-sm font-medium transition-colors cursor-pointer flex items-center justify-center gap-2"
                    >
                      Choose Pro
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* RIGHT — Feature list */}
                  <div className="lg:w-[60%] p-7 sm:p-9 bg-gray-50/40">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">
                      Everything in Starter, plus
                    </p>
                    <ul className="space-y-3.5">
                      {[
                        {
                          title: "25 verified Android testers",
                          detail: "More coverage for complex or larger apps.",
                        },
                        {
                          title: "Priority WhatsApp line",
                          detail: "Direct access to a dedicated account manager.",
                        },
                        {
                          title: "Full ASO audit",
                          detail: "Title, description, and keyword recommendations.",
                          hasSample: true,
                        },
                        {
                          title: "Expert review of your form",
                          detail: "1-on-1 walkthrough before you submit to Google.",
                        },
                        {
                          title: "100% money-back guarantee",
                          detail: "If you're not approved, we refund the full amount.",
                        },
                      ].map((feature) => (
                        <li key={feature.title} className="flex items-start gap-3">
                          <CheckCircle2
                            className="w-4 h-4 text-[#2f8ecd] shrink-0 mt-0.5"
                            strokeWidth={2.5}
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between gap-2 flex-wrap">
                              <span className="text-sm text-gray-900 font-medium">
                                {feature.title}
                              </span>
                              {feature.hasSample && (
                                <button
                                  onClick={() => setShowSampleModal(true)}
                                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#2f8ecd] hover:text-[#001F3F] cursor-pointer transition-colors"
                                >
                                  View sample
                                  <ExternalLink className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 mt-0.5 leading-snug">
                              {feature.detail}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
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
              {[...testimonials.slice(0, 3), ...testimonials.slice(0, 3)].map((t, idx) => (
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
              {[...testimonials.slice(3, 6), ...testimonials.slice(3, 6)].map((t, idx) => (
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
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">100+ Apps Published</h3>
                <p className="text-blue-200 group-hover:text-white/90 text-sm leading-relaxed max-w-md transition-colors duration-500">Growing track record with 100+ Android apps approved for public release on Google Play.</p>
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
        <section className="py-8 md:py-12 px-4 md:px-12 max-w-[1600px] mx-auto bg-gray-50 rounded-[2.5rem] border border-gray-200/80">
          <div className="max-w-[1400px] mx-auto">
            {/* Section Header — Editorial style with watermark */}
            <div className="relative mb-6 md:mb-8 overflow-hidden">
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

            {/* Progress Bar removed — was redundant with prev/next chapter navigation */}

            {/* Two-column layout: Left index sidebar | Chapter card */}
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-10 items-start">
              {/* LEFT — Chapter Index Sidebar (Sticky) */}
              <aside className="lg:sticky lg:top-28 hidden lg:block">
                <div className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-sm">
                  {/* Sidebar header */}
                  <div className="flex items-center gap-2 px-2 pt-1 pb-3 mb-2 border-b border-gray-100">
                    <BookOpen className="w-4 h-4 text-[#2f8ecd]" />
                    <span className="text-[11px] font-bold tracking-[0.15em] text-gray-500 uppercase">
                      Index
                    </span>
                    <span className="text-[11px] font-bold tracking-[0.15em] text-gray-300 uppercase ml-auto">
                      · 12 Chapters
                    </span>
                  </div>

                  {/* Chapter list */}
                  <nav className="space-y-1">
                    {chapters.map((ch) => {
                      const isActive = activeChapter === ch.id;
                      return (
                        <button
                          key={`L-${ch.id}`}
                          onClick={() => setActiveChapter(ch.id)}
                          className={`group w-full flex items-center gap-3 p-2.5 rounded-xl text-left transition-all cursor-pointer ${
                            isActive
                              ? "bg-blue-50 ring-1 ring-[#2f8ecd] shadow-sm"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          <span
                            className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold transition-colors ${
                              isActive
                                ? "bg-[#2f8ecd] text-white"
                                : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                            }`}
                          >
                            {String(ch.id).padStart(2, "0")}
                          </span>
                          <span
                            className={`text-[13px] leading-tight font-semibold transition-colors ${
                              isActive ? "text-gray-900" : "text-gray-600 group-hover:text-gray-900"
                            }`}
                          >
                            {ch.title.replace(/^\d+\.\s*/, "")}
                          </span>
                        </button>
                      );
                    })}
                  </nav>
                </div>
              </aside>

              {/* CENTER — Chapter Card */}
              <main className="w-full min-w-0">
                <motion.div
                  key={currentChapterData.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="relative p-5 sm:p-6 lg:p-7 rounded-2xl bg-white border border-gray-200/80 shadow-sm overflow-hidden"
                >
                  {/* Header row — pill badge + chapter counter on right */}
                  <div className="relative flex flex-col sm:flex-row justify-between items-start gap-3 mb-4">
                    <div>
                      <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#2f8ecd] text-[10px] font-bold uppercase tracking-[0.15em]">
                        <CircleDot className="w-2.5 h-2.5" />
                        {currentChapterData.subtitle}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mt-0.5">
                      Chapter {String(currentChapterData.id).padStart(2, "0")} / 12
                    </span>
                  </div>

                  {/* Big editorial heading */}
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 leading-[1.15]">
                    {currentChapterData.headline}
                  </h3>

                  {/* Intro paragraph */}
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-5">
                    {currentChapterData.intro}
                  </p>

                  {/* "The rule at a glance" style visual card — only for chapter 1 */}
                  {currentChapterData.id === 1 && (
                    <div className="relative mb-5 p-4 sm:p-5 rounded-xl border border-blue-100 bg-gradient-to-b from-blue-50/40 to-white">
                      <h4 className="text-[10px] font-bold text-[#2f8ecd] uppercase tracking-[0.2em] mb-3">
                        The Rule at a Glance
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {/* 12 testers — row of person icons */}
                        <div className="bg-white rounded-lg border border-blue-100 p-3">
                          <div className="flex gap-0.5 mb-2">
                            {Array.from({ length: 14 }).map((_, i) => (
                              <span
                                key={i}
                                className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border ${
                                  i < 12
                                    ? "bg-blue-50 text-[#2f8ecd] border-blue-200"
                                    : "bg-gray-100 text-gray-400 border-gray-200"
                                }`}
                              >
                                <Users className="w-2.5 h-2.5" />
                              </span>
                            ))}
                          </div>
                          <p className="text-sm font-bold text-gray-900">12 testers</p>
                          <p className="text-[11px] text-gray-500 mt-0.5">Opted in, not just added to a list</p>
                        </div>

                        {/* 14 days — row of day pills */}
                        <div className="bg-white rounded-lg border border-blue-100 p-3">
                          <div className="flex gap-0.5 mb-2 flex-wrap">
                            {Array.from({ length: 14 }).map((_, i) => {
                              const day = i + 1;
                              const isFinal = day === 14;
                              return (
                                <span
                                  key={i}
                                  className={`shrink-0 w-5 h-5 rounded-md flex items-center justify-center text-[9px] font-bold ${
                                    isFinal
                                      ? "bg-[#001F3F] text-white"
                                      : "bg-blue-50 text-[#2f8ecd] border border-blue-100"
                                  }`}
                                >
                                  {day}
                                </span>
                              );
                            })}
                          </div>
                          <p className="text-sm font-bold text-gray-900">14 days</p>
                          <p className="text-[11px] text-gray-500 mt-0.5">One continuous, unbroken stretch</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Key facts rendered as a checklist */}
                  {currentChapterData.keyFacts.length > 0 && (
                    <div className="relative mb-5">
                      <h4 className="text-xs font-bold text-gray-900 mb-2.5">
                        {currentChapterData.id === 1 ? "Play Console tracks it as a three-step checklist:" : "Key takeaways:"}
                      </h4>
                      <ul className="space-y-2">
                        {currentChapterData.keyFacts.map((fact, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <span className="shrink-0 mt-0.5 w-4 h-4 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center">
                              <CheckCircle2 className="w-2.5 h-2.5 text-[#2f8ecd]" strokeWidth={3} />
                            </span>
                            <span className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                              {fact}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Details / closing paragraph */}
                  <p className="text-gray-700 text-sm leading-relaxed mb-5">
                    {currentChapterData.details}
                  </p>

                  {/* Key insights paragraph — deeper explanation in plain words */}
                  {currentChapterData.keyPoints && (
                    <div className="relative mb-5">
                      <h4 className="text-xs font-bold text-gray-900 mb-2 inline-flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-[#2f8ecd]" />
                        In Depth
                      </h4>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {currentChapterData.keyPoints}
                      </p>
                    </div>
                  )}

                  {/* Pro tip callout — actionable advice */}
                  {/* {currentChapterData.proTip && (
                    <div className="relative mb-5 flex items-start gap-3 p-4 rounded-xl bg-blue-50/70 border border-blue-100">
                      <span className="shrink-0 w-8 h-8 rounded-lg bg-[#001F3F] flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-white" strokeWidth={2.2} />
                      </span>
                      <div className="min-w-0">
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#2f8ecd] mb-1">
                          Pro Tip
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                          {currentChapterData.proTip}
                        </p>
                      </div>
                    </div>
                  )} */}

                  {/* Closing recap line */}
                  {/* <div className="relative mb-6 flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[#2f8ecd] font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>End of Chapter {String(currentChapterData.id).padStart(2, "0")}</span>
                    <span className="flex-1 h-px bg-gradient-to-r from-blue-100 to-transparent" />
                  </div> */}

                  {/* Prev / Next Navigation */}
                  <div className="relative pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
                    <button
                      onClick={() => activeChapter > 1 && setActiveChapter(activeChapter - 1)}
                      disabled={activeChapter === 1}
                      className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all ${
                        activeChapter === 1
                          ? "bg-gray-50 text-gray-300 cursor-not-allowed"
                          : "bg-white border border-gray-200 text-gray-700 hover:border-[#2f8ecd] hover:text-[#2f8ecd] cursor-pointer"
                      }`}
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      <span>Previous</span>
                    </button>

                    <span className="text-[11px] text-gray-400 font-medium order-first sm:order-none w-full sm:w-auto text-center">
                      {currentChapterData.id} / 12
                    </span>

                    <button
                      onClick={() => activeChapter < 12 && setActiveChapter(activeChapter + 1)}
                      disabled={activeChapter === 12}
                      className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all ${
                        activeChapter === 12
                          ? "bg-gray-50 text-gray-300 cursor-not-allowed"
                          : "bg-[#001F3F] hover:bg-[#2f8ecd] text-white cursor-pointer shadow-md"
                      }`}
                    >
                      <span>Next Chapter</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              </main>
            </div>
          </div>
        </section>

        {/* CTA — hand-crafted editorial style */}
        <section className="py-14 md:py-20 px-4 md:px-12 max-w-[1400px] mx-auto">
          <div className="relative overflow-hidden rounded-[2rem] border border-gray-200/80 bg-[#fbfaf7]">
            {/* Subtle paper texture — small noise dots */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.35] pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.06) 1px, transparent 0)",
                backgroundSize: "14px 14px",
              }}
            />

            {/* Hand-drawn style underline accent (top-left) */}
            <div
              aria-hidden
              className="absolute top-8 left-8 md:top-12 md:left-12 w-16 h-[2px] bg-[#2f8ecd] rounded-full"
            />

            <div className="relative flex flex-col items-center text-center p-8 md:p-16">
              {/* Eyebrow */}
              <div className="flex items-center gap-2 mb-5">
                <span className="w-5 h-5 rounded-full bg-[#2f8ecd]/10 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2f8ecd]" />
                </span>
                <span className="text-[11px] font-bold tracking-[0.2em] text-[#2f8ecd] uppercase">
                  Ready when you are
                </span>
              </div>

              {/* Heading */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-5 max-w-2xl">
                Ready to publish your app?
              </h2>

              {/* Subtext */}
              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8 max-w-xl">
                Get 15 to 25 verified Android device testers assigned within 6 hours and pass Google Play Production Access seamlessly.
              </p>

              {/* Single CTA */}
              <button
                onClick={openWhatsApp}
                className="group inline-flex items-center gap-3 px-7 py-4 bg-[#001F3F] text-white rounded-full font-bold text-xs sm:text-sm uppercase tracking-widest hover:bg-[#2f8ecd] transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              {/* Reassurance line */}
              <p className="text-gray-400 text-xs mt-5">
                100% Production Access Guarantee · No subscription · Refund if rejected
              </p>
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
