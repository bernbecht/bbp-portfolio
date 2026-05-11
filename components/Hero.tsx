import Image from "next/image";

export function Hero() {
  return (
    <section className="my-12 md:my-24">
      <div className="flex items-end gap-4 mb-12">
        <Image
          src="/profile.jpeg"
          alt="portrait"
          width={100}
          height={100}
          className="rounded-xl w-[66px] md:w-[100px]"
        />

        <div className="text-2xl md:text-3xl">
          <p className="text-neutral-500">Glad to see you!</p>
          <h1>I am Bernardo</h1>
        </div>
      </div>

      <h2 className="text-5xl/14 md:text-7xl/20">
        Front-end Engineer & <br />
        UI/UX Designer <br />
      </h2>
    </section>
  );
}
