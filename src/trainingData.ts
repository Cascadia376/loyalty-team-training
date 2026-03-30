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
  }
> = {
  basics: {
    label: 'Loyalty Basics',
    shortLabel: 'Basics',
    description: 'Invitation, responses, and quick tips.',
    icon: Wallet,
  },
  pos: {
    label: 'Signup, Earn, Redeem',
    shortLabel: 'POS',
    description: 'Points, tiers, redemption, and enrollment steps.',
    icon: Store,
  },
  account: {
    label: 'Account Management',
    shortLabel: 'Account',
    description: 'Where guests can view points and rewards after signup.',
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
          'The Den Rewards lets guests earn points every time they shop and use those points for money off a future visit.',
        teamNote: 'Keep it simple: join, earn points, redeem later.',
      },
      {
        question: 'How do guests earn points, and what are they worth?',
        guestAnswer:
          'Guests earn 10 points for every $1 spent. Every 1,000 points equals $1 in rewards.',
        teamNote:
          'A simple shortcut is "about $1 back for every $100 spent." Avoid detailed math unless asked.',
      },
      {
        question: 'What are the tiers?',
        guestAnswer:
          'Cub earns 10 points per dollar, Black Bear earns 12 points per dollar, and Grizzly earns 15 points per dollar.',
      },
      {
        question: 'How long does a tier last?',
        guestAnswer: 'Once a guest reaches a tier, they keep that status for a full year.',
      },
      {
        question: 'Is there a signup bonus?',
        guestAnswer:
          'Yes. From April 17 to April 30, new members get 5,000 bonus points.',
      },
      {
        question: 'Do points expire?',
        guestAnswer:
          'Points stay active as long as the account stays active. If there is no activity for two years, the account expires.',
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
      {
        question: 'What if a guest forgot they were a member?',
        guestAnswer: 'Look up the account using the guest\'s phone number.',
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
        question: 'What if the guest asks why they cannot redeem today?',
        guestAnswer:
          'Points activate for the next visit so everyone earns rewards the same way.',
      },
      {
        question: 'What details are required for signup?',
        guestAnswer:
          'Use first name, last name, and phone number, then confirm enrollment and let the guest know a welcome text will be sent.',
      },
    ],
  },
  {
    title: 'How To Talk About It',
    items: [
      {
        question: 'What is the best checkout invitation?',
        guestAnswer:
          'Use the standard invitation: "Have you signed up for our new loyalty program? From April 17 - 30 only, new members get 5,000 bonus points. Can I set that up for you?"',
        teamNote: 'Keep it natural and conversational, not salesy.',
      },
      {
        question: 'What should I say when the store is busy?',
        guestAnswer:
          'Use the short version: "We just launched our new loyalty program. You get 5,000 bonus points when you sign up before April 30. Here is a QR code if you\'d like to join."',
      },
      {
        question: 'What should I say if the guest says no?',
        guestAnswer:
          'Say: "That\'s okay! Here is a QR code if you\'d like to sign up later."',
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
      'Have you signed up for our new loyalty program? From April 17 - 30 only, new members get 5,000 bonus points. Can I set that up for you?',
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
    id: 'basics-quick-tips',
    module: 'basics',
    kind: 'brief',
    eyebrow: 'Loyalty Basics',
    title: 'Quick tips',
    summary:
      'A few habits make the launch easier: stay conversational, wait for the answer, and use the short version when needed.',
    bullets: [
      'Keep it natural - conversational, not salesy',
      'Wait for the answer - do not rush past the pause',
      'Bonus ends soon - April 30',
    ],
    script:
      'We just launched our new loyalty program. You get 5,000 bonus points when you sign up before April 30. Here is a QR code if you\'d like to join.',
  },
  {
    id: 'basics-response-check',
    module: 'basics',
    kind: 'scenario',
    eyebrow: 'Loyalty Basics',
    title: 'Use the clean exit',
    summary:
      'When the guest says no, keep the interaction positive and keep the line moving.',
    prompt: 'The guest says, "No thanks." What should you say next?',
    options: [
      {
        text: 'That\'s okay! Here is a QR code if you\'d like to sign up later.',
        correct: true,
        feedback: 'Correct. That matches the guide and keeps the interaction smooth.',
      },
      {
        text: 'Let me quickly explain the tiers before you decide.',
        correct: false,
        feedback: 'Not correct. Do not push for a second conversation after a no.',
      },
      {
        text: 'Are you sure? It only takes a second.',
        correct: false,
        feedback: 'Not correct. The standard is no pressure and a clean exit.',
      },
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
      'Use tiers as supporting context, not the main pitch. Lead with the invitation and reward value.',
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
      { label: 'Redemption', value: '5,000 pts = $5 off', note: '10,000 pts = $10 off' },
    ],
    bullets: [
      'Guests earn points today and use them on a future visit',
      'Use simple value language first',
      'Phone number is the fastest account lookup',
    ],
  },
  {
    id: 'pos-enrollment',
    module: 'pos',
    kind: 'checklist',
    eyebrow: 'Signup, Earn, Redeem',
    title: 'Enrollment steps',
    summary:
      'Use the same workflow every time so signup stays fast and consistent.',
    checklist: [
      'Invite guest to join',
      'Open customer menu on left hand menu',
      'Click customer button',
      'Enter first and last name plus phone',
      'Confirm enrollment',
      'Mention welcome text will be sent',
      'Thank them',
    ],
    mediaPlaceholders: [
      {
        title: 'Enrollment screenshots',
        body: 'Add the customer-menu, customer-button, and enrollment screenshots here.',
      },
    ],
    coachNote:
      'This matches the one-page guide. First name, last name, and phone number are required.',
  },
  {
    id: 'pos-busy-check',
    module: 'pos',
    kind: 'scenario',
    eyebrow: 'Signup, Earn, Redeem',
    title: 'When it\'s busy',
    summary:
      'Use the short version when there is a line and no backup available.',
    script:
      'We just launched our new loyalty program. You get 5,000 bonus points when you sign up before April 30. Here is a QR code if you\'d like to join.',
    prompt: 'There are four people in line and no backup. What is the right move?',
    options: [
      {
        text: 'Use the short busy-line script and keep the transaction moving.',
        correct: true,
        feedback: 'Correct. That matches the guide and protects line speed.',
      },
      {
        text: 'Skip the invitation completely until the line is gone.',
        correct: false,
        feedback: 'Not correct. The guide still calls for a short invitation when it is busy.',
      },
      {
        text: 'Give the full invitation and full explanation to every guest.',
        correct: false,
        feedback: 'Not correct. Use the shorter version when speed matters.',
      },
    ],
    coachNote: 'The standard is still to invite. The only change is the shorter script.',
  },
  {
    id: 'account-intro',
    module: 'account',
    kind: 'brief',
    eyebrow: 'Account Management',
    title: 'Account access',
    summary:
      'After signup, guests may ask where they can view their points or rewards. Keep the answer practical and simple.',
    bullets: ['Receipt balance', 'Web wallet', 'Wallet pass', 'Native app'],
  },
  {
    id: 'account-web-wallet',
    module: 'account',
    kind: 'brief',
    eyebrow: 'Account Management',
    title: 'Web wallet',
    summary:
      'Use the web wallet as the simplest account-access option for guests who do not want the app.',
    bullets: [
      'Use it to view points, rewards, and account details',
      'Position it as the easiest fallback option',
      'Keep staff language focused on access, not troubleshooting',
    ],
    mediaPlaceholders: [
      {
        title: 'Web wallet screenshots',
        body: 'Add screenshots for points balance, rewards, and profile access here.',
      },
    ],
  },
  {
    id: 'account-wallet-pass',
    module: 'account',
    kind: 'brief',
    eyebrow: 'Account Management',
    title: 'Wallet pass',
    summary:
      'Use wallet pass as the simple grab-and-go option when guests want quick access on their phone.',
    bullets: [
      'Position it as the easy-access option',
      'Use it for quick lookup at checkout',
      'Point guests to setup help only when needed',
    ],
    mediaPlaceholders: [
      {
        title: 'Wallet pass screenshots',
        body: 'Add Apple Wallet and Google Wallet setup visuals here.',
      },
    ],
  },
  {
    id: 'account-native-app',
    module: 'account',
    kind: 'brief',
    eyebrow: 'Account Management',
    title: 'Native app',
    summary:
      'If the guest prefers the app, keep the explanation focused on checking rewards and account access.',
    bullets: [
      'Use the app for rewards visibility and account access',
      'Keep the explanation short and action-oriented',
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
    summary: 'Give the fastest accurate answer when a guest asks where to check later.',
    prompt:
      'A guest asks where they can check their points later. What should the team member say?',
    options: [
      {
        text: 'Your points balance appears on your receipt and can also be viewed through your loyalty account.',
        correct: true,
        feedback: 'Correct. That keeps the answer practical and aligned to the training.',
      },
      {
        text: 'You need to wait for a manager to print a points report for you.',
        correct: false,
        feedback: 'Not correct. Guests should be directed to their own account access.',
      },
      {
        text: 'There is no way to check points until you redeem them.',
        correct: false,
        feedback: 'Not correct. Guests can view their balance after signup.',
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
      'Finish the training so your store can track who is ready. Your score is based on first-attempt knowledge checks.',
    checklist: [
      'I can use the invitation confidently',
      'I can handle yes, no, and busy-line situations',
      'I know the enrollment steps and reward basics',
      'I know where guests can check points and rewards later',
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
      'Managers should reinforce the invitation, the yes or no response, and line-speed discipline.',
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
