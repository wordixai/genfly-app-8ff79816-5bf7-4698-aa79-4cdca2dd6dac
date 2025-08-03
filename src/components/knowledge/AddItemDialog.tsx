import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { FileText, Bookmark, Image, Link, Tag, X } from 'lucide-react';
import { useKnowledgeStore } from '@/store/knowledgeStore';
import { KnowledgeItem } from '@/types/knowledge';
import { cn } from '@/lib/utils';

interface AddItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const typeIcons = {
  note: FileText,
  bookmark: Bookmark,
  article: FileText,
  image: Image,
};

export const AddItemDialog = ({ open, onOpenChange }: AddItemDialogProps) => {
  const { addItem, categories } = useKnowledgeStore();
  const [selectedType, setSelectedType] = useState<KnowledgeItem['type']>('note');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [url, setUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = () => {
    if (!title.trim()) return;

    addItem({
      title: title.trim(),
      content: content.trim(),
      type: selectedType,
      tags,
      category,
      url: url.trim() || undefined,
      imageUrl: imageUrl.trim() || undefined,
      excerpt: content.trim().substring(0, 150),
      isFavorite: false,
    });

    // Reset form
    setTitle('');
    setContent('');
    setUrl('');
    setImageUrl('');
    setCategory('');
    setTags([]);
    setTagInput('');
    setSelectedType('note');
    onOpenChange(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSubmit();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Knowledge Item</DialogTitle>
        </DialogHeader>

        <div className="space-y-6" onKeyDown={handleKeyPress}>
          {/* Type Selection */}
          <div className="space-y-3">
            <Label>Content Type</Label>
            <div className="grid grid-cols-4 gap-3">
              {Object.entries(typeIcons).map(([type, Icon]) => (
                <Button
                  key={type}
                  variant="outline"
                  className={cn(
                    "h-16 flex flex-col items-center space-y-2",
                    selectedType === type && "bg-neural-100 border-neural-500"
                  )}
                  onClick={() => setSelectedType(type as KnowledgeItem['type'])}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs capitalize">{type}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title..."
              className="neural-input"
            />
          </div>

          {/* URL (for bookmarks) */}
          {(selectedType === 'bookmark' || selectedType === 'article') && (
            <div className="space-y-2">
              <Label className="flex items-center space-x-2">
                <Link className="h-4 w-4" />
                <span>URL</span>
              </Label>
              <Input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="neural-input"
                type="url"
              />
            </div>
          )}

          {/* Image URL */}
          <div className="space-y-2">
            <Label className="flex items-center space-x-2">
              <Image className="h-4 w-4" />
              <span>Image URL (optional)</span>
            </Label>
            <Input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="neural-input"
              type="url"
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label>Content</Label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Your notes, thoughts, or description..."
              className="neural-input min-h-32"
              rows={4}
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="neural-input">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.name}>
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: cat.color }}
                      />
                      <span>{cat.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label className="flex items-center space-x-2">
              <Tag className="h-4 w-4" />
              <span>Tags</span>
            </Label>
            <div className="flex space-x-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Add a tag..."
                className="neural-input flex-1"
                onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
              />
              <Button onClick={handleAddTag} variant="outline">
                Add
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="pr-1">
                    {tag}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 ml-1 hover:bg-transparent"
                      onClick={() => removeTag(tag)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!title.trim()}
              className="neural-button"
            >
              Add Item
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};