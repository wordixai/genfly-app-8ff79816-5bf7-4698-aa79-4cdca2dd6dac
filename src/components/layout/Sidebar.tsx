import { Brain, Bookmark, FileText, Image, Star, Plus, Folder } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useKnowledgeStore } from '@/store/knowledgeStore';
import { cn } from '@/lib/utils';

const typeIcons = {
  note: FileText,
  bookmark: Bookmark,
  article: FileText,
  image: Image,
};

export const Sidebar = () => {
  const {
    categories,
    selectedCategory,
    setSelectedCategory,
    searchFilters,
    setSearchFilters,
    items,
  } = useKnowledgeStore();

  const typeCounts = {
    note: items.filter(item => item.type === 'note').length,
    bookmark: items.filter(item => item.type === 'bookmark').length,
    article: items.filter(item => item.type === 'article').length,
    image: items.filter(item => item.type === 'image').length,
    favorites: items.filter(item => item.isFavorite).length,
  };

  return (
    <aside className="w-72 border-r border-neural-200 bg-neural-subtle h-full overflow-y-auto">
      <div className="p-6 space-y-8">
        {/* Quick Filters */}
        <div className="space-y-4">
          <h3 className="font-semibold text-neural-700 text-sm uppercase tracking-wider">
            Quick Access
          </h3>
          <div className="space-y-2">
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-between h-10",
                !selectedCategory && !searchFilters.type && "bg-neural-200"
              )}
              onClick={() => {
                setSelectedCategory(null);
                setSearchFilters({});
              }}
            >
              <div className="flex items-center space-x-3">
                <Brain className="h-4 w-4 text-neural-600" />
                <span>All Items</span>
              </div>
              <Badge variant="secondary">{items.length}</Badge>
            </Button>

            <Button
              variant="ghost"
              className={cn(
                "w-full justify-between h-10",
                searchFilters.type === undefined && selectedCategory === 'favorites' && "bg-neural-200"
              )}
              onClick={() => {
                setSelectedCategory('favorites');
                setSearchFilters({});
              }}
            >
              <div className="flex items-center space-x-3">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>Favorites</span>
              </div>
              <Badge variant="secondary">{typeCounts.favorites}</Badge>
            </Button>
          </div>
        </div>

        {/* Content Types */}
        <div className="space-y-4">
          <h3 className="font-semibold text-neural-700 text-sm uppercase tracking-wider">
            Content Types
          </h3>
          <div className="space-y-2">
            {Object.entries(typeIcons).map(([type, Icon]) => (
              <Button
                key={type}
                variant="ghost"
                className={cn(
                  "w-full justify-between h-10",
                  searchFilters.type === type && "bg-neural-200"
                )}
                onClick={() => {
                  setSelectedCategory(null);
                  setSearchFilters({ type: type as any });
                }}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="h-4 w-4 text-neural-600" />
                  <span className="capitalize">{type}s</span>
                </div>
                <Badge variant="secondary">{typeCounts[type as keyof typeof typeCounts]}</Badge>
              </Button>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-neural-700 text-sm uppercase tracking-wider">
              Categories
            </h3>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant="ghost"
                className={cn(
                  "w-full justify-between h-10",
                  selectedCategory === category.name && "bg-neural-200"
                )}
                onClick={() => {
                  setSelectedCategory(category.name);
                  setSearchFilters({});
                }}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <span>{category.name}</span>
                </div>
                <Badge variant="secondary">{category.count}</Badge>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};