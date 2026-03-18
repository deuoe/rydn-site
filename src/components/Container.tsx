export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full md:max-w-3/4 m-auto p-4 lg:p-8 text-[#676767] flex flex-col justify-center items-center gap-8">
      {children}
    </div>
  )
}
