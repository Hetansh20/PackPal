// components/SafeHTMLRenderer.tsx
'use client';

import { useEffect, useRef } from 'react';

interface SafeHTMLRendererProps {
  html: string;
  className?: string;
}

export default function SafeHTMLRenderer({ html, className }: SafeHTMLRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous content
    containerRef.current.innerHTML = '';

    // Create a temporary div to parse the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    // Extract scripts and execute them safely
    const scripts = tempDiv.querySelectorAll('script');
    scripts.forEach((script) => {
      const newScript = document.createElement('script');
      if (script.src) {
        newScript.src = script.src;
      } else {
        newScript.textContent = script.textContent || '';
      }
      document.body.appendChild(newScript);
      document.body.removeChild(newScript);
    });

    // Append the cleaned HTML
    containerRef.current.appendChild(tempDiv);

    // Cleanup function
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [html]);

  return <div ref={containerRef} className={className} />;
}