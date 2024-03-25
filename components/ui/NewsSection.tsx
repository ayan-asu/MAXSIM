import React from "react";

interface Article {
  title: string;
  description: string;
}

interface Props {
  news: Article[];
}

const NewsSection: React.FC<Props> = ({ news }) => {
  return (
    <section className="bg-gray-100 py-8" id="news">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4">News/ Press</h2>
        <div className="border-b-4 border-blue-500 w-16 mb-4"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {news?.map((article, index) => (
            <div key={index}>
              <NewsCard
                title={article.title}
                description={article.description}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const NewsCard: React.FC<{ title: string; description: string }> = ({
  title,
  description,
}) => {
  function formatProductDescription(description: string) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    return description.split("\n").map((paragraph, index) => (
      <React.Fragment key={index}>
        {paragraph.split(urlRegex).map((text, i) => {
          if (text.match(urlRegex)) {
            return (
              <a
                key={i}
                href={text}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-500"
              >
                {text}
              </a>
            );
          } else {
            return text;
          }
        })}
        <br />
      </React.Fragment>
    ));
  }
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-xl font-bold mb-2 text-[#517ABE]-500">{title}</h3>
      <p className="text-gray-700">{formatProductDescription(description)}</p>
    </div>
  );
};

export default NewsSection;
