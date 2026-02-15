import React from 'react';

export type CardType = 'Family' | 'Agriculture' | 'Health' | '';

export interface FormData {
  name: string;
  mobile: string;
  ward: string;
  income: string;
  cardType: CardType;
  photo: string | null;
}

export interface ModalState {
  isOpen: boolean;
  type: 'success' | 'rejection' | null;
  title: string;
  message: string;
}

export interface ServiceCardProps {
  title: string;
  icon: React.ReactNode;
  description?: string;
  isSelected: boolean;
  onClick: () => void;
}