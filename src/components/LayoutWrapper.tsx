'use client';

import React from 'react';
import { RadioHeader } from './radio/RadioHeader';
import { RadioFooter } from './radio/RadioFooter';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
