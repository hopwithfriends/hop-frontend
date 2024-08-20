// biome-ignore lint/style/useImportType: <explanation>
import React from 'react';
import "@styles/globals.css";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return <div> {children} </div>
};

export default MarketingLayout;