'use client';

import { useEffect } from 'react';

interface HubSpotCTAProps {
  ctaId: string;
  portalId?: string;
}

export default function HubSpotCTA({ ctaId, portalId }: HubSpotCTAProps) {
  const effectivePortalId = portalId || process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;

  useEffect(() => {
    // Don't load CTA if portal ID or CTA ID is not configured
    if (!effectivePortalId || !ctaId) {
      return;
    }

    // Load HubSpot CTA script
    const script = document.createElement('script');
    script.src = `//cta-redirect.hubspot.com/cta/redirect/${effectivePortalId}/${ctaId}`;
    script.async = true;
    script.defer = true;
    
    const wrapper = document.getElementById(`hubspot-cta-${ctaId}`);
    if (wrapper) {
      wrapper.appendChild(script);
    }

    return () => {
      // Cleanup
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [ctaId, effectivePortalId]);

  // Return null if not configured - CTAs are supplementary UI elements
  if (!effectivePortalId || !ctaId) {
    return null;
  }

  return (
    <div 
      id={`hubspot-cta-${ctaId}`} 
      className="hubspot-cta-wrapper"
    />
  );
}
