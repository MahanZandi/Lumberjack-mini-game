import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type SkinType = 'classic' | 'modern' | 'ninja';

interface SkinColors {
  body: string;
  head: string;
  hat: string;
  beard: string;
  axeHandle: string;
  axeHead: string;
}

export const skins: Record<SkinType, SkinColors> = {
  classic: {
    body: '#D32F2F',
    head: '#FFD4A3',
    hat: '#6B4423',
    beard: '#8B6239',
    axeHandle: '#6B4423',
    axeHead: '#808080',
  },
  modern: {
    body: '#2196F3',
    head: '#FFE0B2',
    hat: '#37474F',
    beard: '#5D4037',
    axeHandle: '#37474F',
    axeHead: '#9E9E9E',
  },
  ninja: {
    body: '#000000',
    head: '#FFCCBC',
    hat: '#212121',
    beard: '#424242',
    axeHandle: '#1A237E',
    axeHead: '#C0C0C0',
  },
};

interface SkinContextType {
  selectedSkin: SkinType;
  setSelectedSkin: (skin: SkinType) => void;
  skinColors: SkinColors;
}

const SkinContext = createContext<SkinContextType | undefined>(undefined);

export const SkinProvider = ({ children }: { children: ReactNode }) => {
  const [selectedSkin, setSelectedSkin] = useState<SkinType>(() => {
    const saved = localStorage.getItem('selectedSkin');
    return (saved as SkinType) || 'classic';
  });

  useEffect(() => {
    localStorage.setItem('selectedSkin', selectedSkin);
  }, [selectedSkin]);

  return (
    <SkinContext.Provider value={{ selectedSkin, setSelectedSkin, skinColors: skins[selectedSkin] }}>
      {children}
    </SkinContext.Provider>
  );
};

export const useSkin = () => {
  const context = useContext(SkinContext);
  if (!context) throw new Error('useSkin must be used within SkinProvider');
  return context;
};
