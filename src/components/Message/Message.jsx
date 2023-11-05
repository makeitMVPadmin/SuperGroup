import "./Message.scss"

const Message = () => {
  return (
    <div className="message owner">
        <div className="message__info">
            {/* profile picture */}
            <div className="placeholder"></div>
            {/* time stamp */}
            <span>Just Now</span>
        </div>
        <div className="message__content">
            <p className="message__content-text">hello</p>
        </div>
    </div>
  )
}

export default Message