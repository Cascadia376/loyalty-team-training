import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Circle,
  ClipboardList,
  MessageSquareQuote,
  ShieldCheck,
  Store,
  UserRound,
  X,
} from 'lucide-react';
import {
  FAQ_SECTIONS,
  MODULE_CONFIG,
  PATHS,
  STORE_OPTIONS,
  TEAM_STEPS,
  type Highlight,
  type ModuleKey,
  type PathDefinition,
  type PathKey,
  type ScenarioOption,
  type Step,
} from './trainingData';

interface TraineeInfo {
  firstName: string;
  lastName: string;
  store: string;
  otherStore: string;
  startedAt: string | null;
}

interface CompletionPayload {
  traineeFirstName: string;
  traineeLastName: string;
  traineeName: string;
  store: string;
  startedAt: string;
  completedAt: string;
  completionScore: number;
  moduleStatus: Record<ModuleKey, boolean>;
  firstAttemptResults: Record<string, boolean>;
}

const initialTrainee = (): TraineeInfo => ({
  firstName: '',
  lastName: '',
  store: '',
  otherStore: '',
  startedAt: null,
});

const initialInteractionState = () => ({
  activePath: null as PathKey | null,
  currentStepByPath: { team: 0, manager: 0 },
  scenarioAnswers: {} as Record<string, number>,
  firstAttemptResults: {} as Record<string, boolean>,
  checklistState: {} as Record<string, string[]>,
  acknowledgedSteps: [] as string[],
  completedPaths: [] as PathKey[],
});

const scenarioSteps = TEAM_STEPS.filter((step) => step.kind === 'scenario');

function isStepComplete(
  step: Step,
  state: {
    scenarioAnswers: Record<string, number>;
    checklistState: Record<string, string[]>;
    acknowledgedSteps: string[];
  },
) {
  if (step.kind === 'brief') {
    return true;
  }
  if (step.kind === 'scenario') {
    const index = state.scenarioAnswers[step.id];
    return index !== undefined && Boolean(step.options?.[index]?.correct);
  }
  if (step.kind === 'checklist' || step.kind === 'signoff') {
    const checked = state.checklistState[step.id] ?? [];
    return step.checklist ? step.checklist.every((item) => checked.includes(item)) : true;
  }
  return state.acknowledgedSteps.includes(step.id);
}

function moduleSteps(module: ModuleKey) {
  return TEAM_STEPS.filter((step) => step.module === module);
}

function isActiveThroughDate(showUntil: string) {
  const [year, month, day] = showUntil.split('-').map(Number);
  const endOfDay = new Date(year, month - 1, day, 23, 59, 59, 999);
  return new Date() <= endOfDay;
}

interface ProgressiveHighlightsProps {
  items: Highlight[];
  revealSequentially: boolean;
  canRevealMore: boolean;
  onRevealNext: () => void;
}

function ProgressiveHighlights({
  items,
  revealSequentially,
  canRevealMore,
  onRevealNext,
}: ProgressiveHighlightsProps) {
  return (
    <div className="highlight-grid" aria-live="polite">
      {items.map((item, index) => (
        <div key={item.label} className="highlight-card">
          <p className="highlight-label">{item.label}</p>
          <p className="highlight-value">{item.value}</p>
          {item.note && <p className="highlight-note">{item.note}</p>}
          {revealSequentially && index === items.length - 1 && canRevealMore && (
            <button type="button" className="progressive-reveal-button" onClick={onRevealNext}>
              Show next response
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [trainee, setTrainee] = useState<TraineeInfo>(initialTrainee());
  const [activePath, setActivePath] = useState<PathKey | null>(null);
  const [currentStepByPath, setCurrentStepByPath] = useState<Record<PathKey, number>>({
    team: 0,
    manager: 0,
  });
  const [scenarioAnswers, setScenarioAnswers] = useState<Record<string, number>>({});
  const [firstAttemptResults, setFirstAttemptResults] = useState<Record<string, boolean>>(
    {},
  );
  const [checklistState, setChecklistState] = useState<Record<string, string[]>>({});
  const [acknowledgedSteps, setAcknowledgedSteps] = useState<string[]>([]);
  const [completedPaths, setCompletedPaths] = useState<PathKey[]>([]);
  const [managerTapCount, setManagerTapCount] = useState(0);
  const [isKnowledgeBaseOpen, setIsKnowledgeBaseOpen] = useState(false);
  const [submissionState, setSubmissionState] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle');
  const [submissionMessage, setSubmissionMessage] = useState('');

  useEffect(() => {
    const initial = initialInteractionState();
    setActivePath(initial.activePath);
    setCurrentStepByPath(initial.currentStepByPath);
    setScenarioAnswers(initial.scenarioAnswers);
    setFirstAttemptResults(initial.firstAttemptResults);
    setChecklistState(initial.checklistState);
    setAcknowledgedSteps(initial.acknowledgedSteps);
    setCompletedPaths(initial.completedPaths);
    setIsReady(true);
  }, []);

  const activeDefinition = useMemo(
    () => PATHS.find((path) => path.key === activePath) ?? null,
    [activePath],
  );
  const currentStepIndex = activeDefinition ? currentStepByPath[activeDefinition.key] : 0;
  const currentStep = activeDefinition?.steps[currentStepIndex] ?? null;

  const normalizedStore =
    trainee.store === 'Other store' ? trainee.otherStore.trim() : trainee.store;
  const hasFullName = trainee.firstName.trim().length > 0 && trainee.lastName.trim().length > 0;
  const canStartTraining = hasFullName && normalizedStore.length > 0;
  const firstTryCorrectCount = scenarioSteps.filter(
    (step) => firstAttemptResults[step.id],
  ).length;
  const completionScore = scenarioSteps.length
    ? Math.round((firstTryCorrectCount / scenarioSteps.length) * 100)
    : 100;

  const moduleStatus: Record<ModuleKey, boolean> = {
    basics: moduleSteps('basics').every((step) =>
      isStepComplete(step, { scenarioAnswers, checklistState, acknowledgedSteps }),
    ),
    pos: moduleSteps('pos').every((step) =>
      isStepComplete(step, { scenarioAnswers, checklistState, acknowledgedSteps }),
    ),
    account: moduleSteps('account').every((step) =>
      isStepComplete(step, { scenarioAnswers, checklistState, acknowledgedSteps }),
    ),
  };

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

  const resetTraining = () => {
    const initial = initialInteractionState();
    setCurrentStepByPath(initial.currentStepByPath);
    setScenarioAnswers(initial.scenarioAnswers);
    setFirstAttemptResults(initial.firstAttemptResults);
    setChecklistState(initial.checklistState);
    setAcknowledgedSteps(initial.acknowledgedSteps);
    setCompletedPaths(initial.completedPaths);
    setSubmissionState('idle');
    setSubmissionMessage('');
    setTrainee((current) => ({ ...current, startedAt: null }));
    setActivePath('team');
  };

  const submitCompletion = async (): Promise<boolean> => {
    if (!canStartTraining || !trainee.startedAt) {
      setSubmissionState('error');
      setSubmissionMessage('Enter your first name, last name, and store before submitting completion.');
      return false;
    }

    setSubmissionState('submitting');
    setSubmissionMessage('');

    const payload: CompletionPayload = {
      traineeFirstName: trainee.firstName.trim(),
      traineeLastName: trainee.lastName.trim(),
      traineeName: `${trainee.firstName.trim()} ${trainee.lastName.trim()}`.trim(),
      store: normalizedStore,
      startedAt: trainee.startedAt,
      completedAt: new Date().toISOString(),
      completionScore,
      moduleStatus,
      firstAttemptResults,
    };

    try {
      const response = await fetch('/api/training-completion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = (await response.json().catch(() => null)) as { message?: string } | null;
      if (!response.ok) {
        throw new Error(data?.message ?? 'Unable to submit training completion.');
      }
      setSubmissionState('success');
      setSubmissionMessage('Completion submitted successfully.');
      return true;
    } catch (error) {
      setSubmissionState('error');
      setSubmissionMessage(
        error instanceof Error ? error.message : 'Unable to submit training completion.',
      );
      return false;
    }
  };

  return (
    <div className="app-shell">
      <div className="mobile-frame">
        <header className="topbar">
          <div>
            <button
              type="button"
              className="secret-trigger"
              onClick={() => {
                const next = managerTapCount + 1;
                if (next >= 5) {
                  setActivePath('manager');
                  setManagerTapCount(0);
                  return;
                }
                setManagerTapCount(next);
              }}
            >
              <p className="topbar-kicker">The Den Rewards</p>
            </button>
            <h1 className="topbar-title">Start here</h1>
          </div>
        </header>

        {!activeDefinition || !currentStep ? (
          <HomeScreen
            trainee={trainee}
            canStartTraining={canStartTraining}
            onTraineeChange={setTrainee}
            onStartTraining={() => {
              setSubmissionState('idle');
              setSubmissionMessage('');
              setTrainee((current) => ({
                ...current,
                startedAt: current.startedAt ?? new Date().toISOString(),
              }));
              setActivePath('team');
            }}
            onOpenKnowledgeBase={() => setIsKnowledgeBaseOpen(true)}
          />
        ) : (
          <PathExperience
            trainee={trainee}
            path={activeDefinition}
            stepIndex={currentStepIndex}
            currentStep={currentStep}
            scenarioAnswers={scenarioAnswers}
            checklistState={checklistState}
            acknowledgedSteps={acknowledgedSteps}
            completionScore={completionScore}
            moduleStatus={moduleStatus}
            submissionState={submissionState}
            submissionMessage={submissionMessage}
            onBackToHome={() => setActivePath(null)}
            onScenarioAnswer={(stepId, answerIndex, isCorrect) => {
              setScenarioAnswers((current) => ({ ...current, [stepId]: answerIndex }));
              setFirstAttemptResults((current) =>
                stepId in current ? current : { ...current, [stepId]: isCorrect },
              );
            }}
            onToggleChecklist={(stepId, item) => {
              setChecklistState((current) => {
                const existing = current[stepId] ?? [];
                return {
                  ...current,
                  [stepId]: existing.includes(item)
                    ? existing.filter((entry) => entry !== item)
                    : [...existing, item],
                };
              });
            }}
            onOpenKnowledgeBase={() => setIsKnowledgeBaseOpen(true)}
            onPrev={() => {
              setCurrentStepByPath((current) => ({
                ...current,
                [activeDefinition.key]: Math.max(current[activeDefinition.key] - 1, 0),
              }));
            }}
            onNext={async () => {
              const isLast = currentStepIndex === activeDefinition.steps.length - 1;
              if (activeDefinition.key === 'team' && isLast) {
                const submitted = await submitCompletion();
                if (!submitted) return;
              }
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
            onResetTraining={resetTraining}
          />
        )}

        <KnowledgeBaseSheet
          isOpen={isKnowledgeBaseOpen}
          onClose={() => setIsKnowledgeBaseOpen(false)}
        />
      </div>
    </div>
  );
}

function HomeScreen({
  trainee,
  canStartTraining,
  onTraineeChange,
  onStartTraining,
  onOpenKnowledgeBase,
}: {
  trainee: TraineeInfo;
  canStartTraining: boolean;
  onTraineeChange: (trainee: TraineeInfo) => void;
  onStartTraining: () => void;
  onOpenKnowledgeBase: () => void;
}) {
  return (
    <main className="screen-content screen-content-home">
      <section className="hero-card">
        <div className="hero-brand-top" aria-label="The Den Rewards">
          <img src="/The-Den_logo-brown.png" alt="The Den Rewards" className="hero-brand hero-brand-den" />
        </div>
        <p className="eyebrow">The Den Rewards</p>
        <h2 className="hero-title">Team Training</h2>
        <p className="hero-copy">
          Invitation, quick responses, points, redemption, and enrollment steps for launch.
        </p>
        <div className="home-summary" aria-label="Training structure">
          <p className="home-summary-label">Training structure</p>
          <p className="home-summary-copy">3 short modules � Guest invite, POS basics, account access � Takes about 3 minutes</p>
        </div>
        <div className="hero-art">
          <img src="/The-Den_Bears-All.png" alt="The Den bear family" className="hero-bears" />
        </div>
        <div className="hero-actions">
          <div className="onboarding-card">
                <p className="prompt-label">Before training starts</p>
                <p className="form-hint">Enter first name, last name, and store to begin.</p>
                <div className="form-stack">
                  <label className="field-label">
                    <span>First name</span>
                    <div className="field-input-wrap">
                      <UserRound size={16} />
                      <input className="field-input" value={trainee.firstName} onChange={(e) => onTraineeChange({ ...trainee, firstName: e.target.value })} placeholder="Enter first name" required />
                    </div>
                  </label>
                  <label className="field-label">
                    <span>Last name</span>
                    <div className="field-input-wrap">
                      <UserRound size={16} />
                      <input className="field-input" value={trainee.lastName} onChange={(e) => onTraineeChange({ ...trainee, lastName: e.target.value })} placeholder="Enter last name" required />
                    </div>
                  </label>
              <label className="field-label">
                <span>Store</span>
                <div className="field-input-wrap field-select-wrap">
                  <Store size={16} />
                  <select className="field-input field-select" value={trainee.store} onChange={(e) => onTraineeChange({ ...trainee, store: e.target.value })} required>
                    <option value="">Select your store</option>
                    {STORE_OPTIONS.map((store) => (
                      <option key={store} value={store}>{store}</option>
                    ))}
                  </select>
                </div>
              </label>
              {trainee.store === "Other store" && (
                <label className="field-label">
                  <span>Other store name</span>
                  <div className="field-input-wrap">
                    <Store size={16} />
                    <input className="field-input" value={trainee.otherStore} onChange={(e) => onTraineeChange({ ...trainee, otherStore: e.target.value })} placeholder="Enter your store" required />
                  </div>
                </label>
              )}
            </div>
          </div>

          <button type="button" className="hero-primary" onClick={onStartTraining} disabled={!canStartTraining}>
            Start training
            <ArrowRight size={18} />
          </button>
          <button type="button" className="hero-secondary-link" onClick={onOpenKnowledgeBase}>
            <BookOpen size={16} />
            Knowledge Base
          </button>
        </div>
        <div className="hero-brand-bottom" aria-label="Cascadia Liquor">
          <img src="/logo.png" alt="Cascadia Liquor" className="hero-brand hero-brand-cascadia" />
        </div>
      </section>
    </main>
  );
}

function PathExperience({
  trainee,
  path,
  stepIndex,
  currentStep,
  scenarioAnswers,
  checklistState,
  acknowledgedSteps,
  completionScore,
  moduleStatus,
  submissionState,
  submissionMessage,
  onBackToHome,
  onScenarioAnswer,
  onToggleChecklist,
  onOpenKnowledgeBase,
  onPrev,
  onNext,
  onResetTraining,
}: {
  trainee: TraineeInfo;
  path: PathDefinition;
  stepIndex: number;
  currentStep: Step;
  scenarioAnswers: Record<string, number>;
  checklistState: Record<string, string[]>;
  acknowledgedSteps: string[];
  completionScore: number;
  moduleStatus: Record<ModuleKey, boolean>;
  submissionState: 'idle' | 'submitting' | 'success' | 'error';
  submissionMessage: string;
  onBackToHome: () => void;
  onScenarioAnswer: (stepId: string, answerIndex: number, isCorrect: boolean) => void;
  onToggleChecklist: (stepId: string, item: string) => void;
  onOpenKnowledgeBase: () => void;
  onPrev: () => void;
  onNext: () => void | Promise<void>;
  onResetTraining: () => void;
}) {
  const selectedAnswer = currentStep.kind === 'scenario' ? scenarioAnswers[currentStep.id] : undefined;
  const selectedOption = selectedAnswer !== undefined && currentStep.options ? currentStep.options[selectedAnswer] : undefined;
  const checkedItems = checklistState[currentStep.id] ?? [];
  const [revealCounts, setRevealCounts] = useState<Record<string, number>>({});
  const visibleTimedBullets = currentStep.timedBullets?.filter((item) => isActiveThroughDate(item.showUntil)) ?? [];
  const highlightCount = currentStep.highlights?.length ?? 0;
  const revealSequentially = Boolean(currentStep.progressiveReveal && highlightCount > 0);
  const visibleHighlightCount = revealSequentially ? Math.min(revealCounts[currentStep.id] ?? 1, highlightCount) : highlightCount;
  const visibleHighlights = currentStep.highlights?.slice(0, visibleHighlightCount) ?? [];
  const canRevealMoreHighlights = revealSequentially && visibleHighlightCount < highlightCount;
  const showSupportingBullets = !revealSequentially || visibleHighlightCount >= highlightCount;
  const allChecklistItemsChecked = currentStep.checklist ? currentStep.checklist.every((item) => checkedItems.includes(item)) : false;
    const canAdvance = currentStep.kind === 'scenario'
      ? Boolean(selectedOption?.correct)
      : currentStep.kind === 'checklist' || currentStep.kind === 'signoff'
        ? allChecklistItemsChecked
        : true;
    const progress = ((stepIndex + 1) / path.steps.length) * 100;
    const isLastStep = stepIndex === path.steps.length - 1;
    const moduleKey = currentStep.module;
    const currentModule = moduleKey ? MODULE_CONFIG[moduleKey] : null;
  const currentModuleSteps = moduleKey ? moduleSteps(moduleKey) : [];
  const currentModuleIndex = moduleKey ? currentModuleSteps.findIndex((step) => step.id === currentStep.id) : -1;
  const isModuleStart = currentModuleIndex === 0;

  const revealNextHighlight = () => {
    if (!revealSequentially) return;
    setRevealCounts((prev) => ({
      ...prev,
      [currentStep.id]: Math.min((prev[currentStep.id] ?? 1) + 1, highlightCount),
    }));
  };

  return (
    <>
      <div className="path-header">
        <button type="button" className="ghost-button" onClick={onBackToHome}><ArrowLeft size={16} />Home</button>
        <div className="path-header-meta">
          <span className="mode-pill">{path.label}</span>
          <span className="count-pill">{stepIndex + 1} / {path.steps.length}</span>
        </div>
      </div>
      <div className="progress-track"><motion.div className="progress-fill" initial={false} animate={{ width: `${progress}%` }} /></div>
      <main className="screen-content">
        {path.key === 'team' && (
          <>
            <section className="training-summary-card">
              <div>
                <p className="prompt-label">Training session</p>
                <p className="training-summary-name">
                  {trainee.firstName || trainee.lastName
                    ? `${trainee.firstName} ${trainee.lastName}`.trim()
                    : 'Unnamed trainee'}
                </p>
                <p className="training-summary-copy">{trainee.store === 'Other store' ? trainee.otherStore : trainee.store}</p>
              </div>
              <div className="training-summary-score">Percentage completed {completionScore}%</div>
            </section>
              <section className="module-strip">
                {(Object.keys(MODULE_CONFIG) as ModuleKey[]).map((key) => {
                  const module = MODULE_CONFIG[key];
                  const Icon = module.icon;
                  const isCurrent = key === moduleKey;
                  return (
                    <div key={key} className={`module-pill ${isCurrent ? 'module-pill-current' : ''}`}>
                      <Icon size={16} />
                      <span>{module.shortLabel}</span>
                    </div>
                  );
                })}
              </section>
          </>
        )}
        <AnimatePresence mode="wait">
          <motion.section key={currentStep.id} className={`module-card ${moduleKey ? MODULE_CONFIG[moduleKey].themeClass : ''} ${isModuleStart ? 'module-card-module-start' : ''} ${currentStep.title === 'Module quiz' ? 'module-card-quiz' : ''}`} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.22, ease: 'easeOut' }}>
            {currentModule && (
              <div className="module-heading-top">
                <span className="mini-badge">{currentModuleIndex + 1} / {currentModuleSteps.length} in module</span>
              </div>
            )}
            {currentModule && isModuleStart && (
              <div className="module-start-banner">
                <div className="module-start-icon">
                  <currentModule.icon size={18} />
                </div>
                <div>
                  <p className="module-start-kicker">New module</p>
                  <p className="module-start-title">{currentModule.label}</p>
                  <p className="module-start-copy">{currentModule.description}</p>
                </div>
              </div>
            )}
            <div className="module-heading">
              <p className="eyebrow">{currentStep.eyebrow}</p>
              <h2 className={`module-title ${currentStep.title === 'Module quiz' ? 'module-title-quiz' : ''}`}>{currentStep.title}</h2>
              <p className="module-summary">{currentStep.summary}</p>
            </div>
            {currentStep.screenshot && (
              <figure className="screenshot-card" aria-label={currentStep.screenshot.alt}>
                <div className="screenshot-frame">
                  <img src={currentStep.screenshot.src} alt={currentStep.screenshot.alt} className="screenshot-image" loading="lazy" />
                </div>
                <figcaption className="screenshot-caption">{currentStep.screenshot.caption}</figcaption>
              </figure>
            )}
            {visibleHighlights.length > 0 && (
              <ProgressiveHighlights
                items={visibleHighlights}
                revealSequentially={revealSequentially}
                canRevealMore={canRevealMoreHighlights}
                onRevealNext={revealNextHighlight}
              />
            )}
            {currentStep.script && <div className="script-card"><MessageSquareQuote size={18} className="script-icon" /><p>{currentStep.script}</p></div>}
              {showSupportingBullets && (currentStep.bullets?.length ?? 0) + visibleTimedBullets.length > 0 && (
                <ul className="bullet-list bullet-list-card">
                  {currentStep.bullets?.map((item) => <li key={item}>{item}</li>)}
                  {visibleTimedBullets.map((item) => <li key={item.text}><strong>{item.text}</strong></li>)}
                </ul>
              )}
            {currentStep.kind === 'scenario' && currentStep.prompt && currentStep.options && <ScenarioCard step={currentStep} selectedAnswer={selectedAnswer} selectedOption={selectedOption} onScenarioAnswer={onScenarioAnswer} />}
            {currentStep.checklist && <ChecklistCard stepId={currentStep.id} items={currentStep.checklist} checkedItems={checkedItems} onToggleChecklist={onToggleChecklist} />}
            {currentStep.coachNote && <div className="coach-note"><ShieldCheck size={18} /><div><p className="coach-note-title">NOTE</p><p>{currentStep.coachNote}</p></div></div>}
            {path.key === 'team' && currentStep.kind === 'signoff' && (
              <div className="support-card">
                <p className="coach-note-title">Tracking and support</p>
                <p>Completion will be submitted with your name, store, and score. Use the knowledge base or ask your store manager if you are unsure.</p>
                <button type="button" className="knowledge-link-inline" onClick={onOpenKnowledgeBase}><BookOpen size={16} />Open Knowledge Base</button>
                <button type="button" className="knowledge-link-inline" onClick={onResetTraining}>Reset Training</button>
                {submissionState !== 'idle' && <div className={`submission-state ${submissionState === 'success' ? 'submission-state-success' : submissionState === 'error' ? 'submission-state-error' : 'submission-state-pending'}`}>{submissionState === 'submitting' ? 'Submitting completion...' : submissionMessage}</div>}
              </div>
            )}
          </motion.section>
        </AnimatePresence>
      </main>
      <footer className="sticky-footer">
        <button type="button" className="footer-secondary" onClick={onPrev} disabled={stepIndex === 0 || submissionState === 'submitting'}>Back</button>
        <button type="button" className="footer-primary" onClick={() => void onNext()} disabled={!canAdvance || submissionState === 'submitting'}>{isLastStep ? 'Submit Completion' : 'Next Module'}<ArrowRight size={18} /></button>
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
  onScenarioAnswer: (stepId: string, answerIndex: number, isCorrect: boolean) => void;
}) {
  const hasCorrectAnswer = Boolean(selectedOption?.correct);

  return (
    <div className="scenario-block">
      <div className="prompt-card"><p className="prompt-label">Quiz question</p><p className="prompt-text">{step.prompt}</p></div>
      <div className="option-stack">
        {step.options?.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const hasAnswered = selectedAnswer !== undefined;
          let className = 'option-card';
          if (!hasAnswered) className += ' option-card-idle';
          else if (hasCorrectAnswer && option.correct) className += ' option-card-correct';
          else if (hasCorrectAnswer && !option.correct) className += ' option-card-muted';
          else if (isSelected) className += ' option-card-incorrect';
          else className += ' option-card-idle';
          return <button key={option.text} type="button" className={className} disabled={hasCorrectAnswer} onClick={() => onScenarioAnswer(step.id, index, option.correct)}>{option.text}</button>;
        })}
      </div>
      {selectedOption && <div className={`feedback-card ${selectedOption.correct ? 'feedback-card-correct' : 'feedback-card-incorrect'}`}>{selectedOption.correct ? selectedOption.feedback : `${selectedOption.feedback} Try again.`}</div>}
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
          return <button key={item} type="button" className={`check-row ${isChecked ? 'check-row-active' : ''}`} onClick={() => onToggleChecklist(stepId, item)}>{isChecked ? <CheckCircle2 size={18} className="text-emerald-600 shrink-0" /> : <Circle size={18} className="text-brand-red shrink-0" />}<span>{item}</span></button>;
        })}
      </div>
    </div>
  );
}

function KnowledgeBaseSheet({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [openItems, setOpenItems] = useState<string[]>([]);
  useEffect(() => { if (!isOpen) setOpenItems([]); }, [isOpen]);
  if (!isOpen) return null;
  const toggle = (key: string) => setOpenItems((current) => current.includes(key) ? current.filter((item) => item !== key) : [...current, key]);

  return (
    <AnimatePresence>
      <motion.div className="kb-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <button type="button" className="kb-backdrop" aria-label="Close knowledge base" onClick={onClose} />
        <motion.section className="kb-sheet" initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ duration: 0.25, ease: 'easeOut' }}>
          <div className="kb-handle" />
          <div className="kb-header">
            <div>
              <p className="eyebrow">Knowledge Base</p>
              <h2 className="kb-title">The Den Rewards FAQ</h2>
              <p className="kb-copy">Quick answers for common guest questions and checkout situations.</p>
            </div>
            <button type="button" className="kb-close" aria-label="Close knowledge base" onClick={onClose}><X size={18} /></button>
          </div>
          <div className="kb-content">
            {FAQ_SECTIONS.map((section) => <div key={section.title} className="kb-section"><p className="kb-section-title">{section.title}</p><div className="kb-accordion">{section.items.map((item) => {
              const key = `${section.title}:${item.question}`;
              const expanded = openItems.includes(key);
              return <div key={key} className="kb-item"><button type="button" className="kb-question" onClick={() => toggle(key)}><span>{item.question}</span><ChevronDown size={18} className={expanded ? 'kb-chevron kb-chevron-open' : 'kb-chevron'} /></button>{expanded && <div className="kb-answer"><p>{item.guestAnswer}</p>{item.teamNote && <div className="kb-note"><p className="coach-note-title">Team note</p><p>{item.teamNote}</p></div>}</div>}</div>;
            })}</div></div>)}
          </div>
        </motion.section>
      </motion.div>
    </AnimatePresence>
  );
}


