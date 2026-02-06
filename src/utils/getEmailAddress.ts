import { Applicant } from '@/query/applicant/schema';
import { Member } from '@/query/member/schema';

interface GetEmailAddressParams {
  input: Applicant | Member | string;
}

export const getEmailAddress = ({ input }: GetEmailAddressParams) => {
  if (typeof input === 'string') {
    return input;
  }
  return input.email;
};
