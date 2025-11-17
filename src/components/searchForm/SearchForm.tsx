import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type FormEvent } from "react";
import { useState } from "react";
import { toast } from "sonner";
type UserName = {
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
};
const SearchForm = ({ userName, setUserName }: UserName) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text === "") return toast("please enter a valid username");
    setUserName(text);
  };
  const [text, setText] = useState(userName);
  return (
    <form onSubmit={handleSubmit} className="mb-8 flex w-full items-center gap-x-2 lg:w-1/3">
      <Label className="sr-only" htmlFor={text} />
      <Input
        type="search"
        name={text}
        id={text}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Search Github Users..."
        className="bg-background flex-grow"
      />
      <Button className="cursor-pointer" type="submit">
        Search
      </Button>
    </form>
  );
};

export default SearchForm;
