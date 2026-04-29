export const fetchExternalData = async (source: string) => {
  // Mock data aggregator
  const mockData: Record<string, number> = {
    'market_trend': 0.75,
    'weather_score': 0.4,
    'user_sentiment': 0.85,
    'risk_factor': 0.2
  };

  return mockData[source] || Math.random();
};
