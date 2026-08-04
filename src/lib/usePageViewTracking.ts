/**
 * React hook for analytics page view tracking
 * Use this in App.tsx to automatically track page views on route changes
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from './analytics';

export function usePageViewTracking() {
    const location = useLocation();

    useEffect(() => {
        // Track page view whenever the route changes
        trackPageView(location.pathname);
    }, [location.pathname]);
}

export default usePageViewTracking;
