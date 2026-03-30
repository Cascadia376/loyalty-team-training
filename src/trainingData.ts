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
    id: 'basics-response-check',
    module: 'basics',
    kind: 'scenario',
    eyebrow: 'Loyalty Basics',
    title: 'If the guest says no',
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
    id: 'basics-when-busy',
    module: 'basics',
    kind: 'brief',
    eyebrow: 'Loyalty Basics',
    title: 'When it\'s busy',
    summary:
      'Use the short version when there is a line and you need to keep the transaction moving.',
    script:
      'We just launched our new loyalty program. You get 5,000 bonus points when you sign up before April 30. Here is a QR code if you\'d like to join.',
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
      'Bonus ends soon - April 30',
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
      'The line is building and you need the short version. Which script is right?',
    options: [
      {
        text: 'We just launched our new loyalty program. You get 5,000 bonus points when you sign up before April 30. Here is a QR code if you\'d like to join.',
        correct: true,
        feedback: 'Correct. That is the guide-based busy-line version.',
      },
      {
        text: 'Let me walk you through the tiers first so you can decide.',
        correct: false,
        feedback: 'Not correct. That is too long for a busy checkout moment.',
      },
      {
        text: 'Skip loyalty entirely whenever there is a line.',
        correct: false,
        feedback: 'Not correct. The standard is still to invite, just with the short version.',
      },
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
      'Which reminder best matches the Quick Tips slide?',
    options: [
      {
        text: 'Wait for the answer. Give guests time to think.',
        correct: true,
        feedback: 'Correct. That is the right behavior at the till.',
      },
      {
        text: 'Move quickly into the next sentence so there is no awkward pause.',
        correct: false,
        feedback: 'Not correct. The guest needs a moment to answer.',
      },
      {
        text: 'Push a little harder if the guest does not answer right away.',
        correct: false,
        feedback: 'Not correct. The standard is calm, natural, and low pressure.',
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
      'Which coaching direction is right for this launch ask?',
    options: [
      {
        text: 'Keep it natural and conversational.',
        correct: true,
        feedback: 'Correct. That is the tone standard from the guide.',
      },
      {
        text: 'Sound more salesy so the guest feels urgency.',
        correct: false,
        feedback: 'Not correct. The ask should stay natural, not salesy.',
      },
      {
        text: 'Lead with all the tier details before asking.',
        correct: false,
        feedback: 'Not correct. Lead with the invitation, not a long explanation.',
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
    title: 'Module quiz',
    summary:
      'Close the module by choosing the right move for a busy checkout moment.',
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
    id: 'pos-module-quiz-2',
    module: 'pos',
    kind: 'scenario',
    eyebrow: 'Signup, Earn, Redeem',
    title: 'Module quiz',
    summary:
      'Check the key value language before moving on.',
    prompt:
      'Which value statement is correct?',
    options: [
      {
        text: 'Guests earn 10 points for every $1, and 1,000 points equals $1 in rewards.',
        correct: true,
        feedback: 'Correct. That is the core point value language.',
      },
      {
        text: 'Guests earn 1 point for every $10, and 100 points equals $1 in rewards.',
        correct: false,
        feedback: 'Not correct. That changes both the earn rate and redemption value.',
      },
      {
        text: 'Guests redeem 1,000 points for $10 off.',
        correct: false,
        feedback: 'Not correct. 1,000 points equals $1, not $10.',
      },
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
      'Which set of guest details is required during enrollment?',
    options: [
      {
        text: 'First name, last name, and phone number.',
        correct: true,
        feedback: 'Correct. Those are the required enrollment details in the guide.',
      },
      {
        text: 'Email address only.',
        correct: false,
        feedback: 'Not correct. The workflow uses first name, last name, and phone number.',
      },
      {
        text: 'Phone number and home address.',
        correct: false,
        feedback: 'Not correct. Home address is not part of the signup steps here.',
      },
    ],
  },
  {
    id: 'account-intro',
    module: 'account',
    kind: 'brief',
    eyebrow: 'Account Management',
    title: 'Account access',
    summary:
      'After signup, guide guests to the best access option first, then use wallet pass or web wallet as backups.',
    bullets: [
      'Cascadia Den Rewards App',
      'Wallet pass',
      'Web wallet',
      'Receipt balance',
    ],
  },
  {
    id: 'account-native-app',
    module: 'account',
    kind: 'brief',
    eyebrow: 'Account Management',
    title: 'Cascadia Den Rewards App',
    summary:
      'Lead with the app as the main loyalty destination for guests who want the full rewards experience.',
    bullets: [
      'Use it for rewards visibility and account access',
      'Position it as the best overall loyalty experience',
      'Keep the explanation short and action-oriented',
    ],
    mediaPlaceholders: [
      {
        title: 'App screenshots',
        body: 'Add app home, rewards, and account screenshots here.',
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
      'Use wallet pass as the next-best option when guests want quick phone access without using the app.',
    bullets: [
      'Position it as the next-best easy-access option',
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
    id: 'account-web-wallet',
    module: 'account',
    kind: 'brief',
    eyebrow: 'Account Management',
    title: 'Web wallet',
    summary:
      'Use the web wallet as the fallback option when the guest does not want the app or wallet pass.',
    bullets: [
      'Use it to view points, rewards, and account details',
      'Position it as the fallback access option',
      'Escalate technical questions to the store manager when needed',
    ],
    mediaPlaceholders: [
      {
        title: 'Web wallet screenshots',
        body: 'Add screenshots for points balance, rewards, and profile access here.',
      },
    ],
  },
  {
    id: 'account-access-check',
    module: 'account',
    kind: 'scenario',
    eyebrow: 'Account Management',
    title: 'Module quiz',
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
    id: 'account-module-quiz-2',
    module: 'account',
    kind: 'scenario',
    eyebrow: 'Account Management',
    title: 'Module quiz',
    summary:
      'Keep post-signup guidance practical and easy to follow.',
    prompt:
      'Which option should staff position first for guests who want the best loyalty experience?',
    options: [
      {
        text: 'The Cascadia Den Rewards App.',
        correct: true,
        feedback: 'Correct. The app is the primary account-management option.',
      },
      {
        text: 'The wallet pass only.',
        correct: false,
        feedback: 'Not correct. Wallet pass is useful, but the app is the preferred option.',
      },
      {
        text: 'The web wallet only.',
        correct: false,
        feedback: 'Not correct. The web wallet is a fallback, not the first choice.',
      },
    ],
  },
  {
    id: 'account-module-quiz-3',
    module: 'account',
    kind: 'scenario',
    eyebrow: 'Account Management',
    title: 'Module quiz',
    summary:
      'Finish by choosing the right staff response to technical questions.',
    prompt:
      'What should staff do if a guest needs deeper technical help with the app or wallet setup?',
    options: [
      {
        text: 'Escalate the technical question to the store manager when needed.',
        correct: true,
        feedback: 'Correct. That matches the training guidance for technical help.',
      },
      {
        text: 'Guess the steps and walk the guest through them anyway.',
        correct: false,
        feedback: 'Not correct. Do not improvise technical troubleshooting you are unsure about.',
      },
      {
        text: 'Tell the guest there is no support for account access.',
        correct: false,
        feedback: 'Not correct. There is support, and the manager is the escalation path.',
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
