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
  imageSrc?: string;
  imageAlt?: string;
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
        question: 'What is The Den Rewards program?',
        guestAnswer:
          'The Den Rewards is a free program where guests earn points on every visit and use them later for money off.',
        teamNote: 'Keep it simple: join, earn points, redeem later.',
      },
      {
        question: 'How do guests earn points, and what are they worth?',
        guestAnswer:
          'Guests earn 10 points for every $1 spent. Every 1,000 points equals $1.',
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
          'Points are ready on the next visit. They cannot be earned and redeemed the same day.',
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
          'The Den Rewards app is the best way to check points and view transactions. Guests will get a message with the link to download it. Receipt and loyalty account are backup options if needed.',
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
          'Points appear after checkout and are available on the next visit.',
      },
      {
        question: 'What if the guest wants to redeem but does not have enough points?',
        guestAnswer:
          'Tell them they are close and probably only need another visit or two.',
      },
      {
        question: 'What if the guest asks why they cannot redeem today?',
        guestAnswer:
          'Points are for the next visit so every guest earns rewards the same way.',
      },
      {
        question: 'What details are required for signup?',
        guestAnswer:
          'Use first name, last name, and phone number. Confirm enrollment and let the guest know a welcome text will be sent.',
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
    prompt: 'A guest says, "No thanks," and reaches for their card. What should you do?',
    options: [
      {
        text: 'That\'s okay! Here is a QR code if you\'d like to sign up later.',
        correct: true,
        feedback: 'Correct. That matches the guide and keeps the interaction smooth.',
      },
      {
        text: 'I can give you a quick overview of the program if you want to hear it.',
        correct: false,
        feedback: 'Not correct. You kept explaining after a no, which slows the line and feels pushy. Give the QR code and move on.',
      },
      {
        text: 'Are you sure? It only takes a second if you want to look at it.',
        correct: false,
        feedback: 'Not correct. That keeps pressure on after the guest declined. Stay brief, offer the QR code, and continue the transaction.',
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
      'The line is building and the guest is already halfway through paying. What should you do?',
    options: [
      {
        text: 'We just launched our new loyalty program. You get 5,000 bonus points when you sign up before April 30. Here is a QR code if you\'d like to join.',
        correct: true,
        feedback: 'Correct. That is the guide-based busy-line version.',
      },
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
        text: 'Keep it natural and conversational.',
        correct: true,
        feedback: 'Correct. That is the tone standard from the guide.',
      },
      {
        text: 'Add a little more enthusiasm so the guest feels the offer matters.',
        correct: false,
        feedback: 'Not correct. Extra enthusiasm can sound salesy and awkward. Keep the invite natural and easy to hear.',
      },
      {
        text: 'Lead with the tiers and bonus details before you make the ask.',
        correct: false,
        feedback: 'Not correct. You led with details instead of the ask, which makes the pitch harder to follow. Start with the invitation first.',
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
    id: 'pos-enrollment-lookup',
    module: 'pos',
    kind: 'brief',
    eyebrow: 'Signup, Earn, Redeem',
    title: 'Add customer to cart',
    summary:
      'Start enrollment by finding the customer from the cart screen.',
    mediaPlaceholders: [
      {
        title: 'Add customer to cart',
        body: 'Use this when showing how to find and add a customer from the cart screen.',
        imageSrc: '/pos/2026-03-26-13-01-03-pos-main.png',
        imageAlt: 'Add Customer to Cart dialog',
      },
      {
        title: 'Open customer menu',
        body: 'Use this when pointing out where the customer tools live on the main POS screen.',
        imageSrc: '/pos/2026-03-26-13-04-35-pos-main.png',
        imageAlt: 'POS main screen with customer tools',
      },
    ],
  },
  {
    id: 'pos-enrollment-details',
    module: 'pos',
    kind: 'brief',
    eyebrow: 'Signup, Earn, Redeem',
    title: 'Add customer details',
    summary:
      'Use the customer details form to collect the required signup information.',
    mediaPlaceholders: [
      {
        title: 'Add customer details',
        body: 'Use this for the form fields staff need to complete during signup.',
        imageSrc: '/pos/2026-03-26-13-02-55-pos-main.png',
        imageAlt: 'Add customer details form',
      },
    ],
    coachNote:
      'First name, last name, and phone number are required.',
  },
  {
    id: 'pos-enrollment',
    module: 'pos',
    kind: 'checklist',
    eyebrow: 'Signup, Earn, Redeem',
    title: 'Enrollment steps',
    summary:
      'Use the same workflow every time so signup stays fast and consistent.',
    script:
      'I\'ll just get your first and last name and your phone number to get you set up. You\'ll get a message with a link to the Den Rewards app, and that\'s the easiest way to keep track of your points and transactions.',
    checklist: [
      'Invite guest to join',
      'Open customer menu on left hand menu',
      'Click customer button',
      'Enter first and last name plus phone',
      'Confirm enrollment',
      'Mention welcome text will be sent',
      'Thank them',
    ],
    coachNote:
      'Keep it brief and confident while the guest enters information. Let them know the next step is a message with the app download link, and that the app is the best place to see points and transactions. First name, last name, and phone number are required.',
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
        text: 'Guests earn 10 points for every $1, and 1,000 points equals $1 in rewards.',
        correct: true,
        feedback: 'Correct. That is the core point value language.',
      },
      {
        text: 'Guests earn 10 points for every $1, and 100 points equals $10 in rewards.',
        correct: false,
        feedback: 'Not correct. That changes the reward math and could mislead the guest. Keep the simple value: 10 points per $1, 1,000 points equals $1.',
      },
      {
        text: 'Guests redeem 1,000 points for $5 off.',
        correct: false,
        feedback: 'Not correct. That overstates the reward and would create confusion. Keep the point-to-dollar value exact.',
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
      'A guest agrees to sign up and hands over their ID. What information do you need to collect to get them enrolled?',
    options: [
      {
        text: 'First name, last name, and phone number.',
        correct: true,
        feedback: 'Correct. Those are the required enrollment details in the guide.',
      },
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
    ],
  },
  {
    id: 'account-intro',
    module: 'account',
    kind: 'brief',
    eyebrow: 'Account Management',
    title: 'Account access',
    summary:
      'After signup, send guests to the Den Rewards app first. It is the best way to check points and transactions, and guests will get a message with the download link.',
    bullets: [
      'Den Rewards app is the primary recommendation',
      'Guests receive a message with the app download link',
      'Wallet pass and web wallet are secondary fallback options',
      'Receipt balance is available if needed',
    ],
  },
  {
    id: 'account-native-app',
    module: 'account',
    kind: 'brief',
    eyebrow: 'Account Management',
    title: 'Recommend the App First',
    summary:
      'Lead with the app first. It is the easiest way to see points and transactions.',
    script:
      'The best way to track your points and see your transactions is in the Den Rewards app. You\'ll get a message with a link to download it.',
    bullets: [
      'Use this as the first recommendation for rewards activity',
      'Keep the tone natural at the till',
    ],
    mediaPlaceholders: [
      {
        title: 'Add customer details',
        body: 'Use this for the form fields staff need to complete during signup.',
        imageSrc: '/pos/2026-03-26-13-02-55-pos-main.png',
        imageAlt: 'Add customer details form',
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
      'Use wallet pass only if the guest does not want the app.',
    bullets: [
      'Position it as a fallback option',
      'Use it for quick lookup at checkout',
      'Point guests to setup help only when needed',
    ],
    mediaPlaceholders: [
      {
        title: 'Tender and payment',
        body: 'Use this to show where loyalty points or other tender options appear in the checkout flow.',
        imageSrc: '/pos/2026-03-26-13-05-07-pos-main.png',
        imageAlt: 'Checkout payment method selection screen',
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
      'Use the web wallet only when the guest does not want the app or wallet pass.',
    bullets: [
      'Use it to view points, transactions, rewards, and account details',
      'Position it as the fallback access option',
      'Escalate technical questions to the store manager when needed',
    ],
    mediaPlaceholders: [
      {
        title: 'Product and SKU',
        body: 'Use this when showing the main POS item list and item lookup layout.',
        imageSrc: '/pos/2026-03-26-13-04-35-pos-main.png',
        imageAlt: 'POS product search and item list screen',
      },
    ],
  },
  {
    id: 'account-access-check',
    module: 'account',
    kind: 'scenario',
    eyebrow: 'Account Management',
    title: 'Module quiz',
    summary: 'Give a clear app-first answer when a guest asks how to check later.',
    prompt:
      'A guest asks how they can check their points later while you are ringing them through. What should the team member say?',
    options: [
      {
        text: 'The Den Rewards app is the best way to check your points and transactions. You will receive a message with the link to download it.',
        correct: true,
        feedback: 'Correct. That leads with the app, keeps the explanation simple, and points the guest to the download message.',
      },
      {
        text: 'You can check your receipt or loyalty account later if you need to.',
        correct: false,
        feedback: 'Not correct. That starts with fallback options and sounds too vague. Lead with the app first and keep the rest brief.',
      },
      {
        text: 'You may need to wait until after checkout, then we can look it up for you.',
        correct: false,
        feedback: 'Not correct. That delays the answer and misses the app-first guidance. Tell them about the app and the download message right away.',
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
      'A guest wants to check their rewards activity and asks what they should use. Which option should staff position first?',
    options: [
      {
        text: 'The Cascadia Den Rewards App.',
        correct: true,
        feedback: 'Correct. The app is the primary account-management option and the best place to check points and transactions.',
      },
      {
        text: 'The wallet pass is probably the fastest option.',
        correct: false,
        feedback: 'Not correct. That puts a fallback ahead of the app and weakens the recommendation. Start with the app, then offer wallet pass if needed.',
      },
      {
        text: 'The web wallet is the easiest way to get started.',
        correct: false,
        feedback: 'Not correct. That promotes a fallback as the first choice. Recommend the app first and keep web wallet as backup.',
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
      'A guest is stuck while setting up the app or wallet after checkout. What should staff do?',
    options: [
      {
        text: 'Escalate the technical question to the store manager when needed.',
        correct: true,
        feedback: 'Correct. That matches the training guidance for technical help.',
      },
      {
        text: 'Try a couple of basic steps and see if it resolves the issue.',
        correct: false,
        feedback: 'Not correct. Guessing at fixes can confuse the guest and waste time. Escalate to the manager when it needs deeper help.',
      },
      {
        text: 'Tell the guest you will need to ask someone who knows the setup better.',
        correct: false,
        feedback: 'Not correct. That avoids the issue but does not give the guest a clear next step. Route it to the manager directly.',
      },
    ],
  },
  {
    id: 'account-module-quiz-4',
    module: 'account',
    kind: 'scenario',
    eyebrow: 'Account Management',
    title: 'Final scenario',
    summary:
      'Use everything together in one short checkout conversation.',
    prompt:
      'A guest says yes to joining while the line builds behind them. They ask how many points they will earn today and whether they can use them right away. What should you say?',
    options: [
      {
        text: 'You\'ll earn 10 points for every $1 spent, and the points are ready to use on a future visit. You\'ll get a message with a link to download the Den Rewards app, and that\'s the best way to track your points and transactions.',
        correct: true,
        feedback: 'Correct. That keeps the answer clear, app-first, and easy to use at the till.',
      },
      {
        text: 'You\'ll get about $1 back for every $100, and I can show you the rest on your receipt after checkout.',
        correct: false,
        feedback: 'Not correct. That sounds uncertain and shifts the focus away from the app. Lead with the simple value and the download message.',
      },
      {
        text: 'You can use the points right away once the app link comes through, so I\'d download it now and apply them today.',
        correct: false,
        feedback: 'Not correct. That gives the guest the wrong timing for redemption. Keep it accurate: points are for a future visit, and the app is best for tracking.',
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
      'Finish training so your store can track who is ready. Invite once, keep it brief, do not push after a no, and recommend the app first.',
    checklist: [
      'I know the standard invitation',
      'I know what to say when a guest says no',
      'I know the short version for busy periods',
      'I know the steps to enroll a guest',
      'I know the Den Rewards app is the first recommendation for account access',
      'I know guests receive a message with the app download link',
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
