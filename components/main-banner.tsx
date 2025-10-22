interface MainBannerProps {
  title: string;
  description: string;
  backgroundImage: string;
}

export const MainBanner = ({
  title,
  description,
  backgroundImage,
}: MainBannerProps) => {
  return (
    <section
      className="relative h-[400px] w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-black/40 backdrop-blur-sm px-16 py-8 text-center rounded-xl">
          <h1 className="text-4xl font-bold text-white mb-4">{title}</h1>
          <p className="text-white/90 text-lg">{description}</p>
        </div>
      </div>
    </section>
  );
};
