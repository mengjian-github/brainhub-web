import Editor from "@/components/write/editor";

export default function Write() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            <Editor />
          </div>
        </div>
      </main>
    </div>
  );
}
