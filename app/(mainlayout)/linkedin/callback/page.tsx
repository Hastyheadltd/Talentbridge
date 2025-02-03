"use client";
import { useEffect } from 'react';

export default function LinkedInCallback() {
  useEffect(() => {
    
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const error = params.get('error');
    const errorDescription = params.get('error_description');

    if (window.opener) {
      window.opener.postMessage({
        code,
        error,
        error_description: errorDescription
      }, window.location.origin); 
    }

    // Close the popup
    window.close();
  }, []);

  return <div>Processing LinkedIn login...</div>;
}