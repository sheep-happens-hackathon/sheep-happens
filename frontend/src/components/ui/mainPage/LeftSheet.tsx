import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useTreeStore } from "@/stores/tree-store";
import { Chat } from "@/types/types";
import { FolderOpenIcon } from "lucide-react";

const side = "left";

// type LeftSheetInterface = {
//   chats: Chat[];
//   onClick: Function;
// };

export function LeftSheet() {
  const { treeDescriptions } = useTreeStore();
  return (
    <div className="grid grid-cols-2 gap-2 p-2">
      <Sheet key={side}>
        <SheetTrigger asChild>
          <FolderOpenIcon cursor={"pointer"} />
        </SheetTrigger>
        <SheetContent side={side}>
          <SheetHeader>
            <SheetTitle>Twoje drzewa</SheetTitle>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            {treeDescriptions.map((chat) => {
              return (
                <Button
                  variant="outline"
                  // onClick={() => onClick(chat.chatId)}
                  key={chat.id}
                >
                  {chat.title}
                </Button>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
