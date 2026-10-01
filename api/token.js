export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'text/plain');

  const targetUrl = "https://backend.plusbox.tv/PTVSports/embed.html";
  const fallbackToken = "470d9bc1c1ba8a1f1d3700b6d027f2028f774af0-893c3a341f816666dfdc17c3137eeb5f-1790838656-1790827856";

  try {
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://backend.plusbox.tv/'
      }
    });

    const html = await response.text();
    const match = html.match(/token=([a-f0-9\-]+)/i);

    if (match && match[1]) {
      res.status(200).send(match[1].trim());
    } else {
      res.status(200).send(fallbackToken);
    }
  } catch (error) {
    res.status(200).send(fallbackToken);
  }
}
