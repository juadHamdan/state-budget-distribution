export interface BudgetInterface { 
    value: number; 
    name: string; 
    percent: number; 
    color: string; 
    details: { name: string; percent: number; }[]; 
}