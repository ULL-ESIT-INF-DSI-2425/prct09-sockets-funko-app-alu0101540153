import { describe, expect, test, beforeEach } from "vitest";
import { FileManager } from "../src/funkos/storage/fileManager.js";
import { Funko, FunkoType, FunkoGenre } from "../src/funkos/models/funko.js";
import fs from "fs";
import path from "path";

describe("FileManager Class Tests", () => {
  let fileManager: FileManager;
  const user = "testUser";
  const testDir = path.join(__dirname, "../data", user);

  // Crear algunos Funkos de ejemplo
  const funko1 = new Funko(
    "1", // ID
    "Classic Sonic", // Nombre
    "The best Sonic Funko ever", // Descripción
    FunkoType.Pop, // Tipo
    FunkoGenre.VideoGames, // Género
    "Sonic The Hedgehog", // Franquicia
    1, // Número
    true, // Exclusivo
    "Brilla en la oscuridad", // Características especiales
    150 // Valor de mercado
  );

  const funko2 = new Funko(
    "2", // ID
    "Batman", // Nombre
    "The Dark Knight", // Descripción
    FunkoType.Pop, // Tipo
    FunkoGenre.MoviesAndTV, // Género
    "DC Comics", // Franquicia
    2, // Número
    false, // Exclusivo
    "Cabeza balancea", // Características especiales
    75 // Valor de mercado
  );

  // Limpiar el directorio de pruebas antes de cada test
  beforeEach(() => {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true });
    }
    fileManager = new FileManager();
  });

  test("Añadir un Funko correctamente", () => {
    const result = fileManager.saveFunko(user, funko1);
    expect(result).toContain("Nuevo Funko añadido a la colección de testUser.");
    expect(fs.existsSync(path.join(testDir, "1.json"))).toBe(true);
  });

  test("Añadir un Funko con ID duplicado debe fallar", () => {
    fileManager.saveFunko(user, funko1); // Añadir el primer Funko
    const result = fileManager.saveFunko(user, funko1); // Intentar añadir el mismo Funko
    expect(result).toContain("Error: Ya existe un Funko con el ID 1 en la colección de testUser.");
  });

  test("Listar Funkos correctamente", () => {
    fileManager.saveFunko(user, funko1);
    fileManager.saveFunko(user, funko2);
    const result = fileManager.listFunkos(user);
    expect(result).toContain("Colección de Funkos de testUser:");
    expect(result).toContain("Classic Sonic");
    expect(result).toContain("Batman");
  });

  test("Mostrar información de un Funko existente", () => {
    fileManager.saveFunko(user, funko1);
    const result = fileManager.showFunkoInfo(user, "1");
    expect(result).toContain("ID: 1");
    expect(result).toContain("Nombre: Classic Sonic");
    expect(result).toContain("Valor de mercado: 150€");
  });

  test("Mostrar información de un Funko inexistente debe fallar", () => {
    const result = fileManager.showFunkoInfo(user, "99");
    expect(result).toContain("Error: No existe un Funko con el ID 99 en la colección de testUser.");
  });

  test("Actualizar un Funko correctamente", () => {
    fileManager.saveFunko(user, funko1);
    const updatedFunko = new Funko(
      "1", // Mismo ID
      "Classic Sonic Updated", // Nuevo nombre
      "The best Sonic Funko ever (Updated)", // Nueva descripción
      FunkoType.Pop, // Tipo
      FunkoGenre.VideoGames, // Género
      "Sonic The Hedgehog", // Franquicia
      1, // Número
      true, // Exclusivo
      "Brilla en la oscuridad y cabeza balancea", // Nueva característica especial
      200 // Nuevo valor de mercado
    );
    const result = fileManager.updateFunko(user, updatedFunko);
    expect(result).toContain("Funko actualizado en la colección de testUser.");
    const info = fileManager.showFunkoInfo(user, "1");
    expect(info).toContain("Nombre: Classic Sonic Updated");
    expect(info).toContain("Valor de mercado: 200€");
  });

  test("Eliminar un Funko correctamente", () => {
    fileManager.saveFunko(user, funko1);
    const result = fileManager.removeFunko(user, "1");
    expect(result).toContain("Funko eliminado de la colección de testUser.");
    expect(fs.existsSync(path.join(testDir, "1.json"))).toBe(false);
  });

  test("Eliminar un Funko inexistente debe fallar", () => {
    const result = fileManager.removeFunko(user, "99");
    expect(result).toContain("Error: No existe un Funko con el ID 99 en la colección de testUser.");
  });
});