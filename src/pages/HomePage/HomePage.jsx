import "./HomePage.scss";

const Home = () => {
  return (
    <>
    <header className="home">
      <h1 className="home__title"> Dashboard</h1>
      <div className="home__group">
        <h3 className="home__group-title">Old Groups</h3>
        <h3 className="home__group-title">New Groups</h3>
      </div>
    </header>
    <nav className="filters">
      <div className="filters__one">
          <h3 className="filters__one-content--title">Filters:</h3>
          <h3 className="filters__one-content">Date</h3>
          <h3 className="filters__one-content">Team</h3>
          <h3 className="filters__one-content">Alphabet</h3>
        </div>
      <div className="filters__two">
        <h3 className="filters__two-content">Filter 1</h3>
        <h3 className="filters__two-content">Filter 2</h3>
        <h3 className="filters__two-content">Filter 3</h3>
        {/* <img src="" alt="" className="filters_two-logo" /> */}
      </div>
    </nav>
    <section className="gallery">
      <div className="chatlink">
        <div className="chatlink__banner">
          <p className="chatlink__banner-title">Chat Name</p>
        </div>
        <div className="chatlink__content">
          <p className="chatlink__content-text">Key Insights</p>
          <p className="chatlink__content-text">Summary</p>
        </div>
        <div className="chatlink__filters">
          <div className="chatlink__filters-text">filter</div>
          <div className="chatlink__filters-text">filter</div>
          <div className="chatlink__filters-text">filter</div>
        </div>
      </div>
{/* Copied for Demo purposes. Will be responsive with Data */}
      <div className="chatlink">
        <div className="chatlink__banner">
          <p className="chatlink__banner-title">Chat Name</p>
        </div>
        <div className="chatlink__content">
          <p className="chatlink__content-text">Key Insights</p>
          <p className="chatlink__content-text">Summary</p>
        </div>
        <div className="chatlink__filters">
          <div className="chatlink__filters-text">filter</div>
          <div className="chatlink__filters-text">filter</div>
          <div className="chatlink__filters-text">filter</div>
        </div>
      </div>
      <div className="chatlink">
        <div className="chatlink__banner">
          <p className="chatlink__banner-title">Chat Name</p>
        </div>
        <div className="chatlink__content">
          <p className="chatlink__content-text">Key Insights</p>
          <p className="chatlink__content-text">Summary</p>
        </div>
        <div className="chatlink__filters">
          <div className="chatlink__filters-text">filter</div>
          <div className="chatlink__filters-text">filter</div>
          <div className="chatlink__filters-text">filter</div>
        </div>
      </div>
    </section>
    </>
    
  );
};

export default Home;
