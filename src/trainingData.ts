import { Smartphone, Store, Wallet, type LucideIcon } from 'lucide-react';

export type PathKey = 'team' | 'manager';
export type StepKind = 'brief' | 'scenario' | 'checklist' | 'signoff';
export type ModuleKey = 'basics' | 'pos' | 'account';

export interface ScenarioOption {
  text: string;
  correct: boolean;
  feedback: string;
}

export interface Highlight {
  label: string;
  value: string;
  note?: string;
}

export interface Step {
  id: string;
  module?: ModuleKey;
  kind: StepKind;
  eyebrow: string;
  title: string;
  summary: string;
  script?: string;
  bullets?: string[];
  timedBullets?: {
    showUntil: string;
    text: string;
  }[];
  highlights?: Highlight[];
  progressiveReveal?: boolean;
  checklist?: string[];
  prompt?: string;
  options?: ScenarioOption[];
  coachNote?: string;
  // Internal rule: keep screenshots only when they stay legible at the app's narrow width and clearly help the learner; otherwise prefer text-only or tightly cropped/annotated visuals.
  screenshot?: {
    alt: string;
    caption: string;
    src: string;
  };
}

export interface PathDefinition {
  key: PathKey;
  label: string;
  steps: Step[];
}

export interface FaqItem {
  question: string;
  guestAnswer: string;
  teamNote?: string;
}

export interface FaqSection {
  title: string;
  items: FaqItem[];
}

function isActiveThroughDate(showUntil: string, now = new Date()) {
  const [year, month, day] = showUntil.split('-').map(Number);
  const endOfDay = new Date(year, month - 1, day, 23, 59, 59, 999);
  return now <= endOfDay;
}

const PROMO_END_DATE = '2026-04-30';
const PROMO_START_LABEL = 'April 17';
const PROMO_END_LABEL = 'April 30';
const PROMO_BONUS_POINTS = '5,000 bonus points';

const DEN_REWARDS_PROMO = isActiveThroughDate(PROMO_END_DATE)
  ? {
      showUntil: PROMO_END_DATE,
      quickTip: 'Bonus ends soon - April 30',
      signupBonusAnswer: `Yes. From ${PROMO_START_LABEL} to ${PROMO_END_LABEL}, new members get ${PROMO_BONUS_POINTS}.`,
      standardInvite: `Have you signed up for our new loyalty program? From ${PROMO_START_LABEL} - ${PROMO_END_LABEL} only, new members get ${PROMO_BONUS_POINTS}. Can I set that up for you?`,
      busyInvite: `We just launched our new loyalty program. You get ${PROMO_BONUS_POINTS} when you sign up before ${PROMO_END_LABEL}. Here is a QR code if you'd like to join.`,
    }
  : null;

export const STORE_OPTIONS = [
  'Crown Isle',
  'Port Alberni',
  'Parksville',
  'Nanoose Bay',
  'Langford',
  'Royal Bay',
  'Allandale',
  'Hatley Park',
  'Eagle Creek',
  'Uptown',
  'Quadra Village',
  'Caddy Bay',
  'Other store',
] as const;

export const MODULE_CONFIG: Record<
  ModuleKey,
  {
    label: string;
    shortLabel: string;
    description: string;
    icon: LucideIcon;
    themeClass: string;
  }
> = {
  basics: {
    label: 'Loyalty Basics',
    shortLabel: 'Basics',
    description: 'Invitation, responses, and quick tips. Invite once, keep it brief, and do not push after a no.',
    icon: Wallet,
    themeClass: 'module-theme-basics',
  },
  pos: {
    label: 'Signup, Earn, Redeem',
    shortLabel: 'POS',
    description: 'Points, tiers, redemption, and enrollment steps. Keep it simple and keep the line moving.',
    icon: Store,
    themeClass: 'module-theme-pos',
  },
  account: {
    label: 'Account Management',
    shortLabel: 'Account',
    description: 'Where guests can check points, transactions, and rewards after signup. Recommend the app first.',
    icon: Smartphone,
    themeClass: 'module-theme-account',
  },
};

export const FAQ_SECTIONS: FaqSection[] = [
  {
    title: 'Program Basics',
    items: [
      {
        question: 'What is the Cascadia Loyalty Program?',
        guestAnswer: `Short Answer (Guest-Friendly)
"Our loyalty program rewards you every time you shop. You earn points on your purchases and can redeem them for money off future visits."`,
        teamNote: `Suggested Team Members Explanation
• Guests earn points every time they shop.
• Those points can be redeemed for money off future purchases.
• The more guests shop, the faster they earn rewards and move into higher tiers.`,
      },
      {
        question: 'How do guests earn points? What are they worth?',
        guestAnswer: `Program Rule
• Guests earn 10 points for every $1 spent.
• 1,000 points = $1 in rewards`,
        teamNote: `Suggested Team Members Wording
"You earn 10 points for every dollar you spend. Once you collect enough points, you can redeem them for money off your purchases."
Simple Way to Explain the Value
"For every $100 you spend, you earn about $1 in rewards."
This keeps the explanation simple and easy to understand.
"Every 1,000 points equals $1 in rewards that you can use toward a future purchase."`,
      },
      {
        question: 'How long does a tier last?',
        guestAnswer: `Program Rule
• Once guests reach a tier, it stays active for one full year.`,
        teamNote: `Suggested Team Members Wording
"When you reach a tier, you keep that status for a full year."`,
      },
      {
        question: 'What happens to points if an account is inactive?',
        guestAnswer: `Program Rule
• Accounts with no activity for 2 years will expire.`,
        teamNote: `Suggested Team Members Wording
"As long as the account stays active, the points stay active too. If there’s no activity for two years, the account will expire.
We’ll send a reminder one month before your points expire, and again one week before."`,
      },
      {
        question: 'Are there signup bonuses',
        guestAnswer: `Yes.
Early Signup Bonus
Guests who sign up shortly after launch receive:
• 5,000 bonus points
Pre-Launch Bonus
Guests who join before the official launch receive an additional:
• 2,500 bonus points
Total Possible Bonus
• 7,500 points ($7.50 value)`,
        teamNote: `Suggested Team Members Wording
"If you sign up early, you’ll receive bonus points just for joining."`,
      },
      {
        question: 'What if a guest asks how valuable the program is?',
        guestAnswer:
          `"Most guests earn about $1 back for every $100 they spend, and you earn rewards faster as you move into higher tiers."`,
      },
    ],
  },
  {
    title: 'Guest Questions',
    items: [
      {
        question: 'Can points be used on alcohol?',
        guestAnswer:
          `Suggested answer:
"Yes. Points can be used just like money toward most purchases in the store."`,
        teamNote: 'NOTE: Tobacco, Lottery, and Bottle Deposits are excluded.',
      },
      {
        question: 'Can a guest use points right away?',
        guestAnswer:
          `Suggested answer:
"Points are ready to use on your next visit. They can’t be earned and redeemed on the same day, but 24 hours from the time of purchase."`,
      },
      {
        question: 'Does a guest lose their tier if they stop shopping?',
        guestAnswer:
          `Suggested answer:
"Once you reach a tier, you keep it for a full year from the date you reached the tier. Continuing to shop helps you maintain or increase your tier."`,
      },
      {
        question: 'How can a guest check their points?',
        guestAnswer:
          `Suggested answer:
"Your points balance can be viewed through your loyalty account online, through the app, and when you add the program to your phone’s wallet."`,
      },
      {
        question: 'But can a team member share my points balance with me when I am in a store?',
        guestAnswer:
          `Suggested answer:
"No. Points are only visible through the app or your online account. Account information is restricted to management."`,
      },
      {
        question: 'Can I use just 1,000 points on a purchase?',
        guestAnswer:
          `Suggested answer:
"There is a minimum spend of 5,000 points. Then you can use points in 1,000 or 5,000 increments."`,
      },
      {
        question: 'Do I earn points when I purchase a gift card?',
        guestAnswer:
          `Suggested answer:
"No. Points are not earned on the gift card purchase. However, points are earned when you use a gift card as tender."`,
      },
      {
        question: 'Do points expire?',
        guestAnswer:
          `Suggested answer:
"Points stay active as long as the account is active. If there’s no activity for two years, the account will expire."`,
      },
    ],
  },
  {
    title: 'POS Troubleshooting',
    items: [
      {
        question: 'What if points do not appear immediately?',
        guestAnswer:
          `Suggested response:
"Points will appear on your account after the transaction is completed. They will be available for your next visit."`,
      },
      {
        question: 'What if the guest wants to redeem but does not have enough points?',
        guestAnswer:
          `Suggested response:
"It looks like you’re close to your first reward. After another visit or two you’ll likely have enough points to start redeeming."`,
      },
      {
        question: 'What if the guest forgot they were a member?',
        guestAnswer:
          `Suggested response:
"No problem — we can look up your account using your phone number."`,
      },
      {
        question: 'What if the guest asks why they cannot redeem today?',
        guestAnswer:
          `Suggested response:
"Points activate for your next visit so everyone earns rewards the same way."`,
      },
      {
        question: 'What details are required for signup?',
        guestAnswer:
          'Use first name, last name, and phone number. Confirm enrollment and let the guest know a welcome text will be sent.',
      },
    ],
  },
  {
    title: 'How to Encourage Signups at Checkout',
    items: [
      {
        question: '10 Second Signup Invitation',
        guestAnswer:
          `Suggested script:
"Are you part of our new loyalty program yet? You earn points every time you shop and can use them for money off future purchases."`,
        teamNote: 'Keep it natural and conversational, not salesy.',
      },
      {
        question: 'If the guest shows interest:',
        guestAnswer:
          `Suggested script:
"It only takes a moment to join, and you’ll receive bonus points just for signing up."`,
      },
      {
        question: 'When the Store Is Busy',
        guestAnswer:
          `Short version:
"Want to earn points on today’s purchase?"`,
      },
      {
        question: 'When a Guest Is a Regular',
        guestAnswer:
          `Suggested script:
"You shop here often — our new loyalty program lets you earn rewards every time you visit."`,
      },
    ],
  },
  {
    title: "Team Members' Tips for Driving Adoption",
    items: [
      {
        question: 'What should team members remember?',
        guestAnswer:
          `• Mention the program naturally during checkout
• Focus on the signup bonus
• Keep the explanation simple
• Avoid explaining point math unless asked`,
      },
      {
        question: 'Best summary for guests',
        guestAnswer:
          `"Earn points every time you shop and redeem them for money off later."`,
      },
    ],
  },
  {
    title: 'CADDY BAY',
    items: [
      {
        question: '1. What happens with Caddy Bay points?',
        guestAnswer:
          `Caddy Bay points will convert into The Den Rewards.
Conversion Rule
• 5 Caddy Bay points convert to 1 Den Reward point`,
        teamNote:
          `Suggested Team Members Wording
"If you have points from Caddy Bay, they’ll convert into Den Rewards points so you can keep using them."`,
      },
      {
        question: '2. Caddy Bay Points Conversion',
        guestAnswer:
          `This section helps team members explain how existing Caddy Bay points will transition into the new Cascadia loyalty program.

Key Message for Guests
The most important point to communicate is that guests will not lose their rewards.
Caddy Bay points will convert into Cascadia loyalty points so they can continue earning and redeeming rewards across Cascadia stores.

Simple Explanation (Recommended Default)
Suggested script:
"Your Caddy Bay points will convert into Cascadia loyalty points, so you won’t lose any rewards. Once the new program launches, you’ll be able to keep earning and redeeming them at all Cascadia locations."

If a Guest Asks How the Conversion Works
Suggested script:
"Caddy Bay points convert into Cascadia points at a rate of five to one. The value stays the same, so your rewards carry over into the new program."

If a Guest Asks Whether They Will Lose Points
Suggested script:
"No — your Caddy Bay points will transfer into Cascadia loyalty points so you can keep using them."`,
      },
      {
        question: 'Example Team Members Can Use',
        guestAnswer:
          `If a guest wants a simple example:
"For example, if you had 5,000 Caddy Bay points, they would convert into 1,000 Cascadia points, which is worth $1 in rewards."`,
      },
      {
        question: 'Best Way to Introduce the Change to Regular Guests',
        guestAnswer:
          `Suggested script:
"We’re moving to a new Cascadia loyalty program that works across all our stores. Your Caddy Bay points will convert automatically, so you can keep using them."`,
      },
      {
        question: 'Key Messages Team Members Should Emphasize',
        guestAnswer:
          `When discussing the conversion, focus on these points:
• Points transfer automatically
• Guests do not lose value
• The new program works across all Cascadia locations`,
      },
      {
        question: 'What Team Members Should Avoid',
        guestAnswer:
          `To prevent confusion, team members should avoid:
• Explaining detailed point math
• Comparing old and new earn rates
• Discussing system conversion details`,
        teamNote:
          `If guests ask complex questions, team members can respond with:
"The new program works very similarly, and your rewards transfer over so you can keep using them."`,
      },
    ],
  },
];
export const TEAM_STEPS: Step[] = [
  {
    id: 'basics-invitation',
    module: 'basics',
    kind: 'brief',
    eyebrow: 'Loyalty Basics',
    title: 'The invitation',
    summary:
      'Lead with the standard invitation. Keep it calm, clear, and easy to say at the till.',
    script:
      DEN_REWARDS_PROMO?.standardInvite ??
      'Have you signed up for our new loyalty program? Can I set that up for you?',
    coachNote: 'Pause and let the guest answer. Do not rush past the pause.',
  },
  {
    id: 'basics-responses',
    module: 'basics',
    kind: 'brief',
    eyebrow: 'Loyalty Basics',
    title: 'Handling responses',
    summary:
      'The response matters as much as the ask. Move smoothly into the next step or out of the conversation.',
    progressiveReveal: true,
    highlights: [
      {
        label: 'If yes',
        value: 'Begin enrollment immediately',
        note: 'Confirm phone number and keep it smooth and quick.',
      },
      {
        label: 'If no',
        value: 'That\'s okay!',
        note: 'Offer the QR code for later and move on cleanly.',
      },
    ],
    bullets: [
      'No pressure and no second attempt',
      'Keep it natural - conversational, not salesy',
      'Wait for the answer before moving on',
    ],
  },
  {
    id: 'basics-response-check',
    module: 'basics',
    kind: 'scenario',
    eyebrow: 'Loyalty Basics',
    title: 'If the guest says no',
    summary:
      'When the guest says no, keep the interaction positive and keep the line moving.',
    prompt: 'A guest says, "No thanks," and reaches for their card. What should you do?',
    options: [
      {
        text: 'I can give you a quick overview of the program if you want to hear it.',
        correct: false,
        feedback: 'Not correct. You kept explaining after a no, which slows the line and feels pushy. Give the QR code and move on.',
      },
      {
        text: 'That\'s okay! Here is a QR code if you\'d like to sign up later.',
        correct: true,
        feedback: 'Correct. That matches the guide and keeps the interaction smooth.',
      },
      {
        text: 'Are you sure? It only takes a second if you want to look at it.',
        correct: false,
        feedback: 'Not correct. That keeps pressure on after the guest declined. Stay brief, offer the QR code, and continue the transaction.',
      }
    ],
  },
  {
    id: 'basics-when-busy',
    module: 'basics',
    kind: 'brief',
    eyebrow: 'Loyalty Basics',
    title: 'When it\'s busy',
    summary:
      'Use the short version when there is a line and you need to keep the transaction moving.',
    script:
      DEN_REWARDS_PROMO?.busyInvite ??
      'We just launched our new loyalty program. Here is a QR code if you\'d like to join.',
  },
  {
    id: 'basics-quick-tips',
    module: 'basics',
    kind: 'brief',
    eyebrow: 'Loyalty Basics',
    title: 'Quick tips',
    summary:
      'A few habits make the launch easier: stay conversational, wait for the answer, and keep the message simple.',
    bullets: [
      'Keep it natural and conversational.',
      'Wait for the answer. Give guests time to think.',
    ],
    timedBullets: [
      ...(DEN_REWARDS_PROMO
        ? [{ showUntil: DEN_REWARDS_PROMO.showUntil, text: DEN_REWARDS_PROMO.quickTip }]
        : []),
    ],
  },
  {
    id: 'basics-module-quiz',
    module: 'basics',
    kind: 'scenario',
    eyebrow: 'Loyalty Basics',
    title: 'Module quiz',
    summary:
      'Finish the module with the short response that fits a busy moment at the till.',
    prompt:
      'The line is building and the guest is already halfway through paying. What should you do?',
    options: [
      {
        text: 'I can give you the full version if you want the details first.',
        correct: false,
        feedback: 'Not correct. That is still too much detail for a busy line. Use the short invite and keep the transaction moving.',
      },
      {
        text: 'We can always come back to it next time if the line stays busy.',
        correct: false,
        feedback: 'Not correct. That delays the invite and drops the opportunity. Use the short version now and keep it moving.',
      },
      {
        text: DEN_REWARDS_PROMO?.busyInvite ?? 'We just launched our new loyalty program. Here is a QR code if you\'d like to join.',
        correct: true,
        feedback: 'Correct. That is the guide-based busy-line version.',
      }
    ],
  },
  {
    id: 'basics-module-quiz-2',
    module: 'basics',
    kind: 'scenario',
    eyebrow: 'Loyalty Basics',
    title: 'Module quiz',
    summary:
      'Use the guest-friendly response that matches the launch standard.',
    prompt:
      'The guest is waiting at the till. What should you remember while you talk them through the offer?',
    options: [
      {
        text: 'Wait for the answer. Give guests time to think.',
        correct: true,
        feedback: 'Correct. That is the right behavior at the till.',
      },
      {
        text: 'Keep talking a little so the guest does not feel stuck.',
        correct: false,
        feedback: 'Not correct. You filled the pause instead of giving them time to answer. Pause, wait, and keep it calm.',
      },
      {
        text: 'Repeat the invitation once if the guest seems unsure.',
        correct: false,
        feedback: 'Not correct. Repeating the invite adds pressure. Let the guest answer, then move on naturally.',
      },
    ],
  },
  {
    id: 'basics-module-quiz-3',
    module: 'basics',
    kind: 'scenario',
    eyebrow: 'Loyalty Basics',
    title: 'Module quiz',
    summary:
      'Finish the module by choosing the tone that fits the guide.',
    prompt:
      'A guest looks distracted as you start the invite. What tone should you use?',
    options: [
      {
        text: 'Add a little more enthusiasm so the guest feels the offer matters.',
        correct: false,
        feedback: 'Not correct. Extra enthusiasm can sound salesy and awkward. Keep the invite natural and easy to hear.',
      },
      {
        text: 'Keep it natural and conversational.',
        correct: true,
        feedback: 'Correct. That is the tone standard from the guide.',
      },
      {
        text: 'Lead with the tiers and bonus details before you make the ask.',
        correct: false,
        feedback: 'Not correct. You led with details instead of the ask, which makes the pitch harder to follow. Start with the invitation first.',
      }
    ],
  },
  {
    id: 'pos-tiers',
    module: 'pos',
    kind: 'brief',
    eyebrow: 'Signup, Earn, Redeem',
    title: 'Loyalty tiers',
    summary:
      'You do not need to teach the whole program at checkout, but you do need the basics right.',
    highlights: [
      { label: 'Cub', value: '0 - 9,999 pts', note: '10 pts / $1' },
      { label: 'Black Bear', value: '10,000 - 49,999 pts', note: '12 pts / $1' },
      { label: 'Grizzly', value: '50,000+ pts', note: '15 pts / $1' },
    ],
    coachNote:
      'Use tiers as supporting context, not the main pitch. Lead with the invitation and reward value. Tier progress is based on points earned from dollars spent, not bonus or referral points.',
  },
  {
    id: 'pos-points',
    module: 'pos',
    kind: 'brief',
    eyebrow: 'Signup, Earn, Redeem',
    title: 'POINTS',
    summary:
      'The simplest value language is the easiest to remember and the easiest for guests to understand.',
    highlights: [
      { label: 'Earn rate', value: '10 pts / $1' },
      { label: 'Reward value', value: '1,000 pts = $1' },
      { label: 'Redemption', value: '5,000 pts = $5 off', note: 'Minimum purchase: $20' },
    ],
    bullets: [
      'Guests earn points today and use them on a future visit',
      'Use simple value language first',
      'Redemption starts at 5,000 points on a $20 purchase',
      'Phone number is the fastest account lookup',
    ],
  },
  {
    id: 'pos-enrollment-lookup',
    module: 'pos',
    kind: 'brief',
    eyebrow: 'Signup, Earn, Redeem',
    title: 'Add customer to cart',
    summary:
      'Use the customer lookup first. If the guest may already be in the system, find them before creating a new profile.',
    screenshot: {
      src: '/pos/2026-03-26-13-01-03-pos-main-crop.png',
      alt: 'Add Customer to Cart dialog with search field and customer results',
      caption: 'Search by phone number to find the guest before checkout.',
    },
  },
  {
    id: 'pos-enrollment-details',
    module: 'pos',
    kind: 'brief',
    eyebrow: 'Signup, Earn, Redeem',
    title: 'Add customer details',
    summary:
      'Update the guest details, turn loyalty on, and then confirm.',
    coachNote:
      'Look up first. Update details if needed. Turn loyalty on before you confirm.',
  },
  {
    id: 'pos-enrollment',
    module: 'pos',
    kind: 'checklist',
    eyebrow: 'Signup, Earn, Redeem',
    title: 'Enrollment steps',
    summary:
      'Use the same sequence every time: look up first, update if needed, then enroll.',
    script:
      'I\'ll just get your first and last name and your phone number to get you set up. You\'ll get a message with a link to the Den Rewards app, and that\'s the easiest way to keep track of your points and transactions.',
    checklist: [
      'Look up the guest first',
      'Update their details if needed',
      'Turn loyalty on',
      'Only create a new profile if you cannot find the guest',
      'Ask for first name, last name, and phone number',
      'Confirm enrollment',
      'Tell the guest they will get a message with the app link',
      'Thank them',
    ],
  },
  {
    id: 'pos-existing-guest-check',
    module: 'pos',
    kind: 'scenario',
    eyebrow: 'Signup, Earn, Redeem',
    title: 'Module quiz',
    summary:
      'Check the enrollment flow when the guest may already exist in the system.',
    prompt:
      'A guest says they may already be in the system, but they were not enrolled through the pre-launch signup. What should you do first?',
    options: [
      {
        text: 'Create a new profile right away so the signup is faster.',
        correct: false,
        feedback:
          'Not correct. That can create a duplicate profile and make cleanup harder later. Look them up first.',
      },
      {
        text: 'Ask the guest to come back later so you can check the account after the rush.',
        correct: false,
        feedback:
          'Not correct. The lookup should happen now so the guest can be enrolled cleanly in the same transaction.',
      },
      {
        text: 'Look them up first, update their information if needed, then turn loyalty on.',
        correct: true,
        feedback:
          'Correct. That keeps the flow clean and avoids creating a duplicate profile when one may already exist.',
      }
    ],
    coachNote:
      'Lookup first, then update and turn loyalty on. Only create a new profile if you cannot find the guest.',
  },
  {
    id: 'pos-busy-check',
    module: 'pos',
    kind: 'scenario',
    eyebrow: 'Signup, Earn, Redeem',
    title: 'Module quiz',
    summary:
      'Close the module by choosing the right move for a busy checkout moment.',
    script:
      DEN_REWARDS_PROMO?.busyInvite ?? 'We just launched our new loyalty program. Here is a QR code if you\'d like to join.',
    prompt: 'There are four people in line and no backup. What should you do with the loyalty invite?',
    options: [
      {
        text: 'Use the short busy-line script and keep the transaction moving.',
        correct: true,
        feedback: 'Correct. That matches the guide and protects line speed.',
      },
      {
        text: 'Wait until the line clears so you can give the full invitation properly.',
        correct: false,
        feedback: 'Not correct. Waiting loses the chance to invite and leaves the guest unsupported. Use the short version now and keep the line moving.',
      },
      {
        text: 'Give the full invitation, then explain the details once the guest seems interested.',
        correct: false,
        feedback: 'Not correct. That adds extra explanation when speed matters. Keep it short and move the checkout along.',
      },
    ],
    coachNote: 'The standard is still to invite. The only change is the shorter script.',
  },
  {
    id: 'pos-module-quiz-2',
    module: 'pos',
    kind: 'scenario',
    eyebrow: 'Signup, Earn, Redeem',
    title: 'Module quiz',
    summary:
      'Check the key value language before moving on.',
    prompt:
      'A guest asks how the rewards work while you are at checkout and you only have a moment to explain it. What should you tell them?',
    options: [
      {
        text: 'Guests earn 10 points for every $1, and 100 points equals $10 in rewards.',
        correct: false,
        feedback: 'Not correct. That changes the reward math and could mislead the guest. Keep the simple value: 10 points per $1, 1,000 points equals $1.',
      },
      {
        text: 'Guests earn 10 points for every $1, and 1,000 points equals $1 in rewards.',
        correct: true,
        feedback: 'Correct. That is the core point value language.',
      },
      {
        text: 'Guests redeem 1,000 points for $5 off.',
        correct: false,
        feedback: 'Not correct. That overstates the reward and would create confusion. Keep the point-to-dollar value exact.',
      }
    ],
  },
  {
    id: 'pos-module-quiz-3',
    module: 'pos',
    kind: 'scenario',
    eyebrow: 'Signup, Earn, Redeem',
    title: 'Module quiz',
    summary:
      'Finish the module with the exact enrollment requirement.',
    prompt:
      'A guest agrees to sign up and hands over their ID. What information do you need to collect to get them enrolled?',
    options: [
      {
        text: 'First name and email address.',
        correct: false,
        feedback: 'Not correct. That leaves out the last name and phone number, which are needed to enroll cleanly. Collect the full basic details.',
      },
      {
        text: 'First name, phone number, and home address.',
        correct: false,
        feedback: 'Not correct. Home address slows the flow and is not part of the basic signup. Stick to the required fields only.',
      },
      {
        text: 'First name, last name, and phone number.',
        correct: true,
        feedback: 'Correct. Those are the required enrollment details in the guide.',
      }
    ],
  },
  {
    id: 'account-intro',
    module: 'account',
    kind: 'brief',
    eyebrow: 'Account Management',
    title: 'The Den Rewards Mobile App',
    summary:
      'The Den Rewards app is the best way for guests to access their loyalty account.',
    bullets: [
      'The mobile app allows guests to see their points history and transactions',
      'They can rate and save their favorite products',
      'They will receive bonus points and rewards through the app',
    ],
  },
  {
    id: 'account-signup',
    module: 'account',
    kind: 'brief',
    eyebrow: 'Account Management',
    title: 'Signing in to the App',
    summary:
      'When a guest first opens the app they will have to click the sign up button to set up their account. When they get to the point where they enter their phone number it will link to their transactions.',
    bullets: [
      'Quick & easy signup like any other app',
      'Guests will use their phone number to link transactions to their account',
      'They will get a message with PIN that will help them if they forget their password',
    ],
  },
  {
    id: 'account-native-app',
    module: 'account',
    kind: 'brief',
    eyebrow: 'Account Management',
    title: 'How to Download the App',
    summary:
      'Let guests know they will get a message with a link to download the app on the Apple App Store or Google Play. If they miss it they can search Cascadia Liquor on their app store.',
    script:
      'The easiest way to keep track of your points and recent purchases is in the Cascadia Den Rewards App. You\'ll get the link by message.',
    bullets: [
      'Guests will receive a welcome message with information on how to download the app',
      'We\'ll send them a reminder if they forget',
      'They can search the app store and download it at any time',
    ],
  },
  {
    id: 'account-web-wallet',
    module: 'account',
    kind: 'brief',
    eyebrow: 'Account Management',
    title: 'App Features - Transactions',
    summary:
      'Guests will be able to view their transaction history and point history in the app. They will also be able to give a star rating to products they have purchased. This allows them to easily remember and purchase their favorite items again.',
    bullets: [
      'See points and recent transactions',
      'Save or rate favorites',
    ],
  },
  {
    id: 'account-messaging',
    module: 'account',
    kind: 'brief',
    eyebrow: 'Account Management',
    title: 'App Features - Mobile Messaging & Notifications',
    summary:
      'Keep guests informed and engaged with a centralized inbox for all brand communications. By opting into push notifications, they\'ll never miss an exclusive drop, a flash sale, or a personalized birthday treat.',
    bullets: [
      'Centralized message center for brand updates',
      'Real-time push notifications for exclusive deals',
      'Easy management of communication preferences',
    ],
  },
  {
    id: 'account-profile',
    module: 'account',
    kind: 'brief',
    eyebrow: 'Account Management',
    title: 'App Features - Personalized Profiles',
    summary:
      'Guests can manage their personal details and preferences to ensure their experience stays relevant. From updating contact info to selecting favorite product categories, this ensures they only see the content they care about most.',
    bullets: [
      'Update contact and account information',
      'Set personal product preferences',
      'Secure login and data management',
    ],
  },
  {
    id: 'account-mobile-ordering',
    module: 'account',
    kind: 'brief',
    eyebrow: 'Account Management',
    title: 'App Features - Mobile Ordering',
    summary:
      'Streamline the shopping experience by allowing guests to browse the full menu and place orders directly through the app. Whether they prefer in-store pickup or curbside service, this feature reduces wait times and makes getting their favorite products faster and more convenient than ever.',
    bullets: [
      'Browse live menus with real-time inventory',
      'Place orders for quick in-store pickup or delivery in select locations',
      'Receive status updates from order placement to fulfillment',
    ],
  },
  {
    id: 'account-access-check',
    module: 'account',
    kind: 'scenario',
    eyebrow: 'Account Management',
    title: 'Check points later',
    summary: 'Lead with the app first and keep the answer short.',
    prompt:
      'A guest asks how they can check their points later. What should you say?',
    options: [
      {
        text: 'You can check your receipt later if you need to.',
        correct: false,
        feedback: 'Not correct. That starts with a fallback and leaves out the app. Lead with the app and keep it brief.',
      },
      {
        text: 'The easiest way to keep track of your points and recent purchases is in the Cascadia Den Rewards App. You\'ll get a message with the link to download it.',
        correct: true,
        feedback: 'Correct. That leads with the app and gives the guest the download link in one short answer.',
      },
      {
        text: 'We can look it up after checkout if that works better.',
        correct: false,
        feedback: 'Not correct. That delays the answer and weakens the app recommendation. Keep it app-first and immediate.',
      },
    ],
  },
  {
    id: 'account-module-quiz-4',
    module: 'account',
    kind: 'scenario',
    eyebrow: 'Account Management',
    title: 'Scenario practice',
    summary:
      'Use the app-first flow in one checkout conversation.',
    prompt:
      'A guest joins while the line builds. They ask how many points they will earn today and whether they can use them right away. What should you say?',
    options: [
      {
        text: 'You can use the points right away once the app link comes through, so I\'d download it now and apply them today.',
        correct: false,
        feedback: 'Not correct. That gives the guest the wrong timing for redemption. Keep it accurate and point them to the app for tracking.',
      },
      {
        text: 'You\'ll get about $1 back for every $100, and I can show you the rest on your receipt after checkout.',
        correct: false,
        feedback: 'Not correct. That sounds uncertain and shifts the focus away from the app. Lead with the simple value and the download message.',
      },
      {
        text: 'You\'ll earn 10 points for every $1 spent. The points are for a future visit, and you\'ll get a message with the app link.',
        correct: true,
        feedback: 'Correct. That keeps the answer clear, app-first, and easy to use at the till.',
      }
    ],
  },
  {
    id: 'account-fallbacks',
    module: 'account',
    kind: 'brief',
    eyebrow: 'Account Management',
    title: 'App Features - Apple & Google Wallet Pass',
    summary:
      'For guests who prefer a lighter experience, the Wallet Pass allows them to save their loyalty card directly to their phone’s native digital wallet (Apple Wallet or Google Wallet). This provides instant access to their loyalty card and delivers real-time point updates and push notifications without requiring the full mobile app to be installed.',
    bullets: [
      'No App Required: Guests can add their pass via a link in an SMS or email, or by following the wallet prompt on their phone.',
      'Instant Updates: Point balances and reward availability refresh automatically on the digital card.',
      'Lock Screen Notifications: Send "push-like" updates directly to the guest\'s lock screen through the wallet pass.',
    ],
  },
  {
    id: 'account-web-wallet',
    module: 'account',
    kind: 'brief',
    eyebrow: 'Account Management',
    title: 'App Features - Web Wallet',
    summary:
      'The Web Wallet provides guests with a full-featured loyalty portal accessible through any mobile or desktop web browser. It’s the perfect "middle ground" for guests who want to manage their account, view rewards, and browse menus without downloading an app or relying solely on a digital pass. It ensures a consistent, branded experience across every device.',
    bullets: [
      'Browser-Based Access: Log in easily via a link on the website or through a text message.',
      'Full Account Management: View point history, redeem rewards, and update profile details in one place.',
      'Seamless Experience: No download required—perfect for first-time visitors or those who prefer web browsing.',
    ],
  },
  {
    id: 'account-wallet-pass',
    module: 'account',
    kind: 'brief',
    eyebrow: 'Account Management',
    title: 'Keep it simple',
    summary:
      'Keep the app first. Do not list every option at once.',
    bullets: [
      'Lead with the app',
      'Do not overexplain',
      'Keep backups secondary',
    ],
  },
  {
    id: 'team-signoff',
    module: 'account',
    kind: 'signoff',
    eyebrow: 'Complete Training',
    title: 'Final reinforcement',
    summary:
      'App first. Message link. Points and recent transactions in the app. Fallbacks only if the guest does not want it.',
    checklist: [
      'App first',
      'Link by message',
      'App for points and recent transactions',
      'Fallbacks only if the guest does not want the app',
    ],
  },
];

export const MANAGER_STEPS: Step[] = [
  {
    id: 'manager-standard',
    kind: 'brief',
    eyebrow: 'Manager Tools',
    title: 'Coach the behavior',
    summary:
      'Managers should reinforce the invite, the response, and line speed.',
    bullets: [
      'Watch whether staff ask',
      'Watch how they ask',
      'Correct over-explaining quickly',
    ],
    checklist: [
      'Uses the standard invite naturally',
      'Handles a no cleanly',
      'Switches to the short version when needed',
      'Explains enrollment simply',
      'Recommends the app clearly',
      'Mentions the app download message',
      'Keeps the line moving',
    ],
    coachNote:
      'Use this for quick floor coaching checks.',
  },
];

export const PATHS: PathDefinition[] = [
  { key: 'team', label: 'Team Member', steps: TEAM_STEPS },
  { key: 'manager', label: 'Manager', steps: MANAGER_STEPS },
];

