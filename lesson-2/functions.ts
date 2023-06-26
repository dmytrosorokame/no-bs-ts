function addNumbers(a: number, b: number) {
  return a + b;
}

export default addNumbers;

export const addStrings = (str1: string, str2: string = ""): string =>
  `${str1} ${str2}`;

export const format = (title: string, param: string | number) => {
  return `${title} ${param}`;
};

export const printFormat = (title: string, param: string | number): void => {
  console.log(format(title, param));
};

export const fetchData = (url: string): Promise<string> => {
  return Promise.resolve(`Data from ${url}`);
};

function introduce(salutation: string, ...names: string[]): string {
  return `${salutation} ${names.join(" ")}`;
}

export function getName(user: { first: string; last: string }): string {
  return `${user.first} ${user.last}`;
}
