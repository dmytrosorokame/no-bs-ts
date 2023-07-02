// Interfaces vs Types

// Error case, we can't duplicate types

// type Person = {
//   first: string;
// };

// type Person = {
//   last: string;
// };

interface Person {
  first: string;
}

interface Person {
  last: string;
}

const p: Person = {
  first: "first",
  last: "last",
};

type PersonName = string | number;

// Getters & Setters

class Person2 {
  private _job: string;

  constructor(public first: string, public last: string) {
    this._job = "";
  }

  get fullName(): string {
    return `${this.first} ${this.last}`;
  }

  set job(newJob: string) {
    // Check permission
    this._job = newJob;
  }
}

const p2 = new Person2("d", "s");

p2.fullName;

p2.job = "Engineer";

// Numeric literals issue

type PossibleDice = 1 | 2 | 3 | 4;

function rollDice(num: 1 | 2 | 3 | 4) {
  return 0;
}

let a: PossibleDice = 4;

rollDice(a);

// TS bloat code

const p3 = {
  first: "dmytro",
  last: "soroka",
};

const p4 = { ...p3 };

// No default exports !!

class Person3 {}

export default Person3;

// import Person3 from '../person'

// Tuples vs Objects in custom hooks

function getUser() {
  return {
    user: "jack",
    id: "fo",
  };
}

const { id } = getUser();

// Really awful
function getUserTuple(): [string, string] {
  return ["Jack", "foo"];
}

const [_, id2] = getUserTuple();

// Great case
// const [name, setName] = useState("")
// const [age, setAge] = useState(20)

// Every times using remaping, it's also awful
// const { state: name, setState: setName } = useState("");

// Share types between FE & BE

interface Person5 {
  first: string;
  last: string;
}

function printPerson(person: Person5) {
  console.log(person);
}

// Making a specific field optional

interface Person6 {
  id: string;
  name?: string;
  age?: number;
}

type PersonWithRequiredAge = Person6 & Required<Pick<Person6, "age">>;

function printPerson2(p: PersonWithRequiredAge) {}

printPerson2({
  id: "23",
  age: 23,
});

// Should we be inferring more?

// Don't need provide the return type
function addNumbers(a: number, b: number) {
  return a + b;
}

// In that case we need
function reallyComplexFun(moonIsInShadow: boolean): string | undefined {
  if (moonIsInShadow) {
    return;
  }

  return "";
}
