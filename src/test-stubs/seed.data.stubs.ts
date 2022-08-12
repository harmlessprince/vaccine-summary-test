export const seedDataStubResponse = () => {
  const total = 100;
  return {
    success: true,
    message: 'Database seeded successfully with ' + total + ' data',
    total,
  };
};
