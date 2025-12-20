import { useEffect, useRef } from 'react';

interface PageBreakControllerProps {
  data: unknown;
  onPageBreakNeeded?: (section: string, page: number) => void;
}

const PageBreakController = ({ data, onPageBreakNeeded }: PageBreakControllerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const checkPageBreaks = () => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const sections = container.querySelectorAll('.content-section');
      
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const pageHeight = 297; // A4 height in mm
        const currentPage = Math.floor(rect.top / pageHeight) + 1;
        
        // Check if section spans multiple pages
        const sectionBottomPage = Math.floor((rect.top + rect.height) / pageHeight) + 1;
        
        if (sectionBottomPage > currentPage) {
          // Section spans multiple pages
          onPageBreakNeeded?.(section.id || `section-${index}`, currentPage);
        }
      });
    };
    
    // Check page breaks after content is rendered
    const timeoutId = setTimeout(checkPageBreaks, 100);
    
    return () => clearTimeout(timeoutId);
  }, [data, onPageBreakNeeded]);
  
  return null;
};

export default PageBreakController;