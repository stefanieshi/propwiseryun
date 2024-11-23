export const formatPrice = (value: number) => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const calculateAnnualIncrease = (prices: Array<{ date: string; price: number }>) => {
  if (!prices || prices.length < 2) return 0;
  
  const sortedPrices = [...prices].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  
  const firstPrice = sortedPrices[0].price;
  const lastPrice = sortedPrices[sortedPrices.length - 1].price;
  const yearDiff = (
    new Date(sortedPrices[sortedPrices.length - 1].date).getTime() - 
    new Date(sortedPrices[0].date).getTime()
  ) / (1000 * 60 * 60 * 24 * 365);
  
  return ((lastPrice - firstPrice) / firstPrice) * (1 / yearDiff) * 100;
};

export const generatePriceInsights = (
  propertyIncrease: number,
  areaIncrease: number,
  cityIncrease: number
) => {
  const insights = [];
  
  const propertyVsArea = propertyIncrease - areaIncrease;
  const propertyVsCity = propertyIncrease - cityIncrease;
  
  if (propertyVsArea > 0 && propertyVsCity > 0) {
    insights.push(`This property is outperforming the market with ${propertyIncrease.toFixed(1)}% annual growth, compared to ${areaIncrease.toFixed(1)}% area and ${cityIncrease.toFixed(1)}% city averages.`);
  } else if (propertyVsArea < 0 && propertyVsCity < 0) {
    insights.push(`The property's ${propertyIncrease.toFixed(1)}% annual growth is below market averages (area: ${areaIncrease.toFixed(1)}%, city: ${cityIncrease.toFixed(1)}%), suggesting potential for future value catch-up.`);
  } else {
    insights.push(`The property shows mixed performance with ${propertyIncrease.toFixed(1)}% annual growth compared to area (${areaIncrease.toFixed(1)}%) and city (${cityIncrease.toFixed(1)}%) averages.`);
  }
  
  if (Math.abs(propertyVsArea) > 2) {
    insights.push(`There's a significant ${Math.abs(propertyVsArea).toFixed(1)}% difference from the area average, indicating ${propertyVsArea > 0 ? 'strong local appreciation' : 'potential investment opportunity'}.`);
  }
  
  return insights;
};