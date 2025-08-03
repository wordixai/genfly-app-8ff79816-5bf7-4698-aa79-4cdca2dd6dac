import { Brain, Bookmark, FileText, Image, Star, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useKnowledgeStore } from '@/store/knowledgeStore';
import { Badge } from '@/components/ui/badge';

export const StatsCards = () => {
  const { items } = useKnowledgeStore();

  const stats = {
    total: items.length,
    notes: items.filter(item => item.type === 'note').length,
    bookmarks: items.filter(item => item.type === 'bookmark').length,
    articles: items.filter(item => item.type === 'article').length,
    images: items.filter(item => item.type === 'image').length,
    favorites: items.filter(item => item.isFavorite).length,
  };

  const recentlyAdded = items.filter(item => {
    const daysSinceCreated = Math.floor(
      (Date.now() - new Date(item.createdAt).getTime()) / (1000 * 60 * 60 * 24)
    );
    return daysSinceCreated <= 7;
  }).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card className="neural-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Items</CardTitle>
          <Brain className="h-4 w-4 text-neural-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-neural-700">{stats.total}</div>
          <div className="flex items-center space-x-2 mt-2">
            <Badge variant="secondary" className="text-xs">
              +{recentlyAdded} this week
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="neural-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Notes</CardTitle>
          <FileText className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-neural-700">{stats.notes}</div>
          <p className="text-xs text-neural-500 mt-2">
            {stats.total > 0 ? Math.round((stats.notes / stats.total) * 100) : 0}% of total
          </p>
        </CardContent>
      </Card>

      <Card className="neural-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Bookmarks</CardTitle>
          <Bookmark className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-neural-700">{stats.bookmarks}</div>
          <p className="text-xs text-neural-500 mt-2">
            {stats.total > 0 ? Math.round((stats.bookmarks / stats.total) * 100) : 0}% of total
          </p>
        </CardContent>
      </Card>

      <Card className="neural-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Favorites</CardTitle>
          <Star className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-neural-700">{stats.favorites}</div>
          <p className="text-xs text-neural-500 mt-2">
            Your most valued items
          </p>
        </CardContent>
      </Card>
    </div>
  );
};