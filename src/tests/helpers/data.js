export const storageMock = (() => {
    let store = {
      ranking: [
        { name: 'Gabriela', assertions: 5, score: 360, gravatarEmail: 'gabriela@test.com' },
        { name: 'trybe', assertions: 2, score: 200, gravatarEmail: 'trybe@test.com' },
        { name: 'jogador', assertions: 1, score: 100, gravatarEmail: 'jogador@test.com' },
      ],
    };
 
    return {
      getItem(key) {
        return JSON.stringify(store[key]);
      },
 
      setItem(key, value) {
        store[key] = value;
      },
 
      clear() {
        store = {};
      },
 
      removeItem(key) {
        delete store[key];
      },
 
      getAll() {
        return store;
      },
    };
  })();
 