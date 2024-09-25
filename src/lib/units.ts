type UnitConversionFunction = (value: number, toUnit: string) => number;

interface UnitsData {
  [key: string]: {
    [key: string]: number | UnitConversionFunction;
  };
}

type UnitCategory = keyof UnitsData;

const unsortedUnitsData: UnitsData = {
  angle: {
    degrees: Math.PI / 180,
    gradians: Math.PI / 200,
    radians: 1,
  },
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
  css_units: {
    pixels: 1,
    rem: 16,
  },
  data_storage: {
    bits: 1e-6,
    bytes: 8e-6,
    gigabytes: 8e3,
    kilobytes: 8e-3,
    megabytes: 8,
    petabytes: 8e9,
    terabytes: 8e6,
  },
  energy: {
    calories: 4.184,
    joules: 1,
    kilocalories: 4184,
    kilojoules: 1e3,
    kilowatt_hours: 3.6e6,
    watt_hours: 3600,
  },
  force: {
    kilonewtons: 1e3,
    newtons: 1,
    pounds_force: 4.44822,
  },
  frequency: {
    gigahertz: 1e9,
    hertz: 1,
    kilohertz: 1e3,
    megahertz: 1e6,
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
  power: {
    horsepower: 745.7,
    kilowatts: 1e3,
    megawatts: 1e6,
    watts: 1,
  },
  pressure: {
    atmospheres: 101325,
    bars: 1e5,
    pascals: 1,
    psi: 6894.76,
  },
  speed: {
    feet_per_second: 0.3048,
    kilometers_per_hour: 0.277778,
    knots: 0.514444,
    meters_per_second: 1,
    miles_per_hour: 0.44704,
  },
  temperature: {
    celsius: (value: number, toUnit: string): number => {
      if (toUnit === 'fahrenheit') {
        return (value * 9) / 5 + 32;
      } else if (toUnit === 'kelvin') {
        return value + 273.15;
      }
      return value;
    },
    fahrenheit: (value: number, toUnit: string): number => {
      if (toUnit === 'celsius') {
        return (value - 32) * (5 / 9);
      } else if (toUnit === 'kelvin') {
        return (value - 32) * (5 / 9) + 273.15;
      }
      return value;
    },
    kelvin: (value: number, toUnit: string): number => {
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

export const sortUnitsBySize = (unitsData: UnitsData): UnitsData => {
  const sortedData: UnitsData = {};

  Object.keys(unitsData).forEach(category => {
    const categoryData = unitsData[category as UnitCategory];

    if (category === 'temperature') {
      sortedData[category] = categoryData;
    } else {
      const sortedUnits = Object.entries(categoryData)
        .filter(([, value]) => typeof value === 'number')
        .sort(
          ([, valueA], [, valueB]) => (valueA as number) - (valueB as number),
        )
        .reduce(
          (acc, [unit, value]) => {
            acc[unit] = value as number;
            return acc;
          },
          {} as { [key: string]: number },
        );

      sortedData[category] = sortedUnits;
    }
  });

  return sortedData;
};

export const unitsData = sortUnitsBySize(unsortedUnitsData);

export const convert = (
  value: number,
  fromUnit: string,
  toUnit: string,
  category: keyof UnitsData,
): number => {
  if (category === 'temperature') {
    const conversionFunction = unitsData[category][
      fromUnit
    ] as UnitConversionFunction;
    return conversionFunction(value, toUnit);
  } else {
    const conversionFactorFrom = unitsData[category][fromUnit] as number;
    const conversionFactorTo = unitsData[category][toUnit] as number;
    return (value * conversionFactorFrom) / conversionFactorTo;
  }
};

export const formatUnit = (unit: string): string => {
  return unit
    .replace(/_/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
