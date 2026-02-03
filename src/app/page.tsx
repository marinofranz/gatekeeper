export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-slate-50">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm flex flex-col gap-6">
        <h1 className="text-6xl font-bold tracking-tighter text-slate-900">
          Gatekeeper
        </h1>
        <p className="text-xl text-slate-600 text-center max-w-150">
          Secure, white-label ticketing infrastructure for local event
          organizers.
        </p>
      </div>
    </main>
  );
}
