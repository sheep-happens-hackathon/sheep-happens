import { Chat, NodeInput } from "@/types/types";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../tabs";
import { LeftSheet } from "./LeftSheet";
import ChatComponent from "./ChatComponent";
import LearningChart from "./LearningChart";
import { useTreeStore } from "@/stores/tree-store";
import { useEffect } from "react";
import { DAO } from "@/repositories/DAO";

function MainPage() {
  const onMyClick = (id: number) => {
    console.log(id);
  };

  const { setTreeDescriptions, user } = useTreeStore();

  useEffect(() => {
    DAO.getTrees(user.id).then(setTreeDescriptions);
  }, []);

  return (
    <div className="block h-full">
      {/* Tylko dla małych ekranów */}
      <div className="block md:hidden h-full m-0">
        <Tabs defaultValue="left" className="w-full h-full flex flex-col m-0">
          <TabsContent value="left" className="flex-1 overflow-auto m-0">
            <LeftSheet />
            <ChatComponent />
          </TabsContent>
          <TabsContent value="right" className="flex-1 overflow-auto m-0">
            <LearningChart onClick={onMyClick} />
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
            <LeftSheet />
            <ChatComponent />
          </div>
          <div className="">
            <LearningChart onClick={onMyClick} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
