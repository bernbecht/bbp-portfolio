import Image from "next/image";

export function Hero() {
  return (
    <section className="my-24">
      <div className="flex items-center gap-4 mb-12 items-end">
        <Image
          src="/profile.jpeg"
          alt="portrait"
          width={100}
          height={100}
          className="rounded-xl"
        />

        <div className="text-3xl  ">
          <p className="text-neutral-500">Glad to see you!</p>
          <h1 className="hero-name">I am Bernardo</h1>
        </div>
      </div>

      <h2 className="hero-headline text-6xl/18">
        Front-end Engineer & <br />
        UI/UX Designer <br />
      </h2>
    </section>
  );
}
