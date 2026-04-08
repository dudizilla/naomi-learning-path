import "@/styles/InfoBlock.css"

export default function InfoBlock({loading, displayMessage}) {
    return (
        <div className="info-block">
            {loading && <span className="loader">  </span>}
            {!loading && displayMessage ? <h2 className="info-block__title"> {displayMessage} </h2> : null}
        </div>
    );
}
