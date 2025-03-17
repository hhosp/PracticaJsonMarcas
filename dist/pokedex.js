"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var URL2 = 'https://pokeapi.co/api/v2/pokemon/';
var searchInput = document.getElementById("search");
var pokemonContainer = document.getElementById("pokemon-container");
var searchButton = document.getElementById("search-button");
function fetchData() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, pokemons, pokemonNames, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch(URL2 + '?limit=1000')];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    pokemons = data.results;
                    pokemonNames = pokemons.map(function (pokemon) { return pokemon.name; });
                    console.log(pokemonNames);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error:', error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
fetchData();
function searchPokemon() {
    return __awaiter(this, void 0, void 0, function () {
        var searchedPokemon, response, data, pokemonData, pokemonName, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    searchedPokemon = searchInput === null || searchInput === void 0 ? void 0 : searchInput.value.toLowerCase();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch("".concat(URL2, "/").concat(searchedPokemon))];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    pokemonData = data;
                    pokemonName = pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1);
                    if (pokemonContainer) {
                        pokemonContainer.innerHTML =
                            "\n        <h3 id = \"pokemon-name\">".concat(pokemonName, "</h3>\n        <img id = \"pokemon-img\" src=\"").concat(pokemonData.sprites.front_default, "\" alt=\"").concat(pokemonData.name, "\">\n        <p id = \"pokemon-type\">Type: ").concat(pokemonData.types && pokemonData.types.length > 0 ? pokemonData.types.filter(function (typeInfo) { return typeInfo.type.name; }).map(function (typeInfo) { return typeInfo.type.name; }).join(', ') : 'Unknown', "</p>\n      ");
                    }
                    else {
                        console.error('Pokemon Container is null');
                    }
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _a.sent();
                    console.error(error_2);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
//Event listener per a trucar la funció searchPokemon si es dona click en el botó de buscar
searchButton === null || searchButton === void 0 ? void 0 : searchButton.addEventListener("click", searchPokemon);
//Event listener per a trucar la funció e si es presiona una tecla
searchInput === null || searchInput === void 0 ? void 0 : searchInput.addEventListener("keypress", function (e) {
    //Si la tecla presionada es Enter es truca a la funcio searchPokemon
    if (e.key === "Enter") {
        searchPokemon();
    }
});
