export function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 left-6 z-50">
      <div className="bg-green-500 rounded-full p-3 shadow-lg cursor-pointer hover:bg-green-600 transition-colors">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="white"
          stroke="white"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white"
        >
          <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
          <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
          <path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
          <path d="M9.5 13.5c.5 1 1.5 1 2 1s1.5 0 2-1" />
        </svg>
      </div>
    </div>
  )
}
