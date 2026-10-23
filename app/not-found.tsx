import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative isolate min-h-[760px] overflow-hidden bg-[#F7FAF9] px-5 pb-24 pt-32 md:flex md:min-h-screen md:items-center md:px-8 md:pb-28 md:pt-28">
      <div
        className="absolute inset-0 -z-20 opacity-70"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(38,70,83,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(38,70,83,.035) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="absolute -left-28 top-24 -z-10 h-72 w-72 rounded-full bg-[#A8DADC]/25 blur-3xl" aria-hidden="true" />
      <div className="absolute -right-24 bottom-10 -z-10 h-96 w-96 rounded-full bg-[#2A9D8F]/10 blur-3xl" aria-hidden="true" />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 md:grid-cols-[1fr_0.9fr] md:gap-8 lg:gap-16">
        <section className="text-center md:text-left">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#2A9D8F]/15 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-[#2A9D8F]" />
            <span className="text-[11px] font-bold tracking-[0.22em] text-[#264653]">PAGE NOT FOUND</span>
          </div>

          <p className="mb-2 text-[clamp(5.5rem,18vw,10rem)] font-black leading-none tracking-[-0.08em] text-[#264653]">
            4<span className="text-[#2A9D8F]">0</span>4
          </p>
          <h1 className="mb-5 text-2xl font-bold tracking-wide text-[#264653] md:text-3xl">
            お探しのページが見つかりませんでした
          </h1>
          <p className="mx-auto max-w-lg text-sm font-medium leading-8 text-gray-500 md:mx-0 md:text-base">
            ページが移動または削除されたか、URLが間違っている可能性があります。
            <br className="hidden sm:block" />
            ここから、もう一度目的のページを探してみてください。
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row md:justify-start">
            <Link
              href="/"
              className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#264653] px-8 text-sm font-bold text-white shadow-[0_12px_30px_rgba(38,70,83,0.18)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#2A9D8F] hover:shadow-[0_16px_35px_rgba(42,157,143,0.25)]"
            >
              <i className="fas fa-home text-xs" aria-hidden="true" />
              トップページへ
              <i className="fas fa-arrow-right text-xs transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <Link
              href="/service"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-[#264653]/15 bg-white px-8 text-sm font-bold text-[#264653] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#2A9D8F]/40 hover:text-[#2A9D8F] hover:shadow-md"
            >
              サービスを見る
            </Link>
          </div>

          <p className="mt-8 text-xs text-gray-400">
            お困りの場合は
            <Link href="/contact" className="ml-1 font-bold text-[#2A9D8F] underline decoration-[#2A9D8F]/30 underline-offset-4 hover:decoration-[#2A9D8F]">
              お問い合わせください
            </Link>
          </p>
        </section>

        <div className="relative mx-auto aspect-square w-full max-w-[410px]" aria-hidden="true">
          <div className="absolute inset-[8%] rounded-full border border-dashed border-[#2A9D8F]/25 motion-safe:animate-[spin_28s_linear_infinite]" />
          <div className="absolute inset-[18%] rounded-full bg-white/70 shadow-[0_30px_80px_rgba(38,70,83,0.12)] backdrop-blur-sm" />

          <div className="absolute left-1/2 top-1/2 h-[34%] w-[34%] -translate-x-1/2 -translate-y-1/2 rotate-12 rounded-[28%] bg-gradient-to-br from-[#43B5A5] to-[#247D76] shadow-[0_24px_50px_rgba(42,157,143,0.28)]">
            <span className="absolute left-[24%] top-[27%] h-2 w-2 rounded-full bg-white/90" />
            <span className="absolute right-[24%] top-[27%] h-2 w-2 rounded-full bg-white/90" />
            <span className="absolute bottom-[27%] left-1/2 h-3 w-8 -translate-x-1/2 rounded-b-full border-b-2 border-white/80" />
          </div>

          <div className="absolute left-[8%] top-[19%] flex h-16 w-16 -rotate-12 items-center justify-center rounded-2xl bg-[#F4A261] text-xl text-white shadow-lg motion-safe:animate-[bounce_3.5s_ease-in-out_infinite]">
            <i className="fas fa-question" />
          </div>
          <div className="absolute right-[5%] top-[23%] flex h-20 w-20 rotate-12 items-center justify-center rounded-full bg-[#264653] text-2xl text-white shadow-xl motion-safe:animate-[bounce_4s_ease-in-out_infinite]">
            <i className="fas fa-location-dot" />
          </div>
          <div className="absolute bottom-[10%] left-[18%] flex h-14 w-14 rotate-6 items-center justify-center rounded-xl border border-[#2A9D8F]/15 bg-white text-[#2A9D8F] shadow-lg motion-safe:animate-[bounce_4.5s_ease-in-out_infinite]">
            <i className="fas fa-arrow-turn-up rotate-90" />
          </div>

          <span className="absolute left-[2%] top-1/2 h-3 w-3 rounded-full bg-[#E9C46A]" />
          <span className="absolute bottom-[18%] right-[12%] h-5 w-5 rounded-md bg-[#E76F51]/70" />
          <span className="absolute right-[25%] top-[5%] h-2.5 w-2.5 rounded-full bg-[#2A9D8F]" />
        </div>
      </div>
    </main>
  );
}
