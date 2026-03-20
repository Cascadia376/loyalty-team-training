import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Circle,
  ClipboardList,
  Crown,
  MessageSquareQuote,
  ShieldCheck,
  Store,
  Users,
} from 'lucide-react';

type PathKey = 'team' | 'manager';
type StepKind = 'brief' | 'script' | 'scenario' | 'checklist' | 'signoff';

interface ScenarioOption {
  text: string;
  correct: boolean;
  feedback: string;
}

interface Step {
  id: string;
  kind: StepKind;
  eyebrow: string;
  title: string;
  summary: string;
  script?: string;
  bullets?: string[];
  highlights?: { label: string; value: string; note?: string }[];
  checklist?: string[];
  prompt?: string;
  options?: ScenarioOption[];
  coachNote?: string;
}

interface PathDefinition {
  key: PathKey;
  label: string;
  kicker: string;
  description: string;
  icon: typeof Users;
  completionLabel: string;
  steps: Step[];
}

interface StoredState {
  activePath: PathKey | null;
  currentStepByPath: Record<PathKey, number>;
  scenarioAnswers: Record<string, number>;
  checklistState: Record<string, string[]>;
  acknowledgedSteps: string[];
  completedPaths: PathKey[];
}

const PATHS: PathDefinition[] = [
  {
    key: 'team',
    label: 'Team Member',
    kicker: 'Floor-ready training',
    description:
      'Learn the exact invitation, the fast response flow, and how to keep the till moving.',
    icon: Users,
    completionLabel: 'Floor Ready',
    steps: [
      {
        id: 'team-why',
        kind: 'brief',
        eyebrow: 'Why This Matters',
        title: 'Build the automatic choice.',
        summary:
          'The Den is not just a points program. It gives guests a reason to choose Cascadia again and again.',
        bullets: [
          'Invite every guest',
          'Keep the ask calm and clear',
          'Focus on consistency, not conversion',
        ],
        highlights: [
          {
            label: 'Launch incentive',
            value: '5,000 bonus points',
            note: 'Available until April 17',
          },
          {
            label: 'Base earn',
            value: '10 pts / $1',
            note: 'Higher tiers increase earn rate',
          },
          {
            label: 'Reward value',
            value: '1,000 pts = $1',
            note: 'Redeem at checkout',
          },
        ],
      },
      {
        id: 'team-script',
        kind: 'script',
        eyebrow: 'What To Say',
        title: 'Use the launch script exactly like this.',
        summary:
          'This is the behavior to repeat. Short. Natural. Confident.',
        script:
          'Are you a member of our new loyalty program? Until April 17, new members get 5,000 bonus points. Can I set that up for you?',
        bullets: [
          'Do not over-explain',
          'Do not apologize for asking',
          'Pause and let the guest answer',
        ],
        checklist: [
          'I read the script out loud once',
          'I can deliver it without adding extra detail',
        ],
        coachNote:
          'A good script delivery sounds calm, not salesy. Let the guest decide.',
      },
      {
        id: 'team-no',
        kind: 'scenario',
        eyebrow: 'If They Say No',
        title: 'A clean exit is part of success.',
        summary:
          'A no does not mean failure. The standard is a respectful exit with no pressure.',
        prompt: 'The guest says, “No thanks.” What should you say next?',
        options: [
          {
            text: 'Explain the tiers and bonus points in more detail',
            correct: false,
            feedback:
              'Not correct. The training standard is no pressure and no second attempt.',
          },
          {
            text: "That's okay. If you decide to later, there's a QR code you can use.",
            correct: true,
            feedback:
              'Correct. That keeps the interaction smooth and protects the guest experience.',
          },
          {
            text: 'Ask again after payment to make sure they understood',
            correct: false,
            feedback:
              'Not correct. A second attempt creates pressure and slows the transaction.',
          },
        ],
        coachNote: 'No pressure. No awkward pause. Move on cleanly.',
      },
      {
        id: 'team-busy',
        kind: 'scenario',
        eyebrow: 'Busy Line Protocol',
        title: 'Protect speed when the line builds.',
        summary:
          'You still invite the guest, but you use the short version when the line is growing.',
        script:
          'For the first two weeks only, new members get 5,000 bonus points. You can scan this QR code to join now, or next time you are in the store.',
        prompt:
          'There are four people in line and no backup. What is the right move?',
        options: [
          {
            text: 'Stop mentioning loyalty until the rush is over',
            correct: false,
            feedback:
              'Not correct. The behavior is still to invite, just with a shorter version.',
          },
          {
            text: 'Use the busy line script and keep the transaction moving',
            correct: true,
            feedback:
              'Correct. Service speed and a short invitation can coexist.',
          },
          {
            text: 'Give the full script and full explanation to every guest',
            correct: false,
            feedback:
              'Not correct. The line-speed constraint changes how much you say.',
          },
        ],
        coachNote:
          'The goal is not perfect explanation. The goal is a fast, clear invitation.',
      },
      {
        id: 'team-yes',
        kind: 'checklist',
        eyebrow: 'If They Say Yes',
        title: 'Move directly into enrollment.',
        summary:
          'Yes should feel smooth. Keep the flow tight and accurate.',
        checklist: [
          'Open the customer menu',
          'Select add customer',
          'Enter the guest details carefully',
          'Confirm marketing consent',
          'Save the profile and continue the sale',
        ],
        bullets: [
          'Phone number is the best primary identifier',
          'Keep the guest informed without adding friction',
          'Do not let enrollment stall the line',
        ],
        coachNote:
          'Confidence builds trust. Hesitation makes the guest question the process.',
      },
      {
        id: 'team-signoff',
        kind: 'signoff',
        eyebrow: 'Manager Check',
        title: 'Pass the floor-ready standard.',
        summary:
          'You are ready when you can deliver the script, handle yes/no cleanly, and keep the transaction moving.',
        checklist: [
          'I can deliver the invitation without reading',
          'I know the clean no-response',
          'I know when to use busy line protocol',
          'I can move into enrollment smoothly',
        ],
      },
    ],
  },
  {
    key: 'manager',
    label: 'Manager',
    kicker: 'Coaching tool',
    description:
      'Run a fast huddle, observe the right behaviors, and reinforce the launch standard daily.',
    icon: Crown,
    completionLabel: 'Coach Ready',
    steps: [
      {
        id: 'manager-standard',
        kind: 'brief',
        eyebrow: 'Manager Standard',
        title: 'Coach the behavior, not the theory.',
        summary:
          'Managers do not need staff to memorize everything. They need staff to ask every guest and handle the response cleanly.',
        bullets: [
          'Watch whether they ask',
          'Watch how they ask',
          'Correct over-explaining immediately',
        ],
        highlights: [
          {
            label: 'Roadshow',
            value: 'March 16 to April 1',
          },
          {
            label: 'Launch week',
            value: 'April 3 to April 10',
          },
          {
            label: 'Bonus window',
            value: 'Until April 17',
          },
        ],
      },
      {
        id: 'manager-huddle',
        kind: 'checklist',
        eyebrow: '3-Minute Huddle',
        title: 'Run this before the shift.',
        summary:
          'Use a repeatable huddle so every team member hears the same message.',
        checklist: [
          'Reinforce the exact invitation script',
          'Role-play one yes response',
          'Role-play one no response',
          'Review busy line protocol',
          'Set the expectation: invite every guest',
        ],
        coachNote:
          'Keep the huddle practical. This is not a presentation. It is a behavior reset.',
      },
      {
        id: 'manager-observe',
        kind: 'scenario',
        eyebrow: 'Live Observation',
        title: 'Know what to correct on the floor.',
        summary:
          'Pick the issue you should coach first when you hear weak loyalty delivery.',
        prompt:
          'A team member asks the script but then keeps talking for 20 seconds about points and tiers. What is the first coaching correction?',
        options: [
          {
            text: 'Tell them to stop asking guests who look rushed',
            correct: false,
            feedback:
              'Not correct. The ask should still happen consistently.',
          },
          {
            text: 'Coach them to shorten the script and let the guest answer',
            correct: true,
            feedback:
              'Correct. Over-explaining is one of the biggest execution risks.',
          },
          {
            text: 'Tell them to only mention loyalty to regular guests',
            correct: false,
            feedback:
              'Not correct. The expectation is to invite every guest.',
          },
        ],
        coachNote:
          'Common issues: skipping the ask, over-explaining, apologetic tone, and weak exits.',
      },
      {
        id: 'manager-checklist',
        kind: 'checklist',
        eyebrow: 'Observation Checklist',
        title: 'Use these checks during launch week.',
        summary:
          'These are the behaviors worth inspecting in live transactions.',
        checklist: [
          'The team member asked every guest',
          'The invitation was short and confident',
          'They paused and allowed the guest to answer',
          'They handled no with no pressure',
          'They moved yes into enrollment smoothly',
          'They protected line speed',
        ],
      },
      {
        id: 'manager-signoff',
        kind: 'signoff',
        eyebrow: 'Coach Ready',
        title: 'Set the tone for adoption.',
        summary:
          'Managers make the rollout real by reinforcing the standard every day, not just on launch day.',
        checklist: [
          'I can run the 3-minute huddle',
          'I know the behaviors to correct first',
          'I will observe live transactions during launch',
          'I will reinforce the standard daily',
        ],
      },
    ],
  },
];

function getInitialState(): StoredState {
  return {
    activePath: 'team',
    currentStepByPath: { team: 0, manager: 0 },
    scenarioAnswers: {},
    checklistState: {},
    acknowledgedSteps: [],
    completedPaths: [],
  };
}

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [activePath, setActivePath] = useState<PathKey | null>(null);
  const [currentStepByPath, setCurrentStepByPath] = useState<Record<PathKey, number>>({
    team: 0,
    manager: 0,
  });
  const [scenarioAnswers, setScenarioAnswers] = useState<Record<string, number>>({});
  const [checklistState, setChecklistState] = useState<Record<string, string[]>>({});
  const [acknowledgedSteps, setAcknowledgedSteps] = useState<string[]>([]);
  const [completedPaths, setCompletedPaths] = useState<PathKey[]>([]);
  const [managerTapCount, setManagerTapCount] = useState(0);

  useEffect(() => {
    const initial = getInitialState();
    setActivePath(initial.activePath);
    setCurrentStepByPath(initial.currentStepByPath);
    setScenarioAnswers(initial.scenarioAnswers);
    setChecklistState(initial.checklistState);
    setAcknowledgedSteps(initial.acknowledgedSteps);
    setCompletedPaths(initial.completedPaths);
    setIsReady(true);
  }, []);

  const activeDefinition = useMemo(
    () => PATHS.find((path) => path.key === activePath) ?? null,
    [activePath],
  );

  const currentStepIndex = activeDefinition
    ? currentStepByPath[activeDefinition.key]
    : 0;

  const currentStep = activeDefinition?.steps[currentStepIndex] ?? null;

  if (!isReady) {
    return (
      <div className="app-shell">
        <div className="loading-card">
          <div className="loading-orb" />
          <p>Loading mobile training...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <div className="mobile-frame">
        <header className="topbar">
          <div>
            <button
              type="button"
              className="secret-trigger"
              onClick={() => {
                const nextCount = managerTapCount + 1;
                if (nextCount >= 5) {
                  setActivePath('manager');
                  setManagerTapCount(0);
                  return;
                }
                setManagerTapCount(nextCount);
              }}
            >
              <p className="topbar-kicker">The Den Rewards</p>
            </button>
            <h1 className="topbar-title">Mobile Training Tool</h1>
          </div>
        </header>

        {!activeDefinition || !currentStep ? (
          <HomeScreen
            completedPaths={completedPaths}
            onStartTraining={() => setActivePath('team')}
            onOpenManager={() => setActivePath('manager')}
          />
        ) : (
          <PathExperience
            path={activeDefinition}
            stepIndex={currentStepIndex}
            currentStep={currentStep}
            scenarioAnswers={scenarioAnswers}
            checklistState={checklistState}
            acknowledgedSteps={acknowledgedSteps}
            onBackToHome={() => setActivePath(null)}
            onScenarioAnswer={(stepId, answerIndex) => {
              setScenarioAnswers((current) => ({
                ...current,
                [stepId]: answerIndex,
              }));
            }}
            onToggleChecklist={(stepId, item) => {
              setChecklistState((current) => {
                const existing = current[stepId] ?? [];
                const nextItems = existing.includes(item)
                  ? existing.filter((entry) => entry !== item)
                  : [...existing, item];

                return {
                  ...current,
                  [stepId]: nextItems,
                };
              });
            }}
            onAcknowledge={(stepId) => {
              setAcknowledgedSteps((current) =>
                current.includes(stepId) ? current : [...current, stepId],
              );
            }}
            onPrev={() => {
              setCurrentStepByPath((current) => ({
                ...current,
                [activeDefinition.key]: Math.max(current[activeDefinition.key] - 1, 0),
              }));
            }}
            onNext={() => {
              const isLast = currentStepIndex === activeDefinition.steps.length - 1;

              if (isLast) {
                setCompletedPaths((current) =>
                  current.includes(activeDefinition.key)
                    ? current
                    : [...current, activeDefinition.key],
                );
                setActivePath(null);
                return;
              }

              setCurrentStepByPath((current) => ({
                ...current,
                [activeDefinition.key]: Math.min(
                  current[activeDefinition.key] + 1,
                  activeDefinition.steps.length - 1,
                ),
              }));
            }}
          />
        )}
      </div>
    </div>
  );
}

function HomeScreen({
  completedPaths,
  onStartTraining,
  onOpenManager,
}: {
  completedPaths: PathKey[];
  onStartTraining: () => void;
  onOpenManager: () => void;
}) {
  const teamPath = PATHS.find((path) => path.key === 'team');
  const teamComplete = completedPaths.includes('team');
  const managerComplete = completedPaths.includes('manager');

  if (!teamPath) {
    return null;
  }

  return (
    <main className="screen-content screen-content-home">
      <section className="hero-card">
        <div className="hero-brand-row">
          <img
            src="/logo.png"
            alt="Cascadia Liquor"
            className="hero-brand hero-brand-cascadia"
          />
          <img
            src="/The-Den_logo-brown.png"
            alt="The Den Rewards"
            className="hero-brand hero-brand-den"
          />
        </div>
        <p className="eyebrow">The Den Rewards</p>
        <h2 className="hero-title">Team Training</h2>
        <p className="hero-copy">
          Quick practice for launch week.
        </p>
        <div className="hero-art">
          <img
            src="/The-Den_Bears-All.png"
            alt="The Den bear family"
            className="hero-bears"
          />
          <img
            src="/The-Den_Bears-Black-Bear.png"
            alt=""
            aria-hidden="true"
            className="hero-bear-accent"
          />
        </div>
        <div className="hero-actions">
          <button type="button" className="hero-primary" onClick={onStartTraining}>
            Team Training
            <ArrowRight size={18} />
          </button>
          <div className="hero-meta">
            <span>{teamPath.steps.length} modules</span>
          </div>
        </div>
      </section>

      {managerComplete && (
        <button type="button" className="manager-return" onClick={onOpenManager}>
          Reopen manager tools
        </button>
      )}
    </main>
  );
}

function PathExperience({
  path,
  stepIndex,
  currentStep,
  scenarioAnswers,
  checklistState,
  acknowledgedSteps,
  onBackToHome,
  onScenarioAnswer,
  onToggleChecklist,
  onAcknowledge,
  onPrev,
  onNext,
}: {
  path: PathDefinition;
  stepIndex: number;
  currentStep: Step;
  scenarioAnswers: Record<string, number>;
  checklistState: Record<string, string[]>;
  acknowledgedSteps: string[];
  onBackToHome: () => void;
  onScenarioAnswer: (stepId: string, answerIndex: number) => void;
  onToggleChecklist: (stepId: string, item: string) => void;
  onAcknowledge: (stepId: string) => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const selectedAnswer =
    currentStep.kind === 'scenario'
      ? scenarioAnswers[currentStep.id]
      : undefined;

  const selectedOption =
    selectedAnswer !== undefined && currentStep.options
      ? currentStep.options[selectedAnswer]
      : undefined;

  const checkedItems = checklistState[currentStep.id] ?? [];
  const allChecklistItemsChecked =
    currentStep.checklist?.length
      ? currentStep.checklist.every((item) => checkedItems.includes(item))
      : false;

  const isAcknowledged = acknowledgedSteps.includes(currentStep.id);

  let canAdvance = true;
  if (currentStep.kind === 'scenario') {
    canAdvance = selectedOption?.correct ?? false;
  } else if (currentStep.kind === 'script') {
    canAdvance = allChecklistItemsChecked;
  } else if (currentStep.kind === 'checklist' || currentStep.kind === 'signoff') {
    canAdvance = allChecklistItemsChecked;
  } else if (currentStep.kind === 'brief') {
    canAdvance = isAcknowledged;
  }

  const progress = ((stepIndex + 1) / path.steps.length) * 100;
  const isLastStep = stepIndex === path.steps.length - 1;
  const stepIcon =
    path.key === 'team' ? <Store size={18} /> : <ClipboardList size={18} />;

  return (
    <>
      <div className="path-header">
        <button type="button" className="ghost-button" onClick={onBackToHome}>
          <ArrowLeft size={16} />
          All Paths
        </button>
        <div className="path-header-meta">
          <span className="mode-pill">
            {stepIcon}
            {path.label}
          </span>
          <span className="count-pill">
            {stepIndex + 1} / {path.steps.length}
          </span>
        </div>
      </div>

      <div className="progress-track">
        <motion.div
          className="progress-fill"
          initial={false}
          animate={{ width: `${progress}%` }}
        />
      </div>

      <main className="screen-content">
        <AnimatePresence mode="wait">
          <motion.section
            key={currentStep.id}
            className="module-card"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <div className="module-heading">
              <p className="eyebrow">{currentStep.eyebrow}</p>
              <h2 className="module-title">{currentStep.title}</h2>
              <p className="module-summary">{currentStep.summary}</p>
            </div>

            {currentStep.highlights && (
              <div className="highlight-grid">
                {currentStep.highlights.map((item) => (
                  <div key={item.label} className="highlight-card">
                    <p className="highlight-label">{item.label}</p>
                    <p className="highlight-value">{item.value}</p>
                    {item.note && <p className="highlight-note">{item.note}</p>}
                  </div>
                ))}
              </div>
            )}

            {currentStep.script && (
              <div className="script-card">
                <MessageSquareQuote size={18} className="script-icon" />
                <p>{currentStep.script}</p>
              </div>
            )}

            {currentStep.bullets && (
              <ul className="bullet-list bullet-list-card">
                {currentStep.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}

            {currentStep.kind === 'brief' && (
              <button
                type="button"
                className={`action-tile ${isAcknowledged ? 'action-tile-complete' : ''}`}
                onClick={() => onAcknowledge(currentStep.id)}
              >
                <CheckCircle2 size={18} />
                <span>{isAcknowledged ? 'Module reviewed' : 'Mark as understood'}</span>
              </button>
            )}

            {currentStep.kind === 'scenario' && currentStep.prompt && currentStep.options && (
              <ScenarioCard
                step={currentStep}
                selectedAnswer={selectedAnswer}
                selectedOption={selectedOption}
                onScenarioAnswer={onScenarioAnswer}
              />
            )}

            {currentStep.checklist && (
              <ChecklistCard
                stepId={currentStep.id}
                items={currentStep.checklist}
                checkedItems={checkedItems}
                onToggleChecklist={onToggleChecklist}
              />
            )}

            {currentStep.coachNote && (
              <div className="coach-note">
                <ShieldCheck size={18} />
                <div>
                  <p className="coach-note-title">Coaching note</p>
                  <p>{currentStep.coachNote}</p>
                </div>
              </div>
            )}
          </motion.section>
        </AnimatePresence>
      </main>

      <footer className="sticky-footer">
        <button
          type="button"
          className="footer-secondary"
          onClick={onPrev}
          disabled={stepIndex === 0}
        >
          Back
        </button>
        <button
          type="button"
          className="footer-primary"
          onClick={onNext}
          disabled={!canAdvance}
        >
          {isLastStep ? 'Finish Path' : 'Next Module'}
          <ArrowRight size={18} />
        </button>
      </footer>
    </>
  );
}

function ScenarioCard({
  step,
  selectedAnswer,
  selectedOption,
  onScenarioAnswer,
}: {
  step: Step;
  selectedAnswer: number | undefined;
  selectedOption: ScenarioOption | undefined;
  onScenarioAnswer: (stepId: string, answerIndex: number) => void;
}) {
  return (
    <div className="scenario-block">
      <div className="prompt-card">
        <p className="prompt-label">Scenario</p>
        <p className="prompt-text">{step.prompt}</p>
      </div>

      <div className="option-stack">
        {step.options?.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const hasAnswered = selectedAnswer !== undefined;

          let className = 'option-card';
          if (!hasAnswered) {
            className += ' option-card-idle';
          } else if (option.correct) {
            className += ' option-card-correct';
          } else if (isSelected) {
            className += ' option-card-incorrect';
          } else {
            className += ' option-card-muted';
          }

          return (
            <button
              key={option.text}
              type="button"
              className={className}
              disabled={hasAnswered}
              onClick={() => onScenarioAnswer(step.id, index)}
            >
              {option.text}
            </button>
          );
        })}
      </div>

      {selectedOption && (
        <div
          className={`feedback-card ${
            selectedOption.correct ? 'feedback-card-correct' : 'feedback-card-incorrect'
          }`}
        >
          {selectedOption.feedback}
        </div>
      )}
    </div>
  );
}

function ChecklistCard({
  stepId,
  items,
  checkedItems,
  onToggleChecklist,
}: {
  stepId: string;
  items: string[];
  checkedItems: string[];
  onToggleChecklist: (stepId: string, item: string) => void;
}) {
  return (
    <div className="checklist-card">
      <p className="prompt-label">Complete each check</p>
      <div className="checklist-stack">
        {items.map((item) => {
          const isChecked = checkedItems.includes(item);

          return (
            <button
              key={item}
              type="button"
              className={`check-row ${isChecked ? 'check-row-active' : ''}`}
              onClick={() => onToggleChecklist(stepId, item)}
            >
              {isChecked ? (
                <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
              ) : (
                <Circle size={18} className="text-brand-red shrink-0" />
              )}
              <span>{item}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
