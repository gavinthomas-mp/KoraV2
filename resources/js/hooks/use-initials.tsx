import { useCallback } from 'react';

export function useInitials() {
    return useCallback((firstname: string, lastname: string): string => {
        const firstInitial = firstname.charAt(0);
        const lastInitial = lastname.charAt(0);

        return `${firstInitial}${lastInitial}`.toUpperCase();
    }, []);
}
