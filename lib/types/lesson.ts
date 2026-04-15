export type Difficulty = "easy" | "medium" | "hard";

export type BaseStep = {
  id: string;
};

export type IntroCardStep = BaseStep & {
  type: "intro_card";
  title: string;
  body: string;
};

export type ConceptDemoStep = BaseStep & {
  type: "concept_demo";
  title: string;
  code: string;
  output?: string;
  caption?: string;
};

export type MultipleChoiceStep = BaseStep & {
  type: "multiple_choice";
  prompt: string;
  code?: string;
  choices: string[];
  correctAnswer: string;
  explanation: string;
  hints?: string[];
};

export type FillBlankStep = BaseStep & {
  type: "fill_blank";
  prompt: string;
  /** Shown above the input; use {{blank}} or plain prompt with separate hint */
  code: string;
  correctAnswer: string;
  explanation: string;
  hints?: string[];
};

export type PredictOutputStep = BaseStep & {
  type: "predict_output";
  prompt: string;
  code: string;
  correctOutput: string;
  explanation: string;
  hints?: string[];
};

export type RecapStep = BaseStep & {
  type: "recap";
  title: string;
  bullets: string[];
};

export type CompletionStep = BaseStep & {
  type: "completion";
  title: string;
  message: string;
};

export type LessonStep =
  | IntroCardStep
  | ConceptDemoStep
  | MultipleChoiceStep
  | FillBlankStep
  | PredictOutputStep
  | RecapStep
  | CompletionStep;

export type Lesson = {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  estimatedMinutes: number;
  difficulty: Difficulty;
  conceptTags: string[];
  steps: LessonStep[];
};

export type Module = {
  id: string;
  title: string;
  description: string;
  lessonIds: string[];
};
