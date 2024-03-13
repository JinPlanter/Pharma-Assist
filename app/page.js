export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <header className="p-4 bg-primary text-white">Header</header>
      <div className="flex flex-grow">
        <main className="flex-grow p-4 bg-base-100 text-black">
          <button className="btn btn-primary">Primary</button>
          <button className="btn btn-secondary">Secondary</button>
          <button className="btn btn-accent">Accent</button>
          <button className="btn btn-neutral">Neutral</button>
          <button className="btn btn-info">Info</button>
          <button className="btn btn-success">Success</button>
          <button className="btn btn-warning">Warning</button>
          <button className="btn btn-error">Error</button>
          <button className="btn btn-ghost">Ghost</button>
        </main>
      </div>
      <footer className="p-4 bg-primary text-white">Footer</footer>
    </div>
  );
}
