import { useAttempt as useAttemptHook } from '../context/AttemptContext';

export function useAttempt() {
  return useAttemptHook();
}
