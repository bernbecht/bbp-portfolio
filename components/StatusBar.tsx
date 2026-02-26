"use client";

function scrollToFooter() {
  document.getElementById("footer")?.scrollIntoView();
}

type StatusBarProps = React.ComponentProps<"div">;

export function StatusBar({ className, ...rest }: StatusBarProps) {
  return (
    <div
      {...rest}
      className={`statusBar flex justify-between gap-8 ${className ?? ""}`}
    >
      <div className="hidden xs:block">
        <div className="statusBar__header">Brazil based</div>
        <div className="statusBar__info">Working globally</div>
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
