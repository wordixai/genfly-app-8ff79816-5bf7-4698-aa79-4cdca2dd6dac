import { useState } from 'react';
import { useKnowledgeStore } from '@/store/knowledgeStore';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { KnowledgeGrid } from '@/components/knowledge/KnowledgeGrid';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { AddItemDialog } from '@/components/knowledge/AddItemDialog';
import { WelcomeHero } from '@/components/welcome/WelcomeHero';

const Index = () => {
  const { items } = useKnowledgeStore();
  const [showAddDialog, setShowAddDialog] = useState(false);

  const hasItems = items.length > 0;

  if (!hasItems) {
    return <WelcomeHero />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neural-50 via-white to-neural-100">
      <Header onNewItem={() => setShowAddDialog(true)} />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <StatsCards />
            <KnowledgeGrid />
          </div>
        </main>
      </div>

      <AddItemDialog 
        open={showAddDialog} 
        onOpenChange={setShowAddDialog}
      />
    </div>
  );
};

export default Index;