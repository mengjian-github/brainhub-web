import { Lightbulb, ExternalLink } from "lucide-react";

interface SearchResultProps {
  summary: string;
  references: { title: string; url: string }[];
}

export default function SearchResult({
  summary,
  references,
}: SearchResultProps) {
  return (
    <div className="w-full p-4 sm:p-6">
      <div className="mb-4 sm:mb-6">
        <div className="flex items-center mb-3 sm:mb-4">
          <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 mr-2" />
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            智能解答
          </h2>
        </div>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          {summary}
        </p>
      </div>
      <div>
        <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-800 flex items-center">
          <ExternalLink className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 mr-2" />
          参考链接
        </h3>
        <ol className="list-decimal list-inside space-y-1 sm:space-y-2">
          {references.map((ref, index) => (
            <li key={index} className="text-sm sm:text-base text-gray-600">
              <a
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline ml-1 sm:ml-2"
              >
                {ref.title}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
