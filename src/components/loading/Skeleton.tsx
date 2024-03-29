export default function Skeleton() {
  return (
    <div className="bg-gray-900 rounded-xl relative animate-pulse h-96">
      <div className="overflow-hidden rounded-lg h-[100%] bg-gray-800"></div>
      <div className="bg-gray-900 bg-opacity-60 absolute top-0 left-0 flex items-center gap-1 m-2 p-1 rounded-lg">
        <div className="h-4 w-8 rounded bg-gray-800"></div>
      </div>
    </div>
  );
}
