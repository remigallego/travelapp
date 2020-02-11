import create from 'zustand';
import Backend from '../Backend';

interface SearchState {
  query: string;
  loading: boolean;
  places: string[];
}

const logger = (fn: Function) => (set, get) =>
  fn(args => {
    set(args);
    console.log('  new state', get());
  }, get);

const [useSearchStore] = create<SearchState>(
  logger((set, get) => ({
    query: '',
    places: [],
    loading: false,
    setQuery: (query: string) => {
      set(() => ({ query }), 'setQuery');
    },
    setPlaces: async () => {
      try {
        set(() => ({ loading: true }));
        const places = await Backend.getPlaces(get().query);
        set(() => ({ places, loading: false }));
      } catch (e) {
        get().setPlaces();
      }
    },
  })),
);

export default useSearchStore;
