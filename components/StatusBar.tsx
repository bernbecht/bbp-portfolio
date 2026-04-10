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
        <div className="font-bold">Brazil based</div>
        <div className="text-gray-500">Working globally</div>
      </div>
      <div className="pressable-button">
        <button
          onClick={scrollToFooter}
          className="font-bold font-mono border-solid border cursor-pointer px-10 py-2"
        >
          Say Hello
        </button>
        <div className="dither w-full h-2"></div>
      </div>
    </div>
  );
}
