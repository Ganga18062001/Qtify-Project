import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Hero from "../Hero/Hero";
import Section from "../Section/Section";
import { FAQs } from "../FAQs/FAQs";
import Feedback from "../Feedback/Feedback";
import Footer from "../Footer/Footer";
import { fetchTopAlbum, fetchNewAlbum, fetchSongs, fetchGenres } from "../../api/api";

const HomePage = () => {
  const [topAlbums, setTopAlbums] = useState([]);
  const [newAlbums, setNewAlbums] = useState([]);
  const [songs, setSongs] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const top = await fetchTopAlbum();
        setTopAlbums(top);
      } catch (err) {
        console.error("Failed to fetch top albums:", err);
      }
      try {
        const newA = await fetchNewAlbum();
        setNewAlbums(newA);
      } catch (err) {
        console.error("Failed to fetch new albums:", err);
      }
      try {
        const song = await fetchSongs();
        setSongs(song);
      } catch (err) {
        console.error("Failed to fetch songs:", err);
      }
      try {
        const gen = await fetchGenres();
        setGenres(gen);
      } catch (err) {
        console.error("Failed to fetch genres:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <Hero />
      <Section title="Top Albums" data={topAlbums} type="album" />
      <Section title="New Albums" data={newAlbums} type="album" />
      <Section title="Songs" data={songs} type="songs" genres={genres} />
      <FAQs />
      <Feedback />
      <Footer />
    </div>
  );
};

export default HomePage;
