import { useSingleModalGuard } from './useSingleModalGuard';

export function useProtectedApi() {
	useSingleModalGuard('usePrivateAPI');
	return null;
}
