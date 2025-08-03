import { useState } from 'react';
import { Calendar, Star, ExternalLink, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { KnowledgeItem } from '@/types/knowledge';
import { useKnowledgeStore } from '@/store/knowledgeStore';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface KnowledgeCardProps {
  item: KnowledgeItem;
  viewMode: 'grid' | 'list';
}

const typeColors = {
  note: 'bg-blue-100 text-blue-700',
  bookmark: 'bg-green-100 text-green-700',
  article: 'bg-purple-100 text-purple-700',
  image: 'bg-orange-100 text-orange-700',
};

export const KnowledgeCard = ({ item, viewMode }: KnowledgeCardProps) => {
  const { toggleFavorite, deleteItem } = useKnowledgeStore();
  const [isHovered, setIsHovered] = useState(false);

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(item.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteItem(item.id);
  };

  const handleCardClick = () => {
    if (item.url && item.type === 'bookmark') {
      window.open(item.url, '_blank');
    }
  };

  if (viewMode === 'list') {
    return (
      <Card 
        className={cn(
          "neural-card p-6 cursor-pointer transition-all duration-300 hover:scale-[1.02]",
          item.type === 'bookmark' && "hover:shadow-lg"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCardClick}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-3">
            <div className="flex items-start space-x-4">
              {item.imageUrl && (
                <img 
                  src={item.imageUrl} 
                  alt={item.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
              )}
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <Badge variant="secondary" className={typeColors[item.type]}>
                    {item.type}
                  </Badge>
                  {item.category && (
                    <Badge variant="outline" className="text-xs">
                      {item.category}
                    </Badge>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-neural-700 mb-1">
                  {item.title}
                </h3>
                <p className="text-neural-600 text-sm line-clamp-2">
                  {item.excerpt || item.content}
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-xs text-neural-500">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>{format(new Date(item.createdAt), 'MMM d, yyyy')}</span>
                </div>
                {item.url && (
                  <div className="flex items-center space-x-1">
                    <ExternalLink className="h-3 w-3" />
                    <span className="truncate max-w-32">
                      {new URL(item.url).hostname}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="flex flex-wrap gap-1">
                  {item.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {item.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{item.tags.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleFavorite}
              className={cn(
                "h-8 w-8",
                item.isFavorite ? "text-yellow-500" : "text-neural-400 hover:text-yellow-500"
              )}
            >
              <Star className={cn("h-4 w-4", item.isFavorite && "fill-current")} />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDelete} className="text-red-600">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card 
      className={cn(
        "neural-card overflow-hidden group cursor-pointer transition-all duration-300",
        isHovered && "scale-105 shadow-2xl",
        item.type === 'bookmark' && "hover:shadow-lg"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {item.imageUrl && (
        <div className="aspect-video overflow-hidden">
          <img 
            src={item.imageUrl} 
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
      )}
      
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className={typeColors[item.type]}>
              {item.type}
            </Badge>
            {item.category && (
              <Badge variant="outline" className="text-xs">
                {item.category}
              </Badge>
            )}
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleFavorite}
            className={cn(
              "h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity",
              item.isFavorite && "opacity-100 text-yellow-500"
            )}
          >
            <Star className={cn("h-4 w-4", item.isFavorite && "fill-current")} />
          </Button>
        </div>
        
        <h3 className="font-semibold text-neural-700 mb-2 line-clamp-2">
          {item.title}
        </h3>
        
        <p className="text-neural-600 text-sm line-clamp-3 mb-4">
          {item.excerpt || item.content}
        </p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {item.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {item.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{item.tags.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="px-6 py-4 bg-neural-50/50 border-t border-neural-100">
        <div className="flex items-center justify-between w-full text-xs text-neural-500">
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3" />
            <span>{format(new Date(item.createdAt), 'MMM d')}</span>
          </div>
          {item.url && (
            <div className="flex items-center space-x-1">
              <ExternalLink className="h-3 w-3" />
              <span className="truncate max-w-24">
                {new URL(item.url).hostname}
              </span>
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};