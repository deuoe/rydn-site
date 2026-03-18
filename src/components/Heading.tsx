export default function Heading({ text }: { text: string }) {
  return (
    <>
      <h1 className="text-4xl text-center font-light">{text}</h1>
      <div className="w-32 m-auto h-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-600" />
    </>
  )
}
