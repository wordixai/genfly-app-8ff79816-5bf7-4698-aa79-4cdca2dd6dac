import { Search, Plus, Settings, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useKnowledgeStore } from '@/store/knowledgeStore';

interface HeaderProps {
  onNewItem: () => void;
}

export const Header = ({ onNewItem }: HeaderProps) => {
  const { searchQuery, setSearchQuery } = useKnowledgeStore();

  return (
    <header className="border-b border-neural-200 bg-white/80 backdrop-blur-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-neural-gradient rounded-xl">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-neural-700">Neural</h1>
              <p className="text-xs text-neural-500">Your AI Knowledge Hub</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neural-500 h-5 w-5" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search your knowledge base..."
                className="neural-input pl-12 w-full h-12"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <Button
              onClick={onNewItem}
              className="neural-button h-12"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Item
            </Button>
            <Button variant="outline" size="icon" className="h-12 w-12">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};