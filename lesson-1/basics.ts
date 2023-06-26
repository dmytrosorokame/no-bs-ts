// Record

const ids: Record<number, string> = {
  10: "a",
  20: "b",
};

ids[30] = "c";

// Number is not valid value
if (ids[30] === "D") {
  // ...
}

for (let i = 0; i < 30; i++) {
  console.log(i);
}

[1, 2, 3].forEach((v) => console.log(v));
