import {ParamListBase} from '@react-navigation/native';

export interface RootStackParamList extends ParamListBase {
  // Public screens
  Register: undefined;
  Login?: {setIsAuthenticated: (isAuthenticated: boolean) => void};
  RecoverPassword: undefined;
  // Private screens
  HabitsList: undefined;
  HabitsCalendar: {transactionId: string};
  HabitsSummary: undefined;
  CreateHabit: {parentBudgetId: string | undefined};
  EditHabit: {transactionId: string};
}
