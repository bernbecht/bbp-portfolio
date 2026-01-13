export function Hero() {
  return (
    <section className="m-auto w-[900px] pt-24 px-4">
      <div className="flex items-center gap-4 mb-12 items-end">
        <img
          src="/profile.jpeg"
          alt="portrait"
          className="w-[100px] rounded-xl"
        />

        <div className="text-3xl  ">
          <p className="text-neutral-500">Glad to see you!</p>
          <h1 className="hero-name">I am Bernardo</h1>
        </div>
      </div>

      <h2 className="hero-headline text-6xl/18">
        Front-end Engineer & <br />
        UI/UX Designer <br />
        who imagines experiences
      </h2>
    </section>
  );
}
