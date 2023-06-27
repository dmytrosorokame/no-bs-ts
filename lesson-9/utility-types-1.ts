interface MyUser {
  name: string;
  id: string;
  email?: string;
}

type MyUserOptional = Partial<MyUser>;

const merge = (user: MyUser, overrides: MyUserOptional): MyUser => {
  return {
    ...user,
    ...overrides,
  };
};

console.log(
  merge(
    { name: "Jack", id: "foo", email: "asdasd" },
    { email: "jack@gmail.com" }
  )
);

type RequiredMyUser = Required<MyUser>;

type PickedMyUser = Pick<MyUser, "email" | "name">;

type OmittedUser = Omit<MyUser, "id">;

const mapById = (users: MyUser[]): Record<MyUser["id"], OmittedUser> => {
  return users.reduce((acc, el) => {
    const { id, ...other } = el;
    return {
      ...acc,
      [id]: other,
    };
  }, {});
};

console.log(
  mapById([
    { id: "foo", name: "Foo" },
    { id: "baz", name: "Baz" },
  ])
);
