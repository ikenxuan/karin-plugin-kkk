"use client";

import * as React from "react";
import { Button } from "@heroui/react";
import { FaGithub } from "react-icons/fa"
const GITHUB_REPO = "ikenxuan/karin-plugin-kkk";

function formatStars(stars: number) {
  return stars >= 1000 ? `${(stars / 1000).toFixed(1)}k` : String(stars);
}

function StarsCount() {
  const [stars, setStars] = React.useState<number | null>(null);

  React.useEffect(() => {
    fetch('/api/github/stars')
      .then((res) => {
        if (!res.ok) return null;
        return res.json();
      })
      .then((data) => {
        if (data?.stars) {
          setStars(data.stars);
        }
      })
      .catch(() => {
        // Silently fail on error, keeping stars as null or potentially setting a static fallback if desired
        // But removing the random number generation as requested
        setStars(null);
      });
  }, []);

  if (stars === null) {
    return null; // Or return a static fallback icon/text if preferred, but hiding the count is cleaner on error
  }

  return (
    <span className="pt-px">
      {formatStars(stars)}
    </span>
  );
}

export function GitHubLink() {
  return (
    <Button
      as="a"
      href={`https://github.com/${GITHUB_REPO}`}
      target="_blank"
      rel="noopener noreferrer"
      variant="flat"
      size="sm"
      radius='full'
      color='default'
      className="backdrop-blur-md backdrop:opacity-90 border border-fd-border"
      startContent={<FaGithub size={20}/>}
    >
      <StarsCount />
    </Button>
  );
}
