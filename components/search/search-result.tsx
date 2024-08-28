import { Lightbulb, ExternalLink } from "lucide-react";
import Markdown from "../markdown";

interface SearchResultProps {
  answer: string;
  references: { title: string; url: string }[];
}

export default function SearchResult({
  answer,
  references,
}: SearchResultProps) {
  return (
    <div className="w-full max-h-[70vh] overflow-y-auto scrollbar-hide">
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 mr-2" />
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            智能解答
          </h2>
        </div>
        <div className="w-full text-sm sm:text-base text-gray-600 leading-relaxed custom-markdown">
          <Markdown>{answer}</Markdown>
        </div>
      </div>
      {references.length > 0 && (
        <div>
          <h3 className="text-lg sm:text-xl font-semibold mb-3 text-gray-800 flex items-center">
            <ExternalLink className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 mr-2" />
            参考链接
          </h3>
          <ol className="list-decimal list-inside space-y-2">
            {references.map((ref, index) => (
              <li key={index} className="text-sm sm:text-base text-gray-600">
                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline ml-2"
                >
                  {ref.title}
                </a>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
