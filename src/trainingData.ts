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

export interface MediaPlaceholder {
  title: string;
  body: string;
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
  highlights?: Highlight[];
  checklist?: string[];
  prompt?: string;
  options?: ScenarioOption[];
  coachNote?: string;
  mediaPlaceholders?: MediaPlaceholder[];
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

export const STORE_OPTIONS = [
  'Crown Isle (Courtenay)',
  'View Royal',
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
  }
> = {
  basics: {
    label: 'Loyalty Basics',
    shortLabel: 'Basics',
    description: 'Program value, points, and tiers.',
    icon: Wallet,
  },
  pos: {
    label: 'Signup, Earn, Redeem',
    shortLabel: 'POS',
    description: 'Checkout workflow and what to do in the POS.',
    icon: Store,
  },
  account: {
    label: 'Account Management',
    shortLabel: 'Account',
    description: 'Web wallet, wallet pass, and native app setup.',
    icon: Smartphone,
  },
};

export const FAQ_SECTIONS: FaqSection[] = [
  {
    title: 'Program Basics',
    items: [
      {
        question: 'What is The Den Rewards program?',
        guestAnswer:
          'The program rewards guests every time they shop. They earn points on purchases and use them for money off future visits.',
        teamNote:
          'Keep it simple: earn points now, redeem later, and higher tiers increase value over time.',
      },
      {
        question: 'How do guests earn points, and what are they worth?',
        guestAnswer:
          'Guests earn 10 points for every $1 spent. Every 1,000 points equals $1 in rewards.',
        teamNote:
          'A simple value shortcut is “about $1 back for every $100 spent.” Avoid detailed math unless asked.',
      },
      {
        question: 'How long does a tier last?',
        guestAnswer:
          'Once a guest reaches a tier, they keep that status for a full year.',
      },
      {
        question: 'What happens if an account is inactive?',
        guestAnswer:
          'Points stay active as long as the account stays active. If there is no activity for two years, the account expires.',
      },
      {
        question: 'Is there a signup bonus?',
        guestAnswer:
          'Yes. Guests who sign up early receive bonus points for joining.',
      },
      {
        question: 'How valuable is the program?',
        guestAnswer:
          'Most guests earn about $1 back for every $100 they spend, and they earn rewards faster as they move into higher tiers.',
      },
    ],
  },
  {
    title: 'Guest Questions',
    items: [
      {
        question: 'Can points be used on alcohol?',
        guestAnswer:
          'Yes. Points can be used like money toward most purchases in the store.',
        teamNote: 'Tobacco, lottery, and bottle deposits are excluded.',
      },
      {
        question: 'Do points expire?',
        guestAnswer:
          'Points stay active as long as the account is active. If there is no activity for two years, the account expires.',
      },
      {
        question: 'Can a guest use points right away?',
        guestAnswer:
          'Points are ready to use on the next visit. They cannot be earned and redeemed on the same day.',
        teamNote: 'Points become available about 24 hours after the purchase.',
      },
      {
        question: 'Does a guest lose their tier if they stop shopping?',
        guestAnswer:
          'No. Once a guest reaches a tier, they keep it for a full year from the date they reached it.',
      },
      {
        question: 'How can a guest check their points?',
        guestAnswer:
          'Their points balance appears on the receipt and can also be viewed through their loyalty account.',
      },
    ],
  },
  {
    title: 'POS Troubleshooting',
    items: [
      {
        question: 'What if points do not appear immediately?',
        guestAnswer:
          'Points appear after the transaction is completed and will be available for the next visit.',
      },
      {
        question: 'What if the guest wants to redeem but does not have enough points?',
        guestAnswer:
          'Let them know they are close to their first reward and likely need only another visit or two.',
      },
      {
        question: 'What if the guest forgot they were a member?',
        guestAnswer:
          'Look up the account using the guest’s phone number.',
      },
      {
        question: 'What if the guest asks why they cannot redeem today?',
        guestAnswer:
          'Points activate for the next visit so everyone earns rewards the same way.',
      },
    ],
  },
  {
    title: 'How To Talk About It',
    items: [
      {
        question: 'What is the best checkout invitation?',
        guestAnswer:
          'A short, natural invitation works best: mention the loyalty program and that it earns points toward money off future purchases.',
        teamNote:
          'If the guest is interested, move into signup and mention the bonus points.',
      },
      {
        question: 'What should I say when the store is busy?',
        guestAnswer:
          'Use the short version: “Want to earn points on today’s purchase?”',
      },
      {
        question: 'What should I say to a regular guest?',
        guestAnswer:
          'Try: “You shop here often. Our new loyalty program lets you earn rewards every time you visit.”',
      },
    ],
  },
];

export const TEAM_STEPS: Step[] = [
  {
    id: 'basics-intro',
    module: 'basics',
    kind: 'brief',
    eyebrow: 'Loyalty Basics',
    title: 'Start with the core story',
    summary:
      'This first module gives the simple language staff need for points, rewards, and tiers.',
    bullets: [
      'What The Den Rewards is',
      'How points work',
      'What tiers mean for guests',
    ],
  },
  {
    id: 'basics-points',
    module: 'basics',
    kind: 'brief',
    eyebrow: 'Loyalty Basics',
    title: 'POINTS',
    summary:
      'Guests do not need a long explanation. They need a clear answer that feels easy to understand.',
    highlights: [
      { label: 'Base earn', value: '10 pts / $1' },
      { label: 'Reward value', value: '1,000 pts = $1' },
      { label: 'Launch bonus', value: '5,000 pts', note: 'Mention the signup bonus during launch' },
    ],
    bullets: [
      'Use the simple explanation first',
      'Avoid unnecessary point math',
      'Focus on future reward value',
    ],
  },
  {
    id: 'basics-tiers',
    module: 'basics',
    kind: 'brief',
    eyebrow: 'Loyalty Basics',
    title: 'Understand the tiers',
    summary:
      'Team members should understand the shape of the program without turning checkout into a tier lesson.',
    highlights: [
      { label: 'Cub', value: '10 pts / $1', note: 'Entry tier' },
      { label: 'Black Bear', value: '12 pts / $1', note: 'Mid-tier' },
      { label: 'Grizzly', value: '15 pts / $1', note: 'Top tier' },
    ],
    coachNote:
      'If the guest wants more detail, keep the answer short and move them toward the key benefit: rewards on future visits.',
  },
  {
    id: 'basics-value-check',
    module: 'basics',
    kind: 'scenario',
    eyebrow: 'Loyalty Basics',
    title: 'Use the simple explanation',
    summary:
      'The best explanation is the one a guest understands immediately.',
    prompt:
      'A guest asks, “What is this actually worth?” Which answer is best at the till?',
    options: [
      {
        text: 'Most guests earn about $1 back for every $100 they spend, and they earn faster as they move into higher tiers.',
        correct: true,
        feedback:
          'Correct. It is simple, concrete, and still leaves room for deeper detail if asked.',
      },
      {
        text: 'It depends on tier accumulation, annual qualification, and detailed point math.',
        correct: false,
        feedback:
          'Not correct. That answer is too technical for a checkout conversation.',
      },
      {
        text: 'It is hard to explain, but the manager can walk through the spreadsheet later.',
        correct: false,
        feedback:
          'Not correct. Team members need a simple guest-friendly explanation.',
      },
    ],
  },
  {
    id: 'pos-intro',
    module: 'pos',
    kind: 'brief',
    eyebrow: 'Signup, Earn, Redeem',
    title: 'This module is about the till workflow',
    summary:
      'Focus on the staff actions that happen in real transactions: signup, earning points, and redeeming rewards.',
    bullets: [
      'How to sign a guest up',
      'How to explain earning and redemption timing',
      'How to keep the line moving',
    ],
  },
  {
    id: 'pos-signup',
    module: 'pos',
    kind: 'checklist',
    eyebrow: 'Signup, Earn, Redeem',
    title: 'Sign a guest up correctly',
    summary:
      'Collect the key details accurately so the account can be found later and marketing consent is handled properly.',
    checklist: [
      'Open the customer menu',
      'Select add customer',
      'Enter first name and last name',
      'Enter phone number as the primary identifier',
      'Confirm marketing consent',
      'Save the profile and continue the sale',
    ],
    mediaPlaceholders: [
      {
        title: 'POS signup screenshots',
        body: 'Add step-by-step signup images here once the screenshots are ready.',
      },
    ],
    coachNote:
      'First and last name matter. Phone number is still the best lookup field for future visits.',
  },
  {
    id: 'pos-earn-redeem',
    module: 'pos',
    kind: 'brief',
    eyebrow: 'Signup, Earn, Redeem',
    title: 'Explain earn and redeem simply',
    summary:
      'Guests earn points today and can use them on a future visit. They do not earn and redeem on the same transaction.',
    highlights: [
      { label: 'Earn', value: 'Today’s purchase', note: 'Points post after the transaction' },
      { label: 'Redeem', value: 'Next visit', note: 'Available after points activate' },
      { label: 'Lookup', value: 'Phone number', note: 'Fastest way to find the account' },
    ],
    mediaPlaceholders: [
      {
        title: 'POS earn / redeem screenshots',
        body: 'Add the account lookup and redemption workflow screenshots here.',
      },
    ],
  },
  {
    id: 'pos-no-response',
    module: 'pos',
    kind: 'scenario',
    eyebrow: 'Signup, Earn, Redeem',
    title: 'Handle “no” cleanly',
    summary:
      'A clean exit matters just as much as the invitation.',
    prompt: 'The guest says, “No thanks.” What should you say next?',
    options: [
      {
        text: "That's okay. If you decide to later, there's a QR code you can use.",
        correct: true,
        feedback:
          'Correct. That keeps the interaction smooth and protects the guest experience.',
      },
      {
        text: 'Explain the tiers and bonus points in more detail.',
        correct: false,
        feedback:
          'Not correct. The standard is no pressure and no second attempt.',
      },
      {
        text: 'Ask again after payment to make sure they understood.',
        correct: false,
        feedback:
          'Not correct. A second attempt creates pressure and slows the transaction.',
      },
    ],
    coachNote: 'No pressure. No awkward pause. Move on cleanly.',
  },
  {
    id: 'pos-busy-line',
    module: 'pos',
    kind: 'scenario',
    eyebrow: 'Signup, Earn, Redeem',
    title: 'Protect line speed',
    summary:
      'Use the short version when the line is building and there is no backup available.',
    script:
      'For the first two weeks only, new members get 5,000 bonus points. You can scan this QR code to join now, or next time you are in the store.',
    prompt:
      'There are four people in line and no backup. What is the right move?',
    options: [
      {
        text: 'Use the short busy-line script and keep the transaction moving.',
        correct: true,
        feedback:
          'Correct. Service speed and a short invitation can coexist.',
      },
      {
        text: 'Stop mentioning loyalty until the rush is over.',
        correct: false,
        feedback:
          'Not correct. The behavior is still to invite, just with a shorter version.',
      },
      {
        text: 'Give the full script and full explanation to every guest.',
        correct: false,
        feedback:
          'Not correct. The line-speed constraint changes how much you say.',
      },
    ],
  },
  {
    id: 'account-intro',
    module: 'account',
    kind: 'brief',
    eyebrow: 'Account Management',
    title: 'Support the guest after signup',
    summary:
      'This module covers where guests manage their account and how staff should talk about digital access.',
    bullets: [
      'Web wallet',
      'Wallet pass',
      'Native app',
    ],
  },
  {
    id: 'account-web-wallet',
    module: 'account',
    kind: 'brief',
    eyebrow: 'Account Management',
    title: 'Web wallet basics',
    summary:
      'Guests should be able to view their points, rewards, and account details through the loyalty web experience.',
    bullets: [
      'Use it to check rewards and account details',
      'Use it as the simplest fallback if the guest does not use the app',
      'Keep staff language focused on access, not troubleshooting details',
    ],
    mediaPlaceholders: [
      {
        title: 'Web wallet screenshots',
        body: 'Add screenshots for points balance, rewards view, and profile access.',
      },
    ],
  },
  {
    id: 'account-wallet-pass',
    module: 'account',
    kind: 'brief',
    eyebrow: 'Account Management',
    title: 'Wallet pass setup',
    summary:
      'Show guests how to keep their rewards access handy through a wallet pass when that option is available.',
    bullets: [
      'Use wallet pass as a convenience tool',
      'Position it as the easy-access option',
      'Know where to point guests if they need help adding it',
    ],
    mediaPlaceholders: [
      {
        title: 'Wallet pass screenshots',
        body: 'Add Apple Wallet / Google Wallet setup visuals here.',
      },
    ],
  },
  {
    id: 'account-native-app',
    module: 'account',
    kind: 'brief',
    eyebrow: 'Account Management',
    title: 'Native app basics',
    summary:
      'If guests prefer the app, staff should know the simple role it plays in account access and rewards management.',
    bullets: [
      'Use the app for account access and rewards visibility',
      'Keep explanations simple and action-oriented',
      'Escalate technical questions to the store manager when needed',
    ],
    mediaPlaceholders: [
      {
        title: 'Native app screenshots',
        body: 'Add app home, rewards, and account screenshots here.',
      },
    ],
  },
  {
    id: 'account-access-check',
    module: 'account',
    kind: 'scenario',
    eyebrow: 'Account Management',
    title: 'Guide the guest to their account',
    summary:
      'Guests may need help understanding where their points and rewards live after signup.',
    prompt:
      'A guest asks where they can check their points later. What should the team member say?',
    options: [
      {
        text: 'Your points balance appears on your receipt and can also be viewed through your loyalty account.',
        correct: true,
        feedback:
          'Correct. That keeps the answer practical and aligned to the training materials.',
      },
      {
        text: 'You need to wait for the manager to print a points report for you.',
        correct: false,
        feedback:
          'Not correct. Guests should be directed to their own loyalty account access.',
      },
      {
        text: 'There is no way to check points until you redeem them.',
        correct: false,
        feedback:
          'Not correct. Guests can view their balance through the loyalty account experience.',
      },
    ],
  },
  {
    id: 'team-signoff',
    module: 'account',
    kind: 'signoff',
    eyebrow: 'Complete Training',
    title: 'Submit your completion',
    summary:
      'Finish the training so your store can track who is ready for launch. Your score is based on first-attempt answers in the scenario checks.',
    checklist: [
      'I understand loyalty basics',
      'I can handle signup, earn, and redeem conversations in the POS',
      'I know where guests can manage their account',
      'I am ready to use the knowledge base or ask my store manager when unsure',
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
      'Managers should reinforce the invitation, the yes/no response, and line-speed discipline.',
    bullets: [
      'Watch whether staff ask',
      'Watch how they ask',
      'Correct over-explaining quickly',
    ],
  },
];

export const PATHS: PathDefinition[] = [
  { key: 'team', label: 'Team Member', steps: TEAM_STEPS },
  { key: 'manager', label: 'Manager', steps: MANAGER_STEPS },
];
