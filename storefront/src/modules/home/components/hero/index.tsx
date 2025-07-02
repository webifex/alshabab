import Image from "next/image"

const Hero = () => {
  return (
    <div className="relative w-full aspect-[16/9] min-h-[200px] bg-white flex items-center justify-center overflow-hidden">
      <Image
        src="/hero.png"
        alt="Hero"
        fill
        className="object-contain"
        priority
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
      />
    </div>
  )
}

export default Hero
