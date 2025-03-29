// Importamos las clases necesarias
import { describe, expect, test } from "vitest";
import { Funko, FunkoType, FunkoGenre } from "../src/funkos/models/funko.js";

describe("Funko Class Tests", () => {
  let funko: Funko;

  // Instanciamos un objeto Funko antes de cada test
  funko = new Funko(
    "1",
    "Spider-Man",
    "Figura de Spider-Man con traje clásico",
    FunkoType.Pop,
    FunkoGenre.MoviesAndTV,
    "Marvel",
    123,
    true,
    "Brilla en la oscuridad",
    50.0
  );

  test("Creación de un Funko correctamente", () => {
    expect(funko.id).toBe("1");
    expect(funko.name).toBe("Spider-Man");
    expect(funko.description).toBe("Figura de Spider-Man con traje clásico");
    expect(funko.type).toBe(FunkoType.Pop);
    expect(funko.genre).toBe(FunkoGenre.MoviesAndTV);
    expect(funko.franchise).toBe("Marvel");
    expect(funko.number).toBe(123);
    expect(funko.isExclusive).toBe(true);
    expect(funko.specialFeatures).toBe("Brilla en la oscuridad");
    expect(funko.marketValue).toBe(50.0);
  });

  test("Convertir un Funko a JSON correctamente", () => {
    const funkoJSON = funko.toJSON();
    expect(funkoJSON).toEqual({
      id: "1",
      name: "Spider-Man",
      description: "Figura de Spider-Man con traje clásico",
      type: FunkoType.Pop,
      genre: FunkoGenre.MoviesAndTV,
      franchise: "Marvel",
      number: 123,
      isExclusive: true,
      specialFeatures: "Brilla en la oscuridad",
      marketValue: 50.0,
    });
  });

  test("Crear un Funko desde JSON correctamente", () => {
    const funkoJSON = {
      id: "2",
      name: "Batman",
      description: "Figura de Batman con traje negro",
      type: FunkoType.VinylSoda,
      genre: FunkoGenre.MoviesAndTV,
      franchise: "DC Comics",
      number: 456,
      isExclusive: false,
      specialFeatures: "Cabeza balancea",
      marketValue: 30.0,
    };

    const newFunko = Funko.fromJSON(funkoJSON);
        expect(newFunko.id).toBe("2");
        expect(newFunko.name).toBe("Batman");
        expect(newFunko.description).toBe("Figura de Batman con traje negro");
        expect(newFunko.type).toBe(FunkoType.VinylSoda);
        expect(newFunko.genre).toBe(FunkoGenre.MoviesAndTV);
        expect(newFunko.franchise).toBe("DC Comics");
        expect(newFunko.number).toBe(456);
        expect(newFunko.isExclusive).toBe(false);
        expect(newFunko.specialFeatures).toBe("Cabeza balancea");
        expect(newFunko.marketValue).toBe(30.0);
  });
});
