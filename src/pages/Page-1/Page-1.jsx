import "./Page-1.scss"

function Page1(props) {
    return (
        <div className="SearchbarParent">
            <div className="SearchbarParent__pfp"></div>
            <input className="SearchbarParent__input" type="text" placeholder="Search previous chats.."></input>
            <p className="SearchbarParent__text">Previous Searches..</p>
        </div>
    );
}

export default Page1;