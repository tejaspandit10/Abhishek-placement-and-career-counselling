
export const processPayment = async (amount: number): Promise<{ success: boolean; transactionId: string }> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Simulate success
  return {
    success: true,
    transactionId: `TXN_${Math.random().toString(36).substr(2, 9).toUpperCase()}`
  };
};
