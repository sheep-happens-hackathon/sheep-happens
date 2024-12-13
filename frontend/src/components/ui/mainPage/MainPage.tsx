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
    // <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
    //   <div className="p-4">
    //     <LeftSheet chats={chats} onClick={onMyClick} />
    //     <ChatComponent />
    //   </div>
    //   <div>
    //     <LearningChart nodesProp={nodes} onClick={onMyClick} />
    //   </div>
    // </div>
    <div className="block h-full">
      {/* Tylko dla małych ekranów */}
      <div className="block md:hidden">
        <Tabs defaultValue="left" className="w-full">
          <TabsList>
            <TabsTrigger value="left">Left Content</TabsTrigger>
            <TabsTrigger value="right">Right Content</TabsTrigger>
          </TabsList>
          <TabsContent value="left">
            <LeftSheet chats={chats} onClick={onMyClick} />
            <ChatComponent />
          </TabsContent>
          <TabsContent value="right">
            <LearningChart nodesProp={nodes} onClick={onMyClick} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Tylko dla dużych ekranów */}
      <div className="hidden md:block h-full w-full">
        <div className="grid grid-cols-2 h-full w-full">
          <div className="p-4">
            <LeftSheet chats={chats} onClick={onMyClick} />
            <ChatComponent />
          </div>
          <div>
            <LearningChart nodesProp={nodes} onClick={onMyClick} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
