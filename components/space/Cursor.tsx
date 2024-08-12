"use client"

import * as React from "react";
import { usePerfectCursor } from "../hooks/useCursor";

interface CursorProps {
    point: [number, number]; 
    color: string; 
    username: string;
}

export function Cursor({ point, color, username } : CursorProps) {
  const rCursor = React.useRef<SVGSVGElement | null>(null);

  const animateCursor = React.useCallback((point: number[]) => {
    const elm = rCursor.current;
    if (!elm) return;
    elm.style.setProperty(
      "transform",
      `translate(${point[0]}px, ${point[1]}px)`
    );
  }, []);

  const onPointMove = usePerfectCursor(animateCursor, point);

  React.useLayoutEffect(() => {
    onPointMove(point);
  }, [onPointMove, point]);

  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
<svg
      ref={rCursor}
      style={{
        position: "absolute",
        top: -15,
        left: -15,
        width: 40,
        height: 40,
      }}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 35 35"
      fill="none"
      fillRule="evenodd"
    >
      <g fill="rgba(0,0,0,.2)" transform="translate(1,1)">
        <path d="m12 24.4219v-16.015l11.591 11.619h-6.781l-.411.124z" />
        <path d="m21.0845 25.0962-3.605 1.535-4.682-11.089 3.686-1.553z" />
      </g>
      <g fill="white">
        <path d="m12 24.4219v-16.015l11.591 11.619h-6.781l-.411.124z" />
        <path d="m21.0845 25.0962-3.605 1.535-4.682-11.089 3.686-1.553z" />
      </g>
      <g fill={`${color}`}>
        <path d="m19.751 24.4155-1.844.774-3.1-7.374 1.841-.775z" />
        <path d="m13 10.814v11.188l2.969-2.866.428-.139h4.768z" />
      </g>
    </svg>
  );
}
