import {
    EmailIcon,
    EmailShareButton,
    TelegramIcon,
    TelegramShareButton,
    WhatsappIcon,
    WhatsappShareButton,
} from "react-share";
import { useState } from "react";

function ShareButtons({ url }) {
    const [copied, setCopied] = useState(false);
    const shareUrl = url || window.location.href;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            setCopied(false);
        }
    };

    return (
        <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                Share
            </p>
            <div className="flex flex-wrap items-center gap-3">
                <WhatsappShareButton url={shareUrl}>
                    <div className="flex items-center gap-2 rounded-full bg-green-500 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-green-600">
                        <WhatsappIcon size={20} round />
                        WhatsApp
                    </div>
                </WhatsappShareButton>

                <TelegramShareButton url={shareUrl}>
                    <div className="flex items-center gap-2 rounded-full bg-sky-500 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-sky-600">
                        <TelegramIcon size={20} round />
                        Telegram
                    </div>
                </TelegramShareButton>

                <EmailShareButton url={shareUrl}>
                    <div className="flex items-center gap-2 rounded-full bg-neutral-800 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-neutral-900">
                        <EmailIcon size={20} round />
                        Email
                    </div>
                </EmailShareButton>

                <button
                    type="button"
                    onClick={handleCopy}
                    className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-primary shadow-sm ring-1 ring-red-200 hover:bg-red-50"
                >
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    {copied ? "Link copied" : "Copy link"}
                </button>
            </div>
        </div>
    );
}

export default ShareButtons;
