export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Method not allowed.' });
  }

  const {
    traineeName,
    store,
    startedAt,
    completedAt,
    completionScore,
    moduleStatus,
    firstAttemptResults,
  } = req.body || {};

  if (!traineeName || !store || !startedAt || !completedAt) {
    return res.status(400).json({ message: 'Missing required completion fields.' });
  }

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhookUrl) {
    return res.status(503).json({
      message: 'Google Sheets webhook is not configured yet.',
    });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        traineeName,
        store,
        startedAt,
        completedAt,
        completionScore,
        moduleStatus,
        firstAttemptResults,
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      return res.status(502).json({
        message: `Google Sheets webhook failed: ${body || response.statusText}`,
      });
    }

    return res.status(200).json({ message: 'Completion saved.' });
  } catch (error) {
    return res.status(500).json({
      message:
        error instanceof Error ? error.message : 'Unable to save completion.',
    });
  }
}
