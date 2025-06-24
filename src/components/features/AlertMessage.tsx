import { AlertCircleIcon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui';
import { errorMessagesFromApiError } from '@/api';

interface Props {
  title: string;
  apiError: unknown;
}

export const AlertMessage = ({ title, apiError }: Props) => {
  const errorMessages = errorMessagesFromApiError(apiError);

  return (
    <Alert variant="destructive">
      <AlertCircleIcon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
        <ul className="list-inside list-disc text-sm">
          {errorMessages.map((message) => (
            <li key={message.key} className="-indent-5 pl-1">
              {message.message}
            </li>
          ))}
        </ul>
      </AlertDescription>
    </Alert>
  );
};
