import { useState } from 'react';
import { Brain, Sparkles, ArrowRight, Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AddItemDialog } from '@/components/knowledge/AddItemDialog';

export const WelcomeHero = () => {
  const [showAddDialog, setShowAddDialog] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neural-50 via-white to-neural-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-mesh-gradient opacity-30" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-20 h-20 bg-neural-gradient rounded-full opacity-20 animate-float" />
      <div className="absolute top-40 right-32 w-12 h-12 bg-neural-600/20 rounded-full animate-pulse-soft" />
      <div className="absolute bottom-32 left-1/4 w-16 h-16 bg-neural-700/10 rounded-full animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="relative z-10 container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Logo */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="p-4 bg-neural-gradient rounded-2xl shadow-2xl animate-pulse-soft">
              <Brain className="h-12 w-12 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-bold text-neural-700">Neural</h1>
              <p className="text-neural-500 font-medium">Your Personal AI Engine</p>
            </div>
          </div>

          {/* Hero Text */}
          <div className="space-y-6">
            <h2 className="hero-text leading-tight">
              All your knowledge,
              <br />
              <span className="relative">
                organized & accessible
                <Sparkles className="absolute -top-2 -right-8 h-8 w-8 text-neural-500 animate-pulse-soft" />
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-neural-600 max-w-3xl mx-auto leading-relaxed">
              Your notes, bookmarks, inspirations, articles and images in one 
              <span className="font-semibold text-neural-700"> single, private second brain</span>, 
              accessible anywhere, anytime.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button
              onClick={() => setShowAddDialog(true)}
              className="neural-button text-lg px-8 py-4 h-auto group"
            >
              <Plus className="h-5 w-5 mr-3" />
              Start Building Your Brain
              <ArrowRight className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button
              variant="outline"
              className="text-lg px-8 py-4 h-auto border-2 border-neural-200 hover:border-neural-300"
            >
              <Search className="h-5 w-5 mr-3" />
              Explore Features
            </Button>
          </div>

          {/* Feature Preview */}
          <div className="pt-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto">
                  <Brain className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-neural-700">Smart Notes</h3>
                <p className="text-neural-500">
                  Capture thoughts, ideas, and learnings with rich formatting and tagging
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto">
                  <Search className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-neural-700">Instant Search</h3>
                <p className="text-neural-500">
                  Find anything in your knowledge base instantly with powerful search
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto">
                  <Sparkles className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-neural-700">AI Insights</h3>
                <p className="text-neural-500">
                  Get intelligent suggestions and connections between your content
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddItemDialog 
        open={showAddDialog} 
        onOpenChange={setShowAddDialog}
      />
    </div>
  );
};