export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 mt-20 py-6 border-t">
      <div className="max-w-6xl mx-auto px-4 text-center text-gray-600">
        <p className="text-sm">
          © {new Date().getFullYear()} HarvestGuard. Reducing food loss for a resilient Bangladesh.
        </p>
      </div>
    </footer>
  );
}
