"use client";

import { useState } from "react";
import {
  FacebookLogoIcon,
  TwitterLogoIcon,
  LinkedinLogoIcon,
  LinkIcon,
  ShareIcon,
  CheckIcon,
} from "@phosphor-icons/react";

interface ShareButtonsProps {
  title: string;
  url?: string;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl =
    url || (typeof window !== "undefined" ? window.location.href : "");

  const shareData = {
    title,
    url: shareUrl,
  };

  const handleNativeShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      }
    } catch (err) {
      // User cancelled or error occurred
      console.log("Share cancelled or failed");
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link");
    }
  };

  const shareToSocial = (platform: string) => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(title);

    const shareUrls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://x.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    };

    window.open(shareUrls[platform], "_blank", "width=600,height=400");
  };

  // Check if Web Share API is available
  const canShare = typeof navigator !== "undefined" && navigator.share;

  return (
    <div className="flex gap-3">
      {canShare ? (
        // Show native share button on mobile/supported browsers
        <button
          onClick={handleNativeShare}
          className="text-fd-muted-foreground hover:text-fd-foreground"
          aria-label="Share this article"
        >
          <ShareIcon size={16} className="size-4" weight="duotone" />
        </button>
      ) : (
        // Show individual social buttons on desktop
        <>
          <button
            onClick={() => shareToSocial("facebook")}
            className="text-fd-muted-foreground hover:text-fd-foreground"
            aria-label="Share on Facebook"
          >
            <FacebookLogoIcon size={16} className="size-4" weight="duotone" />
          </button>
          <button
            onClick={() => shareToSocial("twitter")}
            className="text-fd-muted-foreground hover:text-fd-foreground"
            aria-label="Share on Twitter"
          >
            <TwitterLogoIcon size={16} className="size-4" weight="duotone" />
          </button>
          <button
            onClick={() => shareToSocial("linkedin")}
            className="text-fd-muted-foreground hover:text-fd-foreground"
            aria-label="Share on LinkedIn"
          >
            <LinkedinLogoIcon size={16} className="size-4" weight="duotone" />
          </button>
        </>
      )}

      {/* Always show copy link button */}
      <button
        onClick={handleCopyLink}
        className="text-fd-muted-foreground hover:text-fd-foreground"
        aria-label={copied ? "Link copied!" : "Copy link"}
      >
        {copied ? (
          <CheckIcon size={16} className="size-4" weight="duotone" />
        ) : (
          <LinkIcon size={16} className="size-4" weight="duotone" />
        )}
      </button>
    </div>
  );
}
