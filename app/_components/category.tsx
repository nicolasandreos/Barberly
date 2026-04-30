import { Button } from "./ui/button";

interface CategoryProps {
  icon: React.ReactNode;
  label: string;
}

const Category = ({ icon, label }: CategoryProps) => {
  return (
    <Button
      variant="outline"
      className="flex w-35 items-center justify-center gap-2 p-5"
    >
      {icon}
      <span className="text-md font-bold">{label}</span>
    </Button>
  );
};

export default Category;
