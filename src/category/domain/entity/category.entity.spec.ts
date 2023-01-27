import { Category } from "./category.entity";
import { omit } from "lodash";

describe("Category Unit Test", () => {
  describe("Constructor", () => {
    it("passed all parameters to the constructor", () => {
      const created_at = new Date();

      const entity = new Category(
        {
          name: "movie",
          description: "some description",
          is_active: false,
          created_at,
        },
        "df72a9be-1d35-4a86-94a0-e177978b31a2"
      );

      expect(entity.props).toStrictEqual({
        name: "movie",
        description: "some description",
        is_active: false,
        created_at,
      });

      expect(entity.id).toBe("df72a9be-1d35-4a86-94a0-e177978b31a2");
    });

    describe("field id", () => {
      const data: any[] = [
        null,
        undefined,
        "df72a9be-1d35-4a86-94a0-e177978b31a2",
      ];
      
      test.each(data)("validate %o", (i: any) => {
        const category = new Category({ name: "testing" }, i);
        expect(category.id).not.toBeNull();
      });
    })

    it("passed a minimum parameter to the constructor", () => {
      const entity = new Category({
        name: "movie 2",
      });

      expect(omit(entity.props, "created_at")).toStrictEqual({
        name: "movie 2",
        description: null,
        is_active: true,
      });

      expect(entity.created_at).toBeInstanceOf(Date);
      expect(entity.id).not.toBeNull();
    });

    describe("Getter and setter", () => {
      const created_at = new Date();

      const entity = new Category({
        name: "movie",
        description: "some description",
        is_active: false,
        created_at,
      });

      it("name prop", () => {
        expect(entity.name).toBe("movie");
        entity["name"] = "other movie";
        expect(entity.name).toBe("other movie");
      });

      it("description prop", () => {
        expect(entity.description).toBe("some description");
        entity["description"] = undefined;
        expect(entity.description).toBeNull();
      });

      it("is_active prop", () => {
        expect(entity.is_active).toBeFalsy();
        entity["is_active"] = undefined;
        expect(entity.is_active).toBeTruthy();
      });

      it("created_at prop", () => {
        expect(entity.created_at).toBe(created_at);
      });
    });
  });
});
