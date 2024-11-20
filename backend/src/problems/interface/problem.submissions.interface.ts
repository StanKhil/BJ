import { Problem, Submission } from '@prisma/client';

export interface ProblemSubmissions extends Problem {
  submissions: Submission[];
}
