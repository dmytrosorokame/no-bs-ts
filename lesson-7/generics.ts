function simpleState<T>(initial: T): [() => T, (v: T) => void] {
  let data: T = initial;

  return [
    () => data,
    (v: T) => {
      data = v;
    },
  ];
}

const [getState1, setState1] = simpleState(10);
console.log(getState1());
setState1(62);
console.log(getState1());

const [getState2, setState2] = simpleState<null | string>(null);
console.log(getState2());
setState2("main");
console.log(getState2());

interface Rank<RankItem> {
  item: RankItem;
  rank: number;
}

function ranker<RankItem>(
  items: RankItem[],
  rank: (v: RankItem) => number
): RankItem[] {
  const ranks: Rank<RankItem>[] = items.map((item) => ({
    item,
    rank: rank(item),
  }));

  ranks.sort((a, b) => a.rank - b.rank);

  return ranks.map((rank) => rank.item);
}

interface Pokemon {
  name: string;
  hp: number;
}

const pokemons: Pokemon[] = [
  {
    name: "Bulbasaur",
    hp: 20,
  },

  {
    name: "Megaasaur",
    hp: 5,
  },
];

const ranks = ranker(pokemons, ({ hp }) => hp);

console.log(ranks);
