export default function PageIntro({ label, title, children, aside }) {
  return (
    <section className="page-shell page-intro">
      <p className="eyebrow text-rust">{label}</p>
      <div className="mt-4 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <h1 className="page-title">{title}</h1>
          <div className="mt-5 max-w-2xl text-base leading-8 text-slate sm:text-lg">{children}</div>
        </div>
        {aside}
      </div>
    </section>
  );
}
