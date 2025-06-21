import React from 'react';

export const Logo: React.FC = () => {
  return (
    <div className="flex items-center">
      <img 
        src="/LeadChoose.jpeg" 
        alt="LeadChoose" 
       className="h-16 w-30 ml-8 object-contain hover:opacity-90 transition-opacity"
      />
    </div>
  );
};