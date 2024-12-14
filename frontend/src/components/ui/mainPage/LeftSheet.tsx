import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useTreeStore } from '@/stores/tree-store';
import { FolderOpenIcon } from 'lucide-react';
import { useNavigate } from 'react-router';

const side = 'left';

export function LeftSheet() {
  const { treeDescriptions } = useTreeStore();
  const navigate = useNavigate();

  const handleTreeClick = (id: number) => {
    navigate(`/trees/${id}`);
  };

  return (
    <div className='grid grid-cols-2 gap-2 p-2'>
      <Sheet key={side}>
        <SheetTrigger asChild>
          <FolderOpenIcon cursor={'pointer'} />
        </SheetTrigger>
        <SheetContent side={side}>
          <SheetHeader>
            <SheetTitle>Twoje drzewa</SheetTitle>
          </SheetHeader>
          <div className='grid gap-4 py-4'>
            {treeDescriptions.map((treeDescription) => {
              return (
                <SheetClose asChild key={treeDescription.id}>
                  <Button
                    variant='outline'
                    onClick={() => handleTreeClick(treeDescription.id)}
                  >
                    {treeDescription.title}
                  </Button>
                </SheetClose>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
