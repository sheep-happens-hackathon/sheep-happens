import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Chat } from "@/types/types";
import { FolderOpenIcon } from "lucide-react";

const side = "left";

type LeftSheetInterface = {
  chats: Chat[];
  onClick: Function;
};

export function LeftSheet({ chats, onClick }: LeftSheetInterface) {
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
            {chats.map((chat: Chat) => {
              return (
                <Button
                  variant="outline"
                  onClick={() => onClick(chat.chatId)}
                  key={chat.chatId}
                >
                  {chat.chatTitle}
                </Button>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
