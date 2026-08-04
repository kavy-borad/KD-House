/**
 * Analytics Tracking Utility for Karmadude
 * Handles automatic page view tracking and event tracking
 */

import { api } from './apiClient';

// Session management
const SESSION_KEY = 'karmadude_session_id';
const VISITOR_KEY = 'karmadude_visitor_id';
const GEOLOCATION_KEY = 'karmadude_geolocation';
const GEOLOCATION_EXPIRY_KEY = 'karmadude_geolocation_expiry';
const GEOLOCATION_CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in ms

// Cached geolocation data
interface GeolocationData {
    country: string;
    region: string;
    city: string;
    latitude: number;
    longitude: number;
    timezone: string;
    isp: string;
}

let cachedGeolocation: GeolocationData | null = null;

// Fetch and cache IP geolocation data from ip-api.com
async function getGeolocationData(): Promise<GeolocationData> {
    // Return cached data if available in memory
    if (cachedGeolocation) {
        return cachedGeolocation;
    }

    // Check localStorage cache
    const cachedData = localStorage.getItem(GEOLOCATION_KEY);
    const cacheExpiry = localStorage.getItem(GEOLOCATION_EXPIRY_KEY);

    if (cachedData && cacheExpiry && Date.now() < parseInt(cacheExpiry, 10)) {
        try {
            cachedGeolocation = JSON.parse(cachedData);
            return cachedGeolocation!;
        } catch {
            // Invalid cached data, fetch fresh
        }
    }

    // Fetch from ipapi.co (free, no API key required for limited requests)
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();

        // ipapi.co returns data directly without a status field
        // Check if we got valid data by checking for country field
        if (data && data.country_name && !data.error) {
            cachedGeolocation = {
                country: data.country_name || '',
                region: data.region || '',
                city: data.city || '',
                latitude: data.latitude || 0,
                longitude: data.longitude || 0,
                timezone: data.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
                isp: data.org || '',
            };

            // Cache in localStorage
            localStorage.setItem(GEOLOCATION_KEY, JSON.stringify(cachedGeolocation));
            localStorage.setItem(GEOLOCATION_EXPIRY_KEY, (Date.now() + GEOLOCATION_CACHE_DURATION).toString());

            return cachedGeolocation;
        }
    } catch (error) {
        console.warn('Analytics: Failed to fetch geolocation data', error);
    }

    // Return default values if fetch fails
    return {
        country: '',
        region: '',
        city: '',
        latitude: 0,
        longitude: 0,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        isp: '',
    };
}

// Generate a unique session ID
function generateSessionId(): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 12);
    return `karmadude_session_${timestamp}_${random}`;
}

// Get or create session ID (persists for the browser session)
export function getSessionId(): string {
    let sessionId = sessionStorage.getItem(SESSION_KEY);
    if (!sessionId) {
        sessionId = generateSessionId();
        sessionStorage.setItem(SESSION_KEY, sessionId);
    }
    return sessionId;
}

// Get or create visitor ID (persists across sessions)
export function getVisitorId(): number {
    let visitorId = localStorage.getItem(VISITOR_KEY);
    if (!visitorId) {
        visitorId = Date.now().toString();
        localStorage.setItem(VISITOR_KEY, visitorId);
    }
    return parseInt(visitorId, 10);
}

// Get device information
function getDeviceInfo() {
    const ua = navigator.userAgent;

    // Detect device type
    let deviceType: 'mobile' | 'tablet' | 'desktop' = 'desktop';
    if (/Mobi|Android/i.test(ua)) {
        deviceType = /Tablet|iPad/i.test(ua) ? 'tablet' : 'mobile';
    }

    // Detect browser
    let browser = 'Unknown';
    let browserVersion = '';
    if (ua.includes('Chrome') && !ua.includes('Edg')) {
        browser = 'Chrome';
        browserVersion = ua.match(/Chrome\/(\d+\.\d+\.\d+\.\d+)/)?.[1] || '';
    } else if (ua.includes('Firefox')) {
        browser = 'Firefox';
        browserVersion = ua.match(/Firefox\/(\d+\.\d+)/)?.[1] || '';
    } else if (ua.includes('Safari') && !ua.includes('Chrome')) {
        browser = 'Safari';
        browserVersion = ua.match(/Version\/(\d+\.\d+)/)?.[1] || '';
    } else if (ua.includes('Edg')) {
        browser = 'Edge';
        browserVersion = ua.match(/Edg\/(\d+\.\d+)/)?.[1] || '';
    }

    // Detect OS
    let os = 'Unknown';
    if (ua.includes('Windows')) os = 'Windows';
    else if (ua.includes('Mac')) os = 'macOS';
    else if (ua.includes('Linux')) os = 'Linux';
    else if (ua.includes('Android')) os = 'Android';
    else if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';

    return {
        device_type: deviceType,
        browser,
        browser_version: browserVersion,
        os,
        screen_width: window.screen.width,
        screen_height: window.screen.height,
        language: navigator.language,
    };
}

// Analytics tracking data interface
interface AnalyticsTrackData {
    session_id: string;
    visitors_id: number;
    location: {
        country: string;
        region: string;
        city: string;
        latitude: number;
        longitude: number;
        timezone: string;
    };
    device: {
        device_type: string;
        browser: string;
        browser_version: string;
        os: string;
        screen_width: number;
        screen_height: number;
        language: string;
    };
    network: {
        isp: string;
        connection_type: string;
    };
    event: {
        event_type: string;
        page_url: string;
        referrer: string;
        campaign_source: string;
        campaign_medium: string;
        campaign_name: string;
        timestamp: number;
    };
    conversion: {
        is_conversion: boolean;
        conversion_type: string;
        conversion_value: number;
    };
}

// Get connection type (navigator.connection is not available in all browsers)
function getConnectionType(): string {
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    if (connection) {
        return connection.effectiveType || connection.type || 'unknown';
    }
    return 'unknown';
}

// Get URL parameters for campaign tracking
function getCampaignParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        campaign_source: params.get('utm_source') || '',
        campaign_medium: params.get('utm_medium') || '',
        campaign_name: params.get('utm_campaign') || '',
    };
}

// Track page view
export async function trackPageView(pageUrl?: string) {
    try {
        const sessionId = getSessionId();
        const visitorId = getVisitorId();
        const deviceInfo = getDeviceInfo();
        const campaignParams = getCampaignParams();
        const geolocation = await getGeolocationData();

        const trackData: AnalyticsTrackData = {
            session_id: sessionId,
            visitors_id: visitorId,
            location: {
                country: geolocation.country,
                region: geolocation.region,
                city: geolocation.city,
                latitude: geolocation.latitude,
                longitude: geolocation.longitude,
                timezone: geolocation.timezone,
            },
            device: deviceInfo,
            network: {
                isp: geolocation.isp,
                connection_type: getConnectionType(),
            },
            event: {
                event_type: 'page_view',
                page_url: pageUrl || window.location.pathname,
                referrer: document.referrer,
                ...campaignParams,
                timestamp: Date.now(),
            },
            conversion: {
                is_conversion: false,
                conversion_type: '',
                conversion_value: 0,
            },
        };

        const result = await api.analytics.track(trackData as unknown as Record<string, unknown>);
        if (result.success) {
            console.log('Analytics: Page view tracked successfully');
        } else {
            console.warn('Analytics: Failed to track page view', result.message);
        }

        return result;
    } catch (error) {
        console.error('Analytics: Error tracking page view', error);
        return { success: false, message: 'Error tracking page view' };
    }
}

// Track custom event
export async function trackEvent(
    eventType: string,
    eventData?: Record<string, unknown>
) {
    try {
        const sessionId = getSessionId();
        const visitorId = getVisitorId();
        const deviceInfo = getDeviceInfo();
        const campaignParams = getCampaignParams();
        const geolocation = await getGeolocationData();

        const trackData: AnalyticsTrackData = {
            session_id: sessionId,
            visitors_id: visitorId,
            location: {
                country: geolocation.country,
                region: geolocation.region,
                city: geolocation.city,
                latitude: geolocation.latitude,
                longitude: geolocation.longitude,
                timezone: geolocation.timezone,
            },
            device: deviceInfo,
            network: {
                isp: geolocation.isp,
                connection_type: getConnectionType(),
            },
            event: {
                event_type: eventType,
                page_url: window.location.pathname,
                referrer: document.referrer,
                ...campaignParams,
                timestamp: Date.now(),
                ...eventData,
            },
            conversion: {
                is_conversion: false,
                conversion_type: '',
                conversion_value: 0,
            },
        };

        const result = await api.analytics.track(trackData as unknown as Record<string, unknown>);
        if (result.success) {
            console.log(`Analytics: Event "${eventType}" tracked successfully`);
        } else {
            console.warn(`Analytics: Failed to track event "${eventType}"`, result.message);
        }

        return result;
    } catch (error) {
        console.error(`Analytics: Error tracking event "${eventType}"`, error);
        return { success: false, message: 'Error tracking event' };
    }
}

// Track conversion
export async function trackConversion(
    conversionType: string,
    conversionValue: number = 0
) {
    try {
        const sessionId = getSessionId();
        const visitorId = getVisitorId();
        const deviceInfo = getDeviceInfo();
        const campaignParams = getCampaignParams();
        const geolocation = await getGeolocationData();

        const trackData: AnalyticsTrackData = {
            session_id: sessionId,
            visitors_id: visitorId,
            location: {
                country: geolocation.country,
                region: geolocation.region,
                city: geolocation.city,
                latitude: geolocation.latitude,
                longitude: geolocation.longitude,
                timezone: geolocation.timezone,
            },
            device: deviceInfo,
            network: {
                isp: geolocation.isp,
                connection_type: getConnectionType(),
            },
            event: {
                event_type: 'conversion',
                page_url: window.location.pathname,
                referrer: document.referrer,
                ...campaignParams,
                timestamp: Date.now(),
            },
            conversion: {
                is_conversion: true,
                conversion_type: conversionType,
                conversion_value: conversionValue,
            },
        };

        const result = await api.analytics.track(trackData as unknown as Record<string, unknown>);
        if (result.success) {
            console.log(`Analytics: Conversion "${conversionType}" tracked successfully`);
        } else {
            console.warn(`Analytics: Failed to track conversion "${conversionType}"`, result.message);
        }

        return result;
    } catch (error) {
        console.error(`Analytics: Error tracking conversion "${conversionType}"`, error);
        return { success: false, message: 'Error tracking conversion' };
    }
}

export default {
    trackPageView,
    trackEvent,
    trackConversion,
    getSessionId,
    getVisitorId,
};
