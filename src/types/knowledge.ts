export interface KnowledgeItem {
  id: string;
  title: string;
  content: string;
  type: 'note' | 'bookmark' | 'article' | 'image';
  tags: string[];
  category: string;
  createdAt: string;
  updatedAt: string;
  url?: string;
  imageUrl?: string;
  excerpt?: string;
  isFavorite: boolean;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
  count: number;
}

export interface SearchFilters {
  type?: KnowledgeItem['type'];
  category?: string;
  tags?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
}