from yt_dlp.extractor.common import InfoExtractor


# cf. https://github.com/yt-dlp/yt-dlp/blob/master/CONTRIBUTING.md#adding-support-for-a-new-site
class KindaiDougaIE(InfoExtractor):
    _VALID_URL = r"https?://www\.stream\.kanazawa-u\.ac\.jp/v/(?P<id>[a-zA-Z0-9]+)"

    def _real_extract(self, url):
        #self._
        video_id = self._match_id(url)
        webpage = self._download_webpage(url, video_id)

        m3u8 = self._html_search_regex(r'<source src="([^"]+)"', webpage, "m3u8")
        formats = self._extract_m3u8_formats(m3u8, video_id)
        title = self._html_search_regex(r"<h1[^>]*>([^<]*)<", webpage, "title")
        alt_title = self._html_search_regex(r"<h2[^>]*>([^<]*)<", webpage, "alt_title")

        return {
            "id": video_id,
            "title": title,
            "alt_title": alt_title,
            "formats": formats,
        }
