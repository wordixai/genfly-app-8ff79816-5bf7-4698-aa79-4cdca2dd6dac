import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { KnowledgeItem, Category, SearchFilters } from '../types/knowledge';
import { v4 as uuidv4 } from 'uuid';

interface KnowledgeStore {
  items: KnowledgeItem[];
  categories: Category[];
  searchQuery: string;
  searchFilters: SearchFilters;
  selectedCategory: string | null;
  
  // Actions
  addItem: (item: Omit<KnowledgeItem, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateItem: (id: string, updates: Partial<KnowledgeItem>) => void;
  deleteItem: (id: string) => void;
  toggleFavorite: (id: string) => void;
  
  // Categories
  addCategory: (category: Omit<Category, 'id' | 'count'>) => void;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  
  // Search and filters
  setSearchQuery: (query: string) => void;
  setSearchFilters: (filters: SearchFilters) => void;
  setSelectedCategory: (category: string | null) => void;
  
  // Computed
  getFilteredItems: () => KnowledgeItem[];
  getCategoryCounts: () => void;
}

const defaultCategories: Category[] = [
  { id: '1', name: 'Learning', color: '#8B5CF6', icon: 'Brain', count: 0 },
  { id: '2', name: 'Research', color: '#10B981', icon: 'Search', count: 0 },
  { id: '3', name: 'Ideas', color: '#F59E0B', icon: 'Lightbulb', count: 0 },
  { id: '4', name: 'Resources', color: '#EF4444', icon: 'Bookmark', count: 0 },
  { id: '5', name: 'Projects', color: '#3B82F6', icon: 'FolderOpen', count: 0 },
];

export const useKnowledgeStore = create<KnowledgeStore>()(
  persist(
    (set, get) => ({
      items: [],
      categories: defaultCategories,
      searchQuery: '',
      searchFilters: {},
      selectedCategory: null,

      addItem: (itemData) => {
        const newItem: KnowledgeItem = {
          ...itemData,
          id: uuidv4(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        set((state) => ({
          items: [newItem, ...state.items]
        }));
        get().getCategoryCounts();
      },

      updateItem: (id, updates) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? { ...item, ...updates, updatedAt: new Date().toISOString() }
              : item
          )
        }));
        get().getCategoryCounts();
      },

      deleteItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id)
        }));
        get().getCategoryCounts();
      },

      toggleFavorite: (id) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? { ...item, isFavorite: !item.isFavorite, updatedAt: new Date().toISOString() }
              : item
          )
        }));
      },

      addCategory: (categoryData) => {
        const newCategory: Category = {
          ...categoryData,
          id: uuidv4(),
          count: 0,
        };
        
        set((state) => ({
          categories: [...state.categories, newCategory]
        }));
      },

      updateCategory: (id, updates) => {
        set((state) => ({
          categories: state.categories.map((category) =>
            category.id === id ? { ...category, ...updates } : category
          )
        }));
      },

      deleteCategory: (id) => {
        set((state) => ({
          categories: state.categories.filter((category) => category.id !== id)
        }));
      },

      setSearchQuery: (query) => {
        set({ searchQuery: query });
      },

      setSearchFilters: (filters) => {
        set({ searchFilters: filters });
      },

      setSelectedCategory: (category) => {
        set({ selectedCategory: category });
      },

      getFilteredItems: () => {
        const { items, searchQuery, searchFilters, selectedCategory } = get();
        
        return items.filter((item) => {
          // Text search
          if (searchQuery) {
            const query = searchQuery.toLowerCase();
            const searchableText = `${item.title} ${item.content} ${item.tags.join(' ')}`.toLowerCase();
            if (!searchableText.includes(query)) return false;
          }
          
          // Category filter
          if (selectedCategory && item.category !== selectedCategory) return false;
          
          // Type filter
          if (searchFilters.type && item.type !== searchFilters.type) return false;
          
          // Tag filter
          if (searchFilters.tags && searchFilters.tags.length > 0) {
            if (!searchFilters.tags.some(tag => item.tags.includes(tag))) return false;
          }
          
          return true;
        });
      },

      getCategoryCounts: () => {
        const { items, categories } = get();
        
        const updatedCategories = categories.map((category) => ({
          ...category,
          count: items.filter((item) => item.category === category.name).length,
        }));
        
        set({ categories: updatedCategories });
      },
    }),
    {
      name: 'knowledge-store',
    }
  )
);