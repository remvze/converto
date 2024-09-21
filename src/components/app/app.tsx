import { useState, useEffect } from 'react';
import { FaRegCopy, FaCheck } from 'react-icons/fa6';

import { Container } from '../container';

import { useCopy } from '@/hooks/use-copy';
import { unitsData, convert, formatUnit } from '@/lib/units';
import { cn } from '@/helpers/styles';

import styles from './app.module.css';

export function App() {
  const [value1, setValue1] = useState(1);
  const [unit1, setUnit1] = useState('meters');
  const [value2, setValue2] = useState(1);
  const [unit2, setUnit2] = useState('kilometers');
  const [category, setCategory] = useState('length');

  const { copy: copyUnit1, copying: copyingUnit1 } = useCopy();
  const { copy: copyUnit2, copying: copyingUnit2 } = useCopy();

  const handleValue1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    setValue1(newValue);
    setValue2(convert(newValue, unit1, unit2, category));
  };

  const handleValue2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    setValue2(newValue);
    setValue1(convert(newValue, unit2, unit1, category));
  };

  const handleUnit1Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newUnit = e.target.value;
    setUnit1(newUnit);
    setValue2(convert(value1, newUnit, unit2, category));
  };

  const handleUnit2Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newUnit = e.target.value;
    setUnit2(newUnit);
    setValue2(convert(value1, unit1, newUnit, category));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value;
    const defaultUnit1 = Object.keys(unitsData[newCategory])[0];
    const defaultUnit2 = Object.keys(unitsData[newCategory])[1];

    setCategory(newCategory);
    setUnit1(defaultUnit1);
    setUnit2(defaultUnit2);
    setValue2(convert(value1, defaultUnit1, defaultUnit2, newCategory));
  };

  useEffect(() => {
    setValue2(convert(value1, unit1, unit2, category));
  }, [category, unit1, unit2]);

  return (
    <Container>
      <form className={styles.form} onSubmit={e => e.preventDefault()}>
        <div className={styles.category}>
          <select value={category} onChange={handleCategoryChange}>
            {Object.keys(unitsData).map(cat => (
              <option key={cat} value={cat}>
                {formatUnit(cat)}
              </option>
            ))}
          </select>
        </div>

        <div className={cn(styles.unit, styles.one)}>
          <div className={styles.inputWrapper}>
            <input type="number" value={value1} onChange={handleValue1Change} />

            <button onClick={() => copyUnit1(value1.toString())}>
              {copyingUnit1 ? <FaCheck /> : <FaRegCopy />}
            </button>
          </div>

          <select value={unit1} onChange={handleUnit1Change}>
            {Object.keys(unitsData[category]).map(unit => (
              <option key={unit} value={unit}>
                {formatUnit(unit)}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.to}>
          <div />
          <p>TO</p>
          <div />
        </div>

        <div className={cn(styles.unit, styles.two)}>
          <div className={styles.inputWrapper}>
            <input type="number" value={value2} onChange={handleValue2Change} />

            <button onClick={() => copyUnit2(value2.toString())}>
              {copyingUnit2 ? <FaCheck /> : <FaRegCopy />}
            </button>
          </div>

          <select value={unit2} onChange={handleUnit2Change}>
            {Object.keys(unitsData[category]).map(unit => (
              <option key={unit} value={unit}>
                {formatUnit(unit)}
              </option>
            ))}
          </select>
        </div>
      </form>
      <p className={styles.donate}>
        Support us with a{' '}
        <a
          href="https://buymeacoffee.com/remvze"
          rel="noreferrer"
          target="_blank"
        >
          donation
        </a>
        !
      </p>
    </Container>
  );
}
