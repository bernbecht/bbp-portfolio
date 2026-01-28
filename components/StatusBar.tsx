"use client";

function scrollToFooter() {
  document.getElementById("footer")?.scrollIntoView();
}

export function StatusBar() {
  return (
    <div className="statusBar flex mt-16 justify-between mb-24">
      <div>
        <div className="statusBar__header">Brazil based</div>
        <div className="statusBar__info">Working globally</div>
      </div>
      <div>
        <div className="statusBar__header">Currently</div>
        <div className="statusBar__info">Available for work</div>
      </div>
      <div className="pressable-button">
        <button
          onClick={scrollToFooter}
          className="button--secondary px-10 py-2"
        >
          Say Hello
        </button>
        <div className="dither w-full h-2"></div>
      </div>
    </div>
  );
}
