// Navigation types for DEVO-S

export type Screen =
  | 'home'
  | 'admin'
  | 'support'
  | 'customer'
  | 'rider'
  | 'restaurant';

export type NavigateFunction = (screen: Screen) => void;
