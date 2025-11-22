import { useEffect, useState } from 'react';
import TeamCard from './components/TeamCard.jsx';
import LifecycleTicker from './components/LifecycleTicker.jsx';
import DashboardLayout from './components/DashboardLayout.jsx';

export default function App() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch('/articles.json')
      .then((response) => response.json())
      .then(setArticles)
      .catch(() => setArticles([]));
  }, []);

  return (
    <div className="container py-4">
      <header className="text-center mb-4">
        <h1>Day 11 · React Basics Continued</h1>
        <p>PropTypes, Lifecycle hooks, CSS & Bootstrap styling, composable layouts, mock json-server call.</p>
      </header>

      <section className="mb-5">
        <h2 className="h4 mb-3">PropTypes & Styling</h2>
        <div className="row g-3">
          <TeamCard name="Meera" role="UI Lead" favoriteColor="#f97316" />
          <TeamCard name="Rahul" role="API Engineer" favoriteColor="#22d3ee" />
          <TeamCard name="Alia" role="QA" favoriteColor="#84cc16" />
        </div>
      </section>

      <section className="mb-5">
        <h2 className="h4 mb-3">Lifecycle Demo</h2>
        <LifecycleTicker interval={1000} />
      </section>

      <section className="mb-5">
        <h2 className="h4 mb-3">Composable Components + Mock Backend</h2>
        <DashboardLayout
          sidebar={<ArticleList articles={articles} />}
          content={<ArticleDetails selected={articles[0]} />}
        />
      </section>
    </div>
  );
}

function ArticleList({ articles }) {
  return (
    <ul className="list-group">
      {articles.map((article) => (
        <li key={article.id} className="list-group-item">
          {article.title}
          <br />
          <small className="text-muted">{article.author}</small>
        </li>
      ))}
    </ul>
  );
}

function ArticleDetails({ selected }) {
  if (!selected) {
    return <p className="text-muted">Select an article to preview details.</p>;
  }

  return (
    <article>
      <h3>{selected.title}</h3>
      <p>
        Author: <strong>{selected.author}</strong>
      </p>
      <p className="lead">This area would render markdown/body loaded from the json-server API.</p>
    </article>
  );
}
