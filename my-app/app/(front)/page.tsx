import ThemeTogglebtn from "@/components/common/themeTogglebtn";
import { Button } from "@/components/ui/button";


export default function Home() {
  return (
   <div>
    <Button className="bg-blue-300" >Click me</Button>
    <ThemeTogglebtn/>
   </div>
  );
}
