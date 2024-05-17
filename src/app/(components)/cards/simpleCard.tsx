interface simpleCardProps {
  icon: any;
  description: string;
}
const Card = ({ icon, description }: simpleCardProps) => {
  return (
    <div className="flex flex-col space-y-4 p-4">
      <div className="bg-blue-200 rounded flex justify-center items-center text-blue-900 w-fit p-3 text-lg">
        {icon}
      </div>
      <p className="text-xs text-black opacity-90 leading-relaxed">
        {description}
      </p>
    </div>
  );
};
export default Card;

export const SimpleCard = ({ icon, description }: simpleCardProps) => {
  return (
    <div className="flex flex-row space-x-3 p-2">
      <div className="bg-white rounded flex h-fit justify-center items-center text-blue-900 w-fit p-3 text-xl">
        {icon}
      </div>
      <p className="text-sm text-white  leading-relaxed px-4">
        {description}
      </p>
    </div>
  );
};
import Image from "next/image";
interface Props {
  source: string;
  name: string;
  workTitle: string;
}
export const SimpleImageCard = ({ source, name, workTitle }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <Image
        src={source}
        alt="image"
        quality={100}
        className="rounded lg:h-[400px]"
        width={300}
        height={100}
        style={{ objectFit: "contain" }}
      />
      <p className="text-black text-sm ml-2">{name}</p>
      <p className="text-black text-xs opacity-80 ml-2">{workTitle}</p>
    </div>
  );
};
