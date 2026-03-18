export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-8 text-[#676767] flex flex-col justify-center items-center gap-8">
      {children}
    </div>
  )
}
