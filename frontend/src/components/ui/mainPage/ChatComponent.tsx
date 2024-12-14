import { Chat, NodeInput } from "@/types/types";
import { useEffect, useState } from "react";
import LearningChart from "./LearningChart";
import { LeftSheet } from "./LeftSheet";
import { Textarea } from "../textarea";
import { PlusIcon, SendIcon, ThumbsDownIcon } from "lucide-react";
import { Input } from "../input";
import { Button } from "../button";

function ChatComponent() {
  const [questionStage, setQuestionStage] = useState(0);

  return (
    <>
      {questionStage == 0 && (
        <div className="grid grid-cols-12 grid-flow-col px-1">
          <Input type="text" placeholder="prompt" className="col-span-10" />
          <Button
            type="submit"
            onClick={() => setQuestionStage(questionStage + 1)}
            className="col-span-2 ml-2"
          >
            <SendIcon />
          </Button>
        </div>
      )}
      {questionStage == 1 && (
        <div className="grid grid-cols-12">
          <div className="col-span-11 pl-2">
            <Textarea />
          </div>
          <div className="col-span-1 content-around px-1">
            <div className="flex flex-col justify-self-center self-center">
              <div className="basis-1/2 pb-2">
                <PlusIcon color="green" cursor={"pointer"} />
              </div>
              <div className="basis-1/4">
                <ThumbsDownIcon color="red" cursor={"pointer"} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatComponent;
