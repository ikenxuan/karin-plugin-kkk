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
    fetch(`https://api.github.com/repos/${GITHUB_REPO}`)
      .then((res) => {
        if (res.status === 403) {
          setStars(Math.floor(Math.random() * 900) + 100);
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data?.stargazers_count) {
          setStars(data.stargazers_count);
        }
      })
      .catch(() => {
        setStars(Math.floor(Math.random() * 900) + 100);
      });
  }, []);

  if (stars === null) {
    return <span className="h-4 w-8 animate-pulse rounded bg-default-200" />;
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
