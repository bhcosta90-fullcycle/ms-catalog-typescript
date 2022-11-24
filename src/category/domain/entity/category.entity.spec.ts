import {
  CategoryEntity as Entity,
  CategoryProps as EntityProps,
} from "./category.entity";
import { validate } from "uuid";

describe("CategoryEntity Unit Test", () => {
  it("constructor", () => {
    let category = new Entity({
      name: "Test",
    });

    expect(category.name).toBe("Test");
    expect(category.is_active).toBeTruthy();
    expect(category.description).toBeNull();
    expect(category.created_at).toBeInstanceOf(Date);

    category = new Entity({
      name: "Test",
      description: "Test",
      is_active: false,
    });

    expect(category.is_active).toBeFalsy();
    expect(category.description).toBe("Test");

    const created_at = new Date();
    category = new Entity({
      name: "Test",
      created_at,
    });

    expect(category.created_at).toBe(created_at);
  });

  it("id field", () => {
    type TypeData = { props: EntityProps; id: string };

    const list: TypeData[] = [
      { props: { name: "t" }, id: null },
      { props: { name: "t" }, id: undefined },
      { props: { name: "t" }, id: "b92df8aa-f44f-45a8-a06d-8f8fe64f64c6" },
    ];

    list.map((rs: TypeData) => {
      const category = new Entity(rs.props, rs.id);
      expect(category.id).not.toBeNull;
      expect(validate(category.id)).toBeTruthy;
    });
  });
});
