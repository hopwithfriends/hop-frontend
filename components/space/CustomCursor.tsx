"use client"

import * as React from "react";
import { usePerfectCursor } from "../hooks/useCursor";

interface CursorProps {
    point: [number, number]; 
    imageUrl: string; // Update the prop to use an image URL
}

export function CustomCursor({ point, imageUrl }: CursorProps) {
  const rCursor = React.useRef<HTMLImageElement | null>(null);

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
    <img
      ref={rCursor}
      src={imageUrl}
      alt="Custom Cursor"
      className="rounded-xl w-10 h-10"
      style={{
        position: "absolute",
        top: -15,
        left: -15,  
        pointerEvents: "none", 
      }}
    />
  );
}
