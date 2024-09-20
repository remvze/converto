export const unitsData = {
  area: {
    acres: 4046.86,
    hectares: 10000,
    square_centimeters: 0.0001,
    square_feet: 0.092903,
    square_inches: 0.00064516,
    square_kilometers: 1e6,
    square_meters: 1,
    square_miles: 2.59e6,
    square_millimeters: 1e-6,
    square_yards: 0.836127,
  },
  length: {
    centimeters: 0.01,
    feet: 0.3048,
    inches: 0.0254,
    kilometers: 1000,
    meters: 1,
    miles: 1609.34,
    millimeters: 0.001,
    nautical_miles: 1852,
    yards: 0.9144,
  },
  speed: {
    feet_per_second: 0.3048,
    kilometers_per_hour: 0.277778,
    knots: 0.514444,
    meters_per_second: 1,
    miles_per_hour: 0.44704,
  },
  temperature: {
    celsius: (value, toUnit) => {
      if (toUnit === 'fahrenheit') {
        return (value * 9) / 5 + 32;
      } else if (toUnit === 'kelvin') {
        return value + 273.15;
      }

      return value;
    },

    fahrenheit: (value, toUnit) => {
      if (toUnit === 'celsius') {
        return (value - 32) * (5 / 9);
      } else if (toUnit === 'kelvin') {
        return (value - 32) * (5 / 9) + 273.15;
      }

      return value;
    },
    kelvin: (value, toUnit) => {
      if (toUnit === 'celsius') {
        return value - 273.15;
      } else if (toUnit === 'fahrenheit') {
        return (value - 273.15) * (9 / 5) + 32;
      }

      return value;
    },
  },
  time: {
    days: 86400,
    hours: 3600,
    milliseconds: 0.001,
    minutes: 60,
    months: 2.628e6,
    seconds: 1,
    weeks: 604800,
    years: 3.154e7,
  },
  volume: {
    cubic_feet: 28.3168,
    cubic_inches: 0.0163871,
    cubic_meters: 1000,
    cups: 0.24,
    fluid_ounces: 0.0295735,
    gallons: 3.78541,
    liters: 1,
    milliliters: 0.001,
    pints: 0.473176,
    quarts: 0.946353,
  },
  weight: {
    grams: 0.001,
    kilograms: 1,
    micrograms: 1e-9,
    milligrams: 0.000001,
    ounces: 0.0283495,
    pounds: 0.453592,
    stones: 6.35029,
    tons: 1000,
  },
};

export const convert = (
  value: number,
  fromUnit: string,
  toUnit: string,
  category: string,
) => {
  if (category === 'temperature') {
    return unitsData[category][fromUnit](value, toUnit);
  } else {
    const conversionFactorFrom = unitsData[category][fromUnit];
    const conversionFactorTo = unitsData[category][toUnit];
    return (value * conversionFactorFrom) / conversionFactorTo;
  }
};

export const formatUnit = unit => {
  return unit
    .replace(/_/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
