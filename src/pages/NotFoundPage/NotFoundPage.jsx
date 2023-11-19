import "./NotFoundPage.scss";

//this page renders a basic 404 error page with a message and an error code
function NotFoundPage() {
  return (
    <main className="not-found">
      <div className="not-found__round-container">
        <h1 className="not-found__error">404</h1>
      </div>
      <p className="not-found__message">
        Can't find what you're looking for, sorry!
      </p>
    </main>
  );
}

export default NotFoundPage;
