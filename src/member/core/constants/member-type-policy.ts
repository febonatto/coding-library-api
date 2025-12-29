import { MemberType } from '../types/member.type';

interface IMemberTypePolicy {
  maxLoans: number;
  loanDays: number;
  dailyFineAmount: number;
  maxRenewCount: number;
}

export const MemberTypePolicy: Record<MemberType, IMemberTypePolicy> = {
  [MemberType.GENERAL_PUBLIC]: {
    maxLoans: 1,
    loanDays: 5,
    dailyFineAmount: 5,
    maxRenewCount: 0,
  },
  [MemberType.STUDENT]: {
    maxLoans: 3,
    loanDays: 7,
    dailyFineAmount: 2,
    maxRenewCount: 2,
  },
  [MemberType.PROFESSOR]: {
    maxLoans: 10,
    loanDays: 30,
    dailyFineAmount: 0.5,
    maxRenewCount: Infinity,
  },
};
