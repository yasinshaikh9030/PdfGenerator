function Privacy() {
    return (
        <div className="flex justify-center">
            <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-sm sm:p-8">
                <h1 className="mb-4 text-2xl font-semibold tracking-tight text-primary sm:text-3xl">
                    Privacy Policy
                </h1>
                <div className="space-y-3 text-sm leading-relaxed text-neutral-600 sm:text-base">
                    <p>At Quick PDF Generator, we respect your privacy.</p>
                    <p>
                        We do not store or upload any user files to our servers. All image processing
                        happens locally in your browser.
                    </p>
                    <p>
                        We may use third-party services such as Google Analytics or Google AdSense to
                        improve user experience and display relevant ads. These services may use
                        cookies to personalize content and measure performance.
                    </p>
                    <p>By using this website, you agree to this privacy policy.</p>
                </div>
            </div>
        </div>
    );
}

export default Privacy;
