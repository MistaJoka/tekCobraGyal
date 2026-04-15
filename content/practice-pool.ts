export type PracticeItem = {
  id: string;
  prompt: string;
  code: string;
  correctOutput: string;
  explanation: string;
};

export const practicePool: PracticeItem[] = [
  {
    id: "p1",
    prompt: "What prints?",
    code: "print('Hi')",
    correctOutput: "Hi",
    explanation: "print shows the characters inside the quotes.",
  },
  {
    id: "p2",
    prompt: "What prints?",
    code: "x = 2\nprint(x + 3)",
    correctOutput: "5",
    explanation: "x is 2, so x + 3 is 5.",
  },
  {
    id: "p3",
    prompt: "What prints?",
    code: "print('a' + 'b')",
    correctOutput: "ab",
    explanation: "Adding strings joins them.",
  },
  {
    id: "p4",
    prompt: "What prints?",
    code: "print(3 < 5)",
    correctOutput: "True",
    explanation: "3 is less than 5, so the comparison is True.",
  },
  {
    id: "p5",
    prompt: "What prints?",
    code: "print(type(7))",
    correctOutput: "<class 'int'>",
    explanation: "The literal 7 has type int.",
  },
];
