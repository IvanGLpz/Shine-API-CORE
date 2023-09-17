import express from "express";
import trlyou from "translator-for-you";
const t = express();

type ILyric = {
  class: string;
  dataset: string;
  text: string;
};

t.post("/test/translate", async (req, res) => {
  const lyrics = req.body?.lyrics ?? ([] as ILyric[]);
  const authors = req.body?.authors;
  const title_song = req?.body?.title_song;

  const language = req?.body?.language ?? "en";

  const textLyrics = lyrics?.map?.((item) => item?.text)?.join("\n");

  const dtr = (await trlyou(textLyrics, `${language}`)) as string;
  const withSplit = dtr.split("\n");

  const normalize = lyrics.map((item, index) => {
    return {
      ...item,
      text: withSplit[index] ?? "",
      defautltText: item?.text,
      authors,
      title_song,
    };
  });

  res.status(200).json({
    lyrics: normalize,
    authors,
    title_song,
  });
});

t.post("/test/translate/single", async (req, res) => {
  const lyrics = req.body?.single_lyrics;
  const language = req?.body?.language ?? "en";
  const authors = req.body?.authors;
  const title_song = req?.body?.title_song;

  const translatedLyrics = (await trlyou(lyrics, `${language}`)) as string;

  res.status(200).json({
    single_lyrics: translatedLyrics,
    authors,
    title_song,
  });
});

export default t;
