import { useEffect, useState } from 'react';

/**
 * Debounce hook - delays updating a value until after a specified delay
 * Useful for reducing expensive operations like API calls or localStorage writes
 * 
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds (default: 500ms)
 * @returns Debounced value
 * 
 * @example
 * const [searchTerm, setSearchTerm] = useState('');
 * const debouncedSearch = useDebounce(searchTerm, 300);
 * 
 * useEffect(() => {
 *   // This only runs 300ms after user stops typing
 *   performSearch(debouncedSearch);
 * }, [debouncedSearch]);
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        // Set up a timer to update the debounced value after delay
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Clean up the timer if value changes before delay expires
        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}

/**
 * Debounced callback hook - delays executing a callback until after a specified delay
 * Useful for event handlers like search input or form validation
 * 
 * @param callback - The function to debounce
 * @param delay - Delay in milliseconds (default: 500ms)
 * @returns Debounced callback function
 * 
 * @example
 * const handleSearch = useDebouncedCallback((query: string) => {
 *   performExpensiveSearch(query);
 * }, 300);
 */
export function useDebouncedCallback<T extends (...args: any[]) => any>(
    callback: T,
    delay: number = 500
): T {
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

    const debouncedCallback = ((...args: any[]) => {
        if (timer) {
            clearTimeout(timer);
        }

        const newTimer = setTimeout(() => {
            callback(...args);
        }, delay);

        setTimer(newTimer);
    }) as T;

    useEffect(() => {
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [timer]);

    return debouncedCallback;
}
