export default function Page() {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <div>
        <p>This is your separate home page</p>
        <p>
          <a
            className="px-2 text-blue-400 underline underline-offset-4"
            href="/blog"
          >
            Click Here to go to Blog page
          </a>
        </p>
      </div>
    </main>
  );
}
