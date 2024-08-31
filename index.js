import express from "express";

const app = express();
const port = 9000;


app.get("/", async (req, res) => {
  try {
    const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/posts?select=*`, {
      headers: {
        apikey: process.env.SUPABASE_KEY || '',
        Authorization: `Bearer ${process.env.SUPABASE_KEY || ''}`,
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ message: 'Error fetching data from Supabase' });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: 'Error 404', error: error.message });
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

app.listen(9000, () => {
  console.log(`Server is running on port ${port}`);
});