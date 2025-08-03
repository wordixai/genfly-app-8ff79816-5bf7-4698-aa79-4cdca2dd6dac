import { useState } from 'react';
import { useKnowledgeStore } from '@/store/knowledgeStore';
import { KnowledgeCard } from './KnowledgeCard';
import { AddItemDialog } from './AddItemDialog';
import { Button } from '@/components/ui/button';
import { LayoutGrid, List, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

export const KnowledgeGrid = () => {
  const { getFilteredItems, selectedCategory } = useKnowledgeStore();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showAddDialog, setShowAddDialog] = useState(false);
  
  const filteredItems = getFilteredItems();

  const handleNewItem = () => {
    setShowAddDialog(true);
  };

  if (selectedCategory === 'favorites') {
    const favoriteItems = filteredItems.filter(item => item.isFavorite);
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-neural-700">Favorites</h2>
            <p className="text-neural-500">Your starred knowledge items</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode('grid')}
              className={cn(viewMode === 'grid' && 'bg-neural-100')}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode('list')}
              className={cn(viewMode === 'list' && 'bg-neural-100')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className={cn(
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
            : 'space-y-4'
        )}>
          {favoriteItems.map((item) => (
            <KnowledgeCard key={item.id} item={item} viewMode={viewMode} />
          ))}
        </div>

        <AddItemDialog 
          open={showAddDialog} 
          onOpenChange={setShowAddDialog}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-neural-700">
            {selectedCategory || 'All Knowledge'}
          </h2>
          <p className="text-neural-500">
            {filteredItems.length} items in your knowledge base
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewMode('grid')}
            className={cn(viewMode === 'grid' && 'bg-neural-100')}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewMode('list')}
            className={cn(viewMode === 'list' && 'bg-neural-100')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-neural-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <LayoutGrid className="h-12 w-12 text-neural-400" />
          </div>
          <h3 className="text-xl font-semibold text-neural-700 mb-2">
            No items found
          </h3>
          <p className="text-neural-500 mb-6">
            Start building your knowledge base by adding your first item.
          </p>
          <Button onClick={handleNewItem} className="neural-button">
            Add Your First Item
          </Button>
        </div>
      )}

      {/* Items Grid */}
      {filteredItems.length > 0 && (
        <div className={cn(
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
            : 'space-y-4'
        )}>
          {filteredItems.map((item) => (
            <KnowledgeCard key={item.id} item={item} viewMode={viewMode} />
          ))}
        </div>
      )}

      <AddItemDialog 
        open={showAddDialog} 
        onOpenChange={setShowAddDialog}
      />
    </div>
  );
};