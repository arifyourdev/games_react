
export default function BetPopup({
  isBack,
  selection,
  stake,
  odds,
  cl,
  close,
  msg,
}) {
  return (
    <div className={`bet-popup ${cl}`}>
      <div className="cont">
        <div className="lo">{msg ?? "Please Enter Odds or Price"}</div>
        <div className="lt">
          <div className={isBack ? "back" : "lay"}>
            {isBack ? "Back" : "Lay"}
          </div>
          <div className="sel-text">
            <div className="sel-name">{selection ?? ""}</div>
            {`${stake ?? ""} at odds ${odds ?? ""}`}
          </div>
        </div>
      </div>
      <div
        className="close"
        onClick={(e) => {
          e.preventDefault();
          close();
        }}
      >
        x
      </div>
    </div>
  );
}
