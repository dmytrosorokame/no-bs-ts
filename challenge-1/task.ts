const houses = [
  { name: "Atreides", planets: "Calladan" },
  { name: "Corrino", planets: ["Kaitan", "Salusa Secundus"] },
  { name: "Harkonnen", planets: ["Giedi Prime", "Arrakis"] },
];

interface House {
  name: string;
  planets: string | string[];
}

interface HouseWithID extends House {
  id: number;
}

function findHouses(
  houses: string | House[],
  filter?: (val: House) => boolean
): HouseWithID[] {
  const resultHouses: House[] = [];

  if (typeof houses === "string") {
    resultHouses.push(...JSON.parse(houses));
  } else {
    resultHouses.push(...houses);
  }

  const housesWithIds: HouseWithID[] = resultHouses.map((house, index) => ({
    id: index,
    ...house,
  }));

  if (filter) {
    return housesWithIds.filter(filter);
  }

  return housesWithIds;
}

console.log(
  findHouses(JSON.stringify(houses), ({ name }) => name === "Atreides")
);

console.log(findHouses(houses, ({ name }) => name === "Harkonnen"));
