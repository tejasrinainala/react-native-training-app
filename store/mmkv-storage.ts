import { StateStorage } from 'zustand/middleware';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV({
  id: 'balance-storage',
});

export const zustandStorage: StateStorage = {
  setItem: (name, value) => {
    storage.set(name, value);
    return Promise.resolve();
  },
  getItem: (name) => {
    const value = storage.getString(name);
    return Promise.resolve(value ?? null);
  },
  removeItem: (name) => {
    storage.delete(name);
    return Promise.resolve();
  },
};
