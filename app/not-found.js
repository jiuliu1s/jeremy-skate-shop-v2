// app/not-found.js
export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-gray-600 mb-6">The page you're looking for doesn't exist.</p>
        <a 
          href="/" 
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}