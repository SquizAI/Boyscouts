import React, { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { GripVertical } from 'lucide-react';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { DonorRecord } from '../../types/donor';

const ResponsiveGridLayout = WidthProvider(Responsive);

interface DraggableLayoutProps {
  items: Array<{
    id: string;
    title: string;
    component: React.ReactNode;
  }>;
  donors: DonorRecord[];
  dateRange: { start: Date; end: Date };
}

export function DraggableLayout({ items, donors, dateRange }: DraggableLayoutProps) {
  const [layouts, setLayouts] = useState(() => {
    const savedLayout = localStorage.getItem('analyticsLayout');
    if (savedLayout) {
      try {
        return JSON.parse(savedLayout);
      } catch (e) {
        console.error('Error parsing saved layout:', e);
      }
    }
    
    return {
      lg: items.map((_, i) => ({
        i: i.toString(),
        x: (i % 3) * 4,
        y: Math.floor(i / 3) * 4,
        w: 4,
        h: 4,
        minW: 3,
        minH: 3
      }))
    };
  });

  const handleLayoutChange = (layout: any, allLayouts: any) => {
    setLayouts(allLayouts);
    localStorage.setItem('analyticsLayout', JSON.stringify(allLayouts));
  };

  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={layouts}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      rowHeight={100}
      onLayoutChange={handleLayoutChange}
      isDraggable
      isResizable
      margin={[16, 16]}
    >
      {items.map((item, i) => (
        <div 
          key={i} 
          className="bg-dark-800/95 backdrop-blur-xl border border-dark-600/50 rounded-xl shadow-lg overflow-hidden hover:shadow-glow transition-shadow duration-300"
        >
          <div className="p-4 cursor-move bg-dark-700/50 border-b border-dark-600/50">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-100">{item.title}</span>
              <GripVertical className="h-4 w-4 text-gray-400" />
            </div>
          </div>
          <div className="p-4">
            {item.component}
          </div>
        </div>
      ))}
    </ResponsiveGridLayout>
  );
}