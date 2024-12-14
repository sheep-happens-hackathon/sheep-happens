import { Chat, NodeInput } from "@/types/types";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../tabs";
import { LeftSheet } from "./LeftSheet";
import ChatComponent from "./ChatComponent";
import LearningChart from "./LearningChart";

const nodes: NodeInput[] = [
  { parentId: null, id: 1, title: "input", isFinal: false },
  { parentId: 1, id: 2, title: "node 2", isFinal: false },
  { parentId: 2, id: 3, title: "node 2a", isFinal: false },
  { parentId: 2, id: 4, title: "node 2b", isFinal: true },
];

const chats: Chat[] = [
  { chatId: 1, chatTitle: "Michał" },
  { chatId: 2, chatTitle: "Maciek" },
  { chatId: 3, chatTitle: "Wojtek" },
  { chatId: 4, chatTitle: "Hubert" },
];

function MainPage() {
  const onMyClick = (id: number) => {
    console.log(id);
  };
  return (
    <div className="block h-full">
      {/* Tylko dla małych ekranów */}
      <div className="block md:hidden h-full m-0">
        <Tabs defaultValue="left" className="w-full h-full flex flex-col m-0">
          <TabsContent value="left" className="flex-1 overflow-auto m-0">
            <LeftSheet chats={chats} onClick={onMyClick} />
            <ChatComponent />
          </TabsContent>
          <TabsContent value="right" className="flex-1 overflow-auto m-0">
            <LearningChart nodesProp={nodes} onClick={onMyClick} />
          </TabsContent>
          <TabsList className="w-full grid grid-cols-2 mt-auto m-0">
            <TabsTrigger value="left">Chat</TabsTrigger>
            <TabsTrigger value="right">Drzewo</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Tylko dla dużych ekranów */}
      <div className="hidden md:block h-full w-full">
        <div className="grid grid-cols-2 h-full w-full">
          <div>
            <LeftSheet chats={chats} onClick={onMyClick} />
            <ChatComponent />
          </div>
          <div className="">
            <LearningChart nodesProp={nodes} onClick={onMyClick} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
