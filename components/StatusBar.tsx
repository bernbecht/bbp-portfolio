"use client";

function scrollToFooter() {
  document.getElementById("footer")?.scrollIntoView();
}

export function StatusBar() {
  return (
    <div className="statusBar flex mt-16 justify-between mb-24">
      <div>
        <div className="statusBar-header">Brazil based</div>
        <div className="statusBar-info">Working globally</div>
      </div>
      <div>
        <div className="statusBar-header">Currently</div>
        <div className="statusBar-info">Available for work</div>
      </div>
      <button
        onClick={scrollToFooter}
        className="statusBar-button px-10 cursor-pointer"
      >
        Say Hello
      </button>
    </div>
  );
}
