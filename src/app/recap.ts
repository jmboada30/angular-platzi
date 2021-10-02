// recapitulacion conceptos basicos de TS
const userName = 'joelboada';

const sum = (a: number, b: number) => {
  return a + b;
};

sum(1, 3);

class Person {
  constructor(public age: number, public lastName: string) {}
}

const nico = new Person(28, 'Boada');
